/* eslint-disable global-require */
import React, { Fragment } from 'react'
import {
  ThemeProvider,
} from 'former-kit'
import theme from 'former-kit-skin-pagarme'
import {
  HashRouter,
} from 'react-router-dom'

import { Provider as StateProvider } from 'react-redux'

import configureStore from './configureStore'
import Root from './pages/Root'

let devTools = null
if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./DevTools').default
  devTools = <DevTools />
}

const store = configureStore()

const App = () => (
  <ThemeProvider theme={theme}>
    <StateProvider store={store}>
      <HashRouter>
        <Fragment>
          <Root />
          {devTools}
        </Fragment>
      </HashRouter>
    </StateProvider>
  </ThemeProvider>
)

export default App
