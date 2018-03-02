import {
  applyMiddleware,
  createStore,
  compose,
} from 'redux'

import { createEpicMiddleware } from 'redux-observable'

import DevTools from '../DevTools'
import { rootEpic, rootReducer } from '../pages/actions'

const enhancer = compose(
  applyMiddleware(createEpicMiddleware(rootEpic)),
  DevTools.instrument()
)

export default function configureStore () {
  return createStore(
    rootReducer,
    enhancer
  )
}
