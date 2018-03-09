import { createAction } from 'redux-action'

export { defaul } from './reducer'
export { default as epic } from './epic'

export const SEARCH_REQUEST = 'pilot/transactions/SEARCH_REQUEST'
export const requestSearch = createAction(SEARCH_REQUEST)

export const SEARCH_RECEIVE = 'pilot/transactions/SEARCH_RECEIVE'
export const receiveSearch = createAction(SEARCH_RECEIVE)
