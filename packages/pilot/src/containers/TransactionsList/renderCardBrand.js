import React from 'react'

import {
  cond,
  equals,
} from 'ramda'

import IconVisa from 'emblematic-icons/svg/VisaCard16.svg'
import IconMaster from 'emblematic-icons/svg/MasterCard16.svg'
import IconDiners from 'emblematic-icons/svg/DinersCard16.svg'
import IconAmex from 'emblematic-icons/svg/AmexCard16.svg'
import IconJcb from 'emblematic-icons/svg/JCBCard16.svg'

import style from './style.css'

const renderBrandIcon = cond([
  [equals('amex'), () => <IconAmex className={style.cardBrand} />],
  [equals('diners'), () => <IconDiners className={style.cardBrand} />],
  [equals('jcb'), () => <IconJcb className={style.cardBrand} />],
  [equals('mastercard'), () => <IconMaster className={style.cardBrand} />],
  [equals('visa'), () => <IconVisa className={style.cardBrand} />],
])

const renderCardBrand = item => (
  <div
    className={style.centralizedItem}
    title={item.card.brand_name}
  >
    {item.card.brand_name &&
      <span className={style.capitalize}>
        {renderBrandIcon(item.card.brand_name)}
        {item.card.brand_name}
      </span>
    }
  </div>
)

export default renderCardBrand
