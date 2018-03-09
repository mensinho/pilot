import {
  SEARCH_REQUEST,
  SEARCH_RECEIVE,
} from '.'

const initialState = {
  loading: true,
  query: {
    search: '',
    dates: {
      start: moment(new Date()).subtract(30, 'days'),
      end: moment(new Date()),
    },
    filters: {},
    offset: 1,
    count: 15,
    sort: {},
  },
  pagination: {
    offset: 1,
    total: 0,
  },
}