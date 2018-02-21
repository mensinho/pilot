import React from 'react'
import { Legend } from 'former-kit'

import style from './style.css'

const status = {
  paid: '#53be76',
}

const renderStatusLegend = item => (
  <div className={style.centralizedItem}>
    <Legend
      color={status[item.status]}
      acronym={item.status}
      hideLabel
    >
      {item.status}
    </Legend>
  </div>
)

export default renderStatusLegend
