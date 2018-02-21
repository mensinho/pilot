const status = {
  paid: {
    color: '#53be76',
    text: 'Paga',
    acronym: 'P',
  },
  authorized: {
    color: '#fcb20a',
    text: 'Autorizada',
    acronym: 'A',
  },
  pending_refund: {
    color: '#8c68d4',
    text: 'Estorno pendente',
    acronym: 'EP',
  },
  processing: {
    color: '#951d3c',
    text: 'Processando',
    acronym: 'PR',
  },
  waiting_payment: {
    color: '#41535b',
    text: 'Aguardando pagamento',
    acronym: 'AP',
  },
  refused: {
    color: '#e00403',
    text: 'Recusada',
    acronym: 'R',
  },
  refunded: {
    color: '#5b2886',
    text: 'Estornada',
    acronym: 'E',
  },
  chargedback: {
    color: '#f16518',
    text: 'Chargeback',
    acronym: 'CB',
  },
}

export default status
