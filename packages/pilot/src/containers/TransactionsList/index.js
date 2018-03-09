import React from 'react'
import {
  arrayOf,
  string,
  shape,
  bool,
  func,
  instanceOf,
  object,
  number,
} from 'prop-types'
import moment from 'moment'
import IconBalance from 'emblematic-icons/svg/Balance32.svg'
import IconDownload from 'emblematic-icons/svg/Download32.svg'
import IconChartsBars from 'emblematic-icons/svg/ChartBars32.svg'
import IconTransactions from 'emblematic-icons/svg/Transaction32.svg'
import {
  Grid,
  Row,
  Col,

  Card,
  CardContent,
  CardTitle,
  CardSection,

  Button,
} from 'former-kit'

import style from './style.css'

import Filter from '../Filter'
import Charts from './Charts'
import Table from './Table'

import currency from '../../helpers/formatCurrency'

const renderDateSelected = ({ start, end }) => {
  if (moment(start).isSame(end)) {
    return 'Hoje'
  }

  if (!start && !end) {
    return 'todo o período'
  }

  return `${moment(start).format('DD/MM/YYYY')} até ${moment(end).format('DD/MM/YYYY')}`
}

const TransactionsList = ({
  collapsed,
  columns,
  dates,
  dateSelectorPresets,
  filterOptions,
  handleChartsCollapse,
  handleFilterChange,
  handleOrderChange,
  handlePageCountChange,
  order,
  orderColumn,
  rows,
  search,
  values,
  count,
  amount,
  pagination,
  handlePageChange,
  data,
  loading,
  selectedPage,
}) => (
  <Grid>
    <Row>
      <Col
        palm={12}
        tablet={12}
        desk={12}
        tv={12}
      >
        <Filter
          dates={dates}
          values={values}
          search={search}
          options={filterOptions}
          datePresets={dateSelectorPresets}
          onChange={handleFilterChange}
          loading={loading}
        />
      </Col>

      {rows.length > 0 &&
        <Col
          palm={12}
          tablet={12}
          desk={12}
          tv={12}
        >
          <Card>
            <CardTitle
              title={
                <h2 className={style.customTitle}>
                  <IconTransactions width={16} height={16} />
                  Resumo de: <strong>{renderDateSelected(dates)}</strong>
                </h2>
              }
              subtitle={
                <h3 className={style.customTitle}>
                  <IconChartsBars width={16} height={16} />
                  Nº transações <strong>{count}</strong>
                  <div className={style.verticalDivider} />
                  <IconBalance width={16} height={16} />
                  Volume total <strong>{currency(amount)}</strong>
                </h3>
              }
            />

            <CardContent>
              <CardSection
                title="GRÁFICO"
                collapsedTitle="GRÁFICO"
                collapsed={collapsed}
                onTitleClick={handleChartsCollapse}
              >
                <CardContent>
                  <Charts data={data} />
                </CardContent>
              </CardSection>
            </CardContent>

            <CardContent>
              <CardSection
                title="TABELA DE TRANSAÇÕES"
                subtitle={
                  <div className={style.tableButtons}>
                    <Button
                      fill="clean"
                      disabled={loading}
                    >
                      <IconDownload
                        width={16}
                        height={16}
                      />
                      Exportar
                    </Button>
                    <div className={style.separator} />
                    <span>total de {count} transações</span>
                  </div>
                }
              >
                <Table
                  expandable
                  selectable
                  maxColumns={7}
                  rows={rows}
                  columns={columns}
                  order={order}
                  orderColumn={orderColumn}
                  pagination={pagination}
                  handleOrderChange={handleOrderChange}
                  handlePageChange={handlePageChange}
                  handlePageCountChange={handlePageCountChange}
                  loading={loading}
                  selectedPage={selectedPage}
                />
              </CardSection>
            </CardContent>
          </Card>
        </Col>
      }
    </Row>
  </Grid>
)

TransactionsList.propTypes = {
  count: number,
  amount: number,
  pagination: shape({
    offset: number,
    total: number,
  }).isRequired,
  filterOptions: arrayOf(shape({
    key: string,
    name: string,
    items: arrayOf(shape({
      label: string,
      value: string,
    })),
  })).isRequired,
  dateSelectorPresets: arrayOf(shape({
    key: string,
    title: string,
    date: string,
    items: arrayOf(shape({
      title: string,
      date: func,
    })),
  })).isRequired,
  values: object, // eslint-disable-line
  search: string,
  selectedPage: number,
  dates: shape({
    start: instanceOf(moment),
    end: instanceOf(moment),
  }),
  order: string,
  orderColumn: number,
  loading: bool.isRequired, // eslint-disable-line
  columns: arrayOf(object), // eslint-disable-line
  rows: arrayOf(object).isRequired, // eslint-disabled-line
  collapsed: bool.isRequired, // eslint-disable-line
  handleChartsCollapse: func.isRequired, // eslint-disable-line
  handleFilterChange: func.isRequired, // eslint-disable-line
  handleOrderChange: func.isRequired, // eslint-disable-line
  handlePageChange: func.isRequired, // eslint-disable-line
  handlePageCountChange: func.isRequired, // eslint-disable-line
  data: arrayOf(object), // eslint-disable-line
}

TransactionsList.defaultProps = {
  values: [],
  search: '',
  orderColumn: 0,
  count: 0,
  amount: 0,
  order: 'ascending',
  dates: {
    start: moment(),
    end: moment(),
  },
  selectedPage: 15,
}

export default TransactionsList
