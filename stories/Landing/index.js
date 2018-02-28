import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Account from '../../src/containers/Account'
import Login from '../../src/containers/Account/Login'
import {
  PasswordRecoveryForm,
  PasswordRecoveryConfirmation,
} from '../../src/containers/Account/PasswordRecovery'
import {
  SignUpForm,
  SignUpConfirmation,
  InvalidEmailError,
} from '../../src/containers/Account/SignUp'
import Unregistered from '../../src/containers/Account/UnregisteredPresentation'
import Registered from '../../src/containers/Account/RegisteredPresentation'

const Placeholder = props => (
  <svg viewBox="0 0 26.458 26.458" {...props}>
    <g fill="none" stroke="currentColor">
      <path
        strokeWidth={0.268}
        d="M.134 26.324h26.191V.134H.134z"
      />
      <path
        d="M26.194 26.194L.264.264M26.194.265L.264 26.194"
        strokeWidth={0.265}
      />
    </g>
  </svg>
)

const availableLanguages = ['pt', 'en']

const registeredPresentation = (
  <Registered
    availableLanguages={availableLanguages}
    selectedLanguage={availableLanguages[0]}
    onGotoSignup={action('signup')}
  />
)

const unregisteredPresentation = (
  <Unregistered
    onGotoSignup={action('signup')}
  />
)

storiesOf('Account', module)
  .add('Login', () => (
    <Account
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={
        <Login
          onLogin={action('login')}
          onPasswordRecovery={action('recover_password')}
        />
      }
      secondaryContent={registeredPresentation}
    />
  ))
  .add('Password Recovery Form', () => (
    <Account
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={
        <PasswordRecoveryForm
          onPasswordRecovery={action('recover_password')}
        />
      }
      secondaryContent={registeredPresentation}
    />
  ))
  .add('Password Recovery Confirmation', () => (
    <Account
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={
        <PasswordRecoveryConfirmation
          onPasswordRecovery={action('recover_password')}
        />
      }
      secondaryContent={registeredPresentation}
    />
  ))
  .add('Signup', () => (
    <Account
      base="light"
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={
        <SignUpForm
          onPasswordRecovery={action('recover_password')}
        />
      }
      secondaryContent={unregisteredPresentation}
    />
  ))
  .add('Signup Confirmation', () => (
    <Account
      base="light"
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={
        <SignUpConfirmation
          onPasswordRecovery={action('recover_password')}
        />
      }
      secondaryContent={unregisteredPresentation}
    />
  ))
  .add('Signup E-mail Invalid', () => (
    <Account
      base="light"
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={
        <InvalidEmailError
          onPasswordRecovery={action('recover_password')}
        />
      }
      secondaryContent={unregisteredPresentation}
    />
  ))
