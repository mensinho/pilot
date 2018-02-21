import {
  always,
  cond,
  T,
} from 'ramda'

import {
  CPF,
  CNPJ,
} from 'cpf_cnpj'

const formatCpfCnpj = cond([
  [doc => CPF.isValid(doc), doc => CPF.format(doc)],
  [doc => CNPJ.isValid(doc), doc => CNPJ.format(doc)],
  [T, always(null)],
])

export default formatCpfCnpj
