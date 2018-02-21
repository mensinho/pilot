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

const legends = [
  {
    key: 'paid',
    name: 'Paga',
    color: '#57be76',
  },
  {
    key: 'processing',
    name: 'Processando',
    color: '#951e3c',
  },
  {
    key: 'authorized',
    name: 'Autorizada',
    color: '#f4b23e',
  },
  {
    key: 'refunded',
    name: 'Estornada',
    color: '#5b2886',
  },
  {
    key: 'waiting_payment',
    name: 'Aguardando pagamento',
    color: '#4d5d65',
  },
  {
    key: 'pending_refund',
    name: 'Estorno pendente',
    color: '#8c68d4',
  },
  {
    key: 'refused',
    name: 'Recusada',
    color: '#e13121',
  },
]

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
      />
      <YAxis
        axisLine={false}
        height={50}
        tick={{ fontSize: 11 }}
      />
      <CartesianGrid
        stroke="#d7d7d7"
        vertical={false}
      />
      <Tooltip />
      <Legend
        iconType="square"
        iconSize={19}
      />
      {
        legends.map(legend => (
          <Area
            type="monotone"
            key={legend.key}
            name={legend.name}
            dataKey={legend.key}
            stackId="a"
            fill={legend.color}
            stroke={legend.color}
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
