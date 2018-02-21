import React from 'react'
import PropTypes from 'prop-types'
import {
  ResponsiveContainer,

  Area,
  AreaChart,

  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import statusLegends from '../../models/statusLegends'
import formatCurrency from '../../helpers/formatCurrency'
import formatDateToBr from '../../helpers/formatDateToBr'

const Charts = ({ data }) => (
  <ResponsiveContainer width="100%" height={500}>
    <AreaChart
      width={600}
      height={300}
      data={data}
      maxBarSize={17}
    >
      <XAxis
        dataKey="name"
        axisLine={false}
        tickMargin={10}
        tick={{ fontSize: 11 }}
        tickFormatter={formatDateToBr}
      />
      <YAxis
        axisLine={false}
        height={50}
        tick={{ fontSize: 11 }}
        tickFormatter={formatCurrency}
      />
      <CartesianGrid
        stroke="#d7d7d7"
        vertical={false}
      />
      <Tooltip
        formatter={formatCurrency}
        labelFormatter={formatDateToBr}
      />
      <Legend
        iconType="square"
        iconSize={19}
      />
      {
        Object.keys(statusLegends).map(legend => (
          <Area
            type="monotone"
            key={legend}
            name={statusLegends[legend].text}
            dataKey={legend}
            stackId="a"
            fill={statusLegends[legend].color}
            stroke={statusLegends[legend].color}
          />
        ))
      }
    </AreaChart>
  </ResponsiveContainer>
)

Charts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line
}

export default Charts
