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

class TableContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedRows: [],
      expandedRows: [],
    }

    this.handleExpandRow = this.handleExpandRow.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)
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
                >
                  {button.text}
                </Button>
              ))
            }
          </div>

          <div className={style.dropdown}>
            <Dropdown
              options={[10, 20, 30, 40, 50].map(i =>
                ({ name: `${i} items per page`, value: i }))
              }
              name="count"
              value={this.state.selected}
              placeholder="Items per page"
              onChange={() => undefined}
            />
            <Pagination
              currentPage={pagination.offset}
              totalPages={pagination.total}
              onPageChange={handlePageChange}
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
        />

        <CardContent className={style.pagination}>
          <Pagination
            currentPage={pagination.offset}
            totalPages={pagination.total}
            onPageChange={handlePageChange}
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
  columns: arrayOf(object), // eslint-disable-line
  rows: arrayOf(object), // eslint-disable-line
  handlePageChange: func.isRequired, // eslint-disable-line
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
}

export default TableContainer
