import moment from 'moment'
import 'moment/locale/pt-br'

moment.locale('pt-BR')

const formatDateToBr = date => (
  moment(date)
    .format('DD/MM/YYYY')
)

export default formatDateToBr
