import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cockpit from 'cockpit'
import qs from 'qs'

import { connect } from 'react-redux'

import {
  anyPass,
  allPass,
  compose,
  nth,
  path,
  pipe,
  prop,
  propSatisfies,
  pick,
  tail,
  ifElse,
  isNil,
  isEmpty,
  always,
  props as propsR,
  juxt,
  head,
  last,
  objOf,
  mergeAll,
  merge,
  when,
  has,
} from 'ramda'

import TransactionsList from '../../containers/TransactionsList'
import renderCardBrand from '../../containers/TransactionsList/renderCardBrand'
import renderStatusLegend from '../../containers/TransactionsList/renderStatusLegend'

import filterOptions from '../../models/transactionFilterOptions'
import dateSelectorPresets from '../../models/dateSelectorPresets'
import currency from '../../helpers/formatCurrency'
import formatPaymentMethod from '../../helpers/formatPaymentMethod'
import formatDateToBr from '../../helpers/formatDateToBr'
import formatRefuseReason from '../../helpers/formatRefuseReason'
import formatCpfCnpj from '../../helpers/formatCpfCnpj'
import debounce from '../../helpers/debounce'

const convertPaymentValue = property => pipe(
  path(['payment', property]),
  currency
)

const mapStateToProps = ({
  account: { client },
}) => ({ client })

const enhanced = compose(
  connect(
    mapStateToProps
  )
)

const columnsDefault = [
  {
    title: 'Status',
    renderer: renderStatusLegend,
    accessor: ['status'],
    orderable: true,
  },
  { title: 'Transaction Id', accessor: ['id'], orderable: true },
  {
    title: 'Date created',
    accessor: ['created_at'],
    orderable: true,
    renderer: pipe(prop('created_at'), formatDateToBr),
  },
  {
    title: 'CPF / CNPJ',
    accessor: ['customer', 'document_number'],
    renderer: pipe(
      path(['customer', 'document_number']),
      formatCpfCnpj
    ),
  },
  {
    title: 'Payment method',
    accessor: ['payment', 'method'],
    orderable: true,
    renderer: pipe(
      prop('payment'),
      pick(['method', 'international']),
      formatPaymentMethod
    ),
  },
  {
    title: 'Paid amount',
    accessor: ['payment', 'paid_amount'],
    orderable: true,
    renderer: convertPaymentValue('paid_amount'),
  },
  {
    title: 'Cost',
    accessor: ['payment', 'cost_amount'],
    orderable: true,
    renderer: convertPaymentValue('cost_amount'),
  },
  {
    title: 'Net amount',
    accessor: ['payment', 'net_amount'],
    renderer: convertPaymentValue('net_amount'),
  },
  { title: 'E-mail', accessor: ['customer', 'email'], orderable: true },
  {
    title: 'Refuse Reason',
    accessor: ['refuse_reason'],
    orderable: true,
    renderer: pipe(
      prop('refuse_reason'),
      formatRefuseReason
    ),
  },
  { title: 'Antifraud', accessor: ['antifraud', 'recommendation'], orderable: true },
  { title: 'Installments', accessor: ['payment', 'installments'], orderable: true },
  { title: 'Name', accessor: ['customer', 'name'], orderable: true },
  {
    title: 'Card brand',
    accessor: ['card', 'brand_name'],
    orderable: true,
    renderer: renderCardBrand,
  },
  { title: 'Boleto Link', accessor: ['boleto', 'url'], orderable: true },
]

const sortedColumn = columnsDefault.findIndex(c =>
  c.accessor.includes('created_at')
)

const getColumnAccessor = index => pipe(
  nth(index),
  prop('accessor')
)

const parseDatesToMoment = when(
  has('dates'),
  pipe(
    prop('dates'),
    propsR(['start', 'end']),
    juxt([
      pipe(head, moment, objOf('start')),
      pipe(last, moment, objOf('end')),
    ]),
    mergeAll,
    objOf('dates')
  )
)

const toISOString = inst => inst.toISOString()

const isDatesNil = anyPass([
  isNil,
  allPass([
    propSatisfies(isNil, 'start'),
    propSatisfies(isNil, 'end'),
  ]),
])

const parseDatesToISO = pipe(
  ifElse(
    isDatesNil,
    always({}),
    pipe(
      propsR(['start', 'end']),
      juxt([
        pipe(head, toISOString, objOf('start')),
        pipe(last, toISOString, objOf('end')),
      ]),
      mergeAll
    )
  ),
  objOf('dates')
)

