import React, { Component } from 'react'
import {
  arrayOf,
  bool,
  func,
  number,
  object,
  string,
  shape,
} from 'prop-types'

import {
  Button,
  Dropdown,
  Pagination,

  Table,
  CardContent,
} from 'former-kit'

import IconAdd from 'emblematic-icons/svg/AddBox24.svg'
import IconLike from 'emblematic-icons/svg/Like24.svg'
import IconReprocess from 'emblematic-icons/svg/Reprocess24.svg'

import style from './style.css'

const buttons = [
  {
    text: 'Adicionar',
    icon: <IconAdd width="12px" height="12px" />,
  },
  {
    text: 'Estornar',
    icon: <IconLike width="12px" height="12px" />,
  },
  {
    text: 'Reprocessar',
    icon: <IconReprocess width="12px" height="12px" />,
  },
]

const renderPlaceholder = (selectedPage) => {
  if (selectedPage) {
    return `${selectedPage.toString()} items per page`
  }

  return 'Items per page'
}

class TableContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedRows: [],
      expandedRows: [],
    }

    this.handleExpandRow = this.handleExpandRow.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)
    this.handlePageCountChange = this.handlePageCountChange.bind(this)
  }

  handleSelectRow (selectedRows) {
    this.setState({
      selectedRows,
    })
  }

  handleExpandRow (expandedRows) {
    this.setState({
      expandedRows,
    })
  }

  handlePageCountChange (event) {
    const { value } = event.target
    this.props.handlePageCountChange(value)
  }

  render () {
    const {
      selectable,
      expandable,
      maxColumns,
      onRowClick,
      handleOrderChange,
      orderColumn,
      order,
      columns,
      rows,
      pagination,
      handlePageChange,
      loading,
      selectedPage,
    } = this.props

    const {
      expandedRows,
      selectedRows,
    } = this.state

    return (
      <React.Fragment>
        <CardContent className={style.tableHeader}>
          <div>
            {
              buttons.map(button => (
                <Button
                  key={button.text}
                  relevance="low"
                  fill="outline"
                  icon={button.icon}
                  disabled={loading}
                >
                  {button.text}
                </Button>
              ))
            }
          </div>

          <div className={style.dropdown}>
            <Dropdown
              options={[15, 30, 60, 100].map(i =>
                ({ name: `${i} items per page`, value: `${i}` }))
              }
              name="count"
              value={selectedPage.toString()}
              placeholder={renderPlaceholder(selectedPage)}
              onChange={this.handlePageCountChange}
              disabled={loading}
            />
            <Pagination
              currentPage={pagination.offset}
              totalPages={pagination.total}
              onPageChange={handlePageChange}
              disabled={loading}
            />
          </div>
        </CardContent>

        <Table
          className={style.table}
          columns={columns}
          rows={rows}
          selectable={selectable}
          expandable={expandable}
          selectedRows={selectedRows}
          expandedRows={expandedRows}
          maxColumns={maxColumns}
          onOrderChange={handleOrderChange}
          onSelectRow={this.handleSelectRow}
          orderSequence={order}
          orderColumn={orderColumn}
          onExpandRow={this.handleExpandRow}
          onRowClick={onRowClick}
          disabled={loading}
        />

        <CardContent className={style.pagination}>
          <Pagination
            currentPage={pagination.offset}
            totalPages={pagination.total}
            onPageChange={handlePageChange}
            disabled={loading}
          />
        </CardContent>
      </React.Fragment>
    )
  }
}

TableContainer.propTypes = {
  selectable: bool,
  expandable: bool,
  onRowClick: func,
  maxColumns: number,
  orderColumn: number,
  order: string,
  pagination: shape({
    offset: number,
    total: number,
  }).isRequired,
  loading: bool,
  selectedPage: number,
  columns: arrayOf(object), // eslint-disable-line
  rows: arrayOf(object), // eslint-disable-line
  handlePageChange: func.isRequired, // eslint-disable-line
  handlePageCountChange: func.isRequired, // eslint-disable-line
  handleOrderChange: func.isRequired, // eslint-disable-line
}

TableContainer.defaultProps = {
  columns: [],
  rows: [],
  selectable: false,
  expandable: false,
  maxColumns: 7,
  orderColumn: 0,
  order: 'ascending',
  onRowClick: () => undefined,
  loading: false,
  selectedPage: 15,
}

export default TableContainer
