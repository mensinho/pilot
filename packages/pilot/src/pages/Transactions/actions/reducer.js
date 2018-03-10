import moment from 'moment'

import {
  mergeWith,
  is,
} from 'ramda'

import {
  SEARCH_REQUEST,
  SEARCH_RECEIVE,
} from '.'

const mergeMomentAware = (a, b) => {
  if (is(moment, a) && is(moment, b)) {
    return b
  }

  if (is(Array, a) && is(Array, b)) {
    return b
  }

  if (is(Object, a) && is(Object, b)) {
    return mergeWith(mergeMomentAware, a, b)
  }

  return b
}

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

      return mergeMomentAware(state, {
        loading: false,
        query,
      })
    }

    default:
      return initialState
  }
}