class Transactions extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      columns: columnsDefault,
      collapsed: true,
      result: {
        total: {},
        list: {
          rows: [],
        },
        chart: {
          dataset: [],
        },
      },
    }

    this.handleChartsCollapse = this.handleChartsCollapse.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePageCountChange = this.handlePageCountChange.bind(this)

    this.updateUrl = this.updateUrl.bind(this)

    this.cockpitPg = cockpit(props.client)
  }

  componentDidMount () {
    const { search } = this.props.location

    const chooseQuery = ifElse(
      anyPass([isNil, isEmpty]),
      always(this.state.query),
      pipe(tail, qs.parse)
    )

    const chosenQuery = chooseQuery(search)

    const query = merge(chosenQuery, parseDatesToMoment(chosenQuery))

    this.cockpitPg
      .transactions
      .search(query)
      .then((res) => {
        this.updateUrl(query)

        this.setState({
          ...res,
          loading: false,
          pagination: {
            offset: 1,
            total: Math.ceil(
              res.result.total.count / this.state.query.count
            ),
          },
        })
      })
  }

  componentWillReceiveProps (nextProps) {
    const search = tail(nextProps.location.search)
    const queryState = this.state.query

    const queryStateStr = qs.stringify(
      merge(queryState, parseDatesToISO(queryState.dates))
    )

    if (search !== queryStateStr) {
      const queryUrl = qs.parse(search)
      const finalQueryUrl = merge(queryUrl, parseDatesToMoment(queryUrl))

      this.setState({
        query: finalQueryUrl,
        loading: true,
      }, () => (
        this.cockpitPg
          .transactions
          .search(finalQueryUrl)
          .then(res => (
            this.setState({
              ...res,
              loading: false,
              pagination: {
                offset: 1,
                total: Math.ceil(
                  res.result.total.count / this.state.query.count
                ),
              },
            })
          ))
      ))
    }
  }

  updateUrl (query) {
    const newQuery = merge(query, parseDatesToISO(query.dates))

    this.props.history.replace({
      pathname: this.props.location.pathname,
      search: qs.stringify(newQuery),
    })
  }

  handlePageCountChange (count) {
    // chamar redux 'request'
    // fazemos a request http depois a request redux
    // chama redux atualizando pagination e loading apenas

    this.setState({
      query: {
        ...this.state.query,
        offset: 1,
        count,
      },
      loading: true,
    }, () => (
      this.cockpitPg
        .transactions
        .search(this.state.query)
        .then((res) => {
          this.updateUrl(this.state.query)

          this.setState({
            ...res,
            loading: false,
            pagination: {
              offset: 1,
              total: Math.ceil(
                res.result.total.count / this.state.query.count
              ),
            },
          })
        })
    ))
  }

  handleOrderChange (index, order) {
    const getAccessor = getColumnAccessor(index)

    this.setState({
      loading: true,
      orderColumn: index,
      query: {
        ...this.state.query,
        sort: {
          field: getAccessor(columnsDefault),
          order,
        },
        offset: 1,
      },
    }, () => (
      this.cockpitPg
        .transactions
        .search(this.state.query)
        .then((res) => {
          this.updateUrl(this.state.query)

          this.setState({
            ...res,
            pagination: {
              offset: 1,
              total: Math.ceil(
                res.result.total.count / this.state.query.count
              ),
            },
            loading: false,
          })
        })
    ))
  }

  handleFilterChange (filters) {
    const {
      search,
      dates,
      values,
    } = filters

    this.setState({
      loading: true,
      query: {
        ...this.state.query,
        search,
        dates,
        filters: values,
        offset: 1,
      },
    }, () => (
      this.cockpitPg
        .transactions
        .search(this.state.query)
        .then((res) => {
          this.updateUrl(this.state.query)

          this.setState({
            ...res,
            loading: false,
            pagination: {
              offset: 1,
              total: Math.ceil(
                res.result.total.count / this.state.query.count
              ),
            },
          })
        })
    ))
  }

  handlePageChange (page) {
    const { pagination } = this.state

    this.setState({
      loading: true,
      pagination: {
        ...pagination,
        offset: page,
      },
      query: {
        ...this.state.query,
        offset: page,
      },
    }, () => (
      this.cockpitPg
        .transactions
        .search(this.state.query)
        .then((res) => {
          this.updateUrl(this.state.query)

          this.setState({
            ...res,
            loading: false,
          })
        })
    ))
  }

  handleChartsCollapse () {
    const { collapsed } = this.state

    this.setState({
      collapsed: !collapsed,
    })
  }

  render () {
    const {
      loading,
      collapsed,
      columns,
      orderColumn,
      pagination,
      query: {
        search,
        dates,
        filters,
        sort,
        count,
      },
      result: {
        total,
        list,
        chart,
      },
    } = this.state

    return (
      <TransactionsList
        count={total.count}
        amount={total.payment ? total.payment.paid_amount : 0}
        search={search}
        values={filters}
        dates={dates}
        filterOptions={filterOptions}
        dateSelectorPresets={dateSelectorPresets}
        collapsed={collapsed}
        order={sort ? sort.order : ''}
        rows={list.rows}
        columns={columns}
        orderColumn={orderColumn}
        pagination={pagination}
        handlePageChange={debounce(this.handlePageChange, 200)}
        handleOrderChange={this.handleOrderChange}
        handleFilterChange={this.handleFilterChange}
        handleChartsCollapse={this.handleChartsCollapse}
        handlePageCountChange={this.handlePageCountChange}
        data={chart.dataset}
        loading={loading}
        selectedPage={count}
      />
    )
  }
}

Transactions.propTypes = {
  client: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
}

export default enhanced(Transactions)
