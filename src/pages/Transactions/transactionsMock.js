export default {
  query: {
    search: 'lksjdlkjdsf',
    dates: {
      start: new Date(),
      end: new Date(),
    },
    filters: {
      payment_method: ['credit_card'],
    },
    offset: 0,
    count: 10,
    sort: {
      field: 'paid_amount',
      order: 'ascending',
    },
  },
  result: {
    total: {
      count: 100,
      payment: {
        net_amount: 23123,
        paid_amount: 23123,
      },
    },
    list: {
      offset: 0,
      count: 10,
      rows: [
        {
          id: '3123213',
          status: 'paid',
          refuse_reason: 'acquirer',
          created_at: new Date().toISOString(),
          boleto: {
            id: 'lskdjfdsf',
            url: 'sdkfjljdsfd',
          },
          payment: {
            method: 'credit_card',
            paid_amount: 1000,
            net_amount: 990,
            costs: 10,
            installments: 1,
          },
          antifraud: {
            recommendation: 'approve',
            score: 95,
          },
          customer: {
            name: 'José',
            document_number: '123456789',
            email: 'a@b.c',
          },
          card: {
            holder_name: 'Jose',
            brand_name: 'visa',
            international: true,
          },
        },
      ],
    },
    chart: {
      dataset: [
        {
          name: '02/08/2017',
          paid: 2900,
          authorized: 5000,
        },
        {
          name: '02/15/2017',
          paid: 2500,
          authorized: 2500,
        },
        {
          name: '05/24/2017',
          paid: 3200,
          authorized: 5000,
          refunded: 2000,
        },
        {
          name: '07/19/2017',
          paid: 8000,
          authorized: 7000,
        },
        {
          name: '07/26/2017',
          paid: 900,
          authorized: 900,
          refused: 800,
        },
        {
          name: '08/10/2017',
          paid: 7800,
          refused: 200,
        },
        {
          name: '02/22/2018',
          paid: 3200,
          authorized: 2000,
        },
        {
          name: '02/24/2018',
          paid: 10000,
          authorized: 5000,
          pending_refund: 7000,
        },
        {
          name: '02/25/2018',
          paid: 2200,
          authorized: 1500,
        },
      ],
    },
  },
}
