import {
  __,
  prop,
} from 'ramda'

const errorMessages = {
  acquirer: 'Adquirente',
  antifraud: 'Antifraude',
  internal_error: 'Erro interno',
  no_acquirer: 'Sem adquirente',
  acquirer_timeout: 'Tempo limite da adquirente',
}

const getErrorMessage = prop(__, errorMessages)

export default getErrorMessage
