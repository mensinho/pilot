import {
  propEq,
  cond,
  always,
  allPass,
  T,
} from 'ramda'

const isCreditCard = propEq('method', 'credit_card')

const isIntlCreditCard = allPass([
  isCreditCard,
  propEq('international', true),
])

const isDebitCard = propEq('method', 'debit_card')

const isBoleto = propEq('method', 'boleto')

const formatPaymentMethod = cond([
  [isIntlCreditCard, always('Cartao de credito internacional')],
  [isCreditCard, always('Cartao de credito')],
  [isDebitCard, always('Cartao de debito')],
  [isBoleto, always('Boleto')],
  [T, always(null)],
])

export default formatPaymentMethod
