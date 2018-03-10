import moment from 'moment'
import {
  mergeDeepWith,
  is,
} from 'ramda'
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
}

export default function searchReducer (state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }

    case SEARCH_RECEIVE: {
      const {
        payload: {
          query,
        },
      } = action

      const mergeNotAMoment = (left, right) => {
        if (is(moment, right)) {
          return right
        }

        return left
      }

      return mergeDeepWith(mergeNotAMoment, state, {
        loading: false,
        query,
      })
    }

    default:
      return initialState
  }
}
