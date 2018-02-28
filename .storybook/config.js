import { configure } from '@storybook/react'

import './themeDecorator'

const req = require.context('../stories', true, /\.js$/)
function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
