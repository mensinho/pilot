import React from 'react'
import { addDecorator } from '@storybook/react'
import theme from 'former-kit-skin-pagarme'

import { ThemeProvider } from 'former-kit'

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    {storyFn()}
  </ThemeProvider>
)

addDecorator(ThemeDecorator)
