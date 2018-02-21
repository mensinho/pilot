import React from 'react'
import moment from 'moment'

import {
  compose,
  defaultTo,
  equals,
  is,
  path,
  pipe,
  reverse,
  sortBy,
  toLower,
  when,
} from 'ramda'

import TransactionsList from '../../containers/TransactionsList'
import renderCardBrand from '../../containers/TransactionsList/renderCardBrand'
import renderStatusLegend from '../../containers/TransactionsList/renderStatusLegend'

import Mock from './transactionsMock'

import filterOptions from '../../models/transactionFilterOptions'
import dateSelectorPresets from '../../models/dateSelectorPresets'
// import dataset from '../../models/dataset'

const isAscending = equals('ascending')

const rowSort = accessor =>
  sortBy(compose(when(is(String), toLower), defaultTo(''), path(accessor)))

const buildSorter = (accessor, order) => (
  isAscending(order) ?
    rowSort(accessor) :
    pipe(rowSort(accessor), reverse)
)

const sortByOrderColumn = (rows, columns, orderColumn, order) => {
  const referenceColumn = columns[orderColumn]
  const referenceAccessor = referenceColumn.accessor
  const sort = buildSorter(referenceAccessor, order)
  return sort(rows)
}

const columnsDefault = [
  {
    title: 'Status',
    renderer: renderStatusLegend,
    accessor: ['status'],
    orderable: true,
  },
  { title: 'Transaction Id', accessor: ['id'], orderable: true },
  { title: 'Date created', accessor: ['created_at'], orderable: true },
  { title: 'CPF / CNPJ', accessor: ['customer', 'document_number'], orderable: true },
  { title: 'Payment method', accessor: ['payment', 'method'], orderable: true },
  { title: 'Paid amount', accessor: ['payment', 'paid_amount'], orderable: true },
  { title: 'Cost', accessor: ['payment', 'costs'], orderable: true },
  { title: 'Net amount', accessor: ['payment', 'net_amount'], orderable: true },
  { title: 'E-mail', accessor: ['customer', 'email'], orderable: true },
  { title: 'Refuse Reason', accessor: ['refuse_reason'], orderable: true },
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
  c.accessor.includes(Mock.query.sort.field)
)

class Transactions extends React.Component {
  constructor () {
    super()

    this.state = {
      columns: columnsDefault,
      collapsed: true,
      orderColumn: sortedColumn,
      search: Mock.query.search,
      values: Mock.query.filters,
      dates: {
        start: moment(Mock.query.dates.start),
        end: moment(Mock.query.dates.end),
      },
      rows: Mock.result.list.rows,
      order: Mock.query.sort.order,
      count: Mock.result.total.count,
      amount: Mock.result.total.payment.paid_amount,
      pagination: {
        offset: Mock.result.list.offset + 1,
        total: Mock.result.list.count,
      },
      data: Mock.result.chart.dataset,
    }

    this.handleChartsCollapse = this.handleChartsCollapse.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handleOrderChange (index, order) {
    const { rows, columns } = this.state
    const sortedRows = sortByOrderColumn(rows, columns, index, order)
    this.setState({
      orderColumn: index,
      order,
      rows: sortedRows,
    })
  }

  handleChartsCollapse () {
    const { collapsed } = this.state

    this.setState({
      collapsed: !collapsed,
    })
  }

  handleFilterChange (filters) {
    const {
      search,
      values,
      dates,
    } = filters

    this.setState({
      search,
      values,
      dates,
    })
  }

  handlePageChange (page) {
    const { pagination } = this.state

    this.setState({
      pagination: {
        ...pagination,
        offset: page,
      },
    })
  }

  render () {
    const {
      search,
      values,
      dates,
      collapsed,
      order,
      rows,
      columns,
      orderColumn,
      count,
      amount,
      pagination,
      data,
    } = this.state

    return (
      <TransactionsList
        count={count}
        amount={amount}
        search={search}
        values={values}
        dates={dates}
        filterOptions={filterOptions}
        dateSelectorPresets={dateSelectorPresets}
        collapsed={collapsed}
        order={order}
        rows={rows}
        columns={columns}
        orderColumn={orderColumn}
        pagination={pagination}
        handlePageChange={this.handlePageChange}
        handleOrderChange={this.handleOrderChange}
        handleFilterChange={this.handleFilterChange}
        handleChartsCollapse={this.handleChartsCollapse}
        data={data}
      />
    )
  }
}

export default Transactions
