import {
  combineReducers,
} from 'redux'

import account, { epic as accountEpic } from './Account/actions'
import search from './Transactions/actions'

export const rootEpic = accountEpic

export const rootReducer = combineReducers({
  account,
  search,
})
