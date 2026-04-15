import register from 'preact-custom-element'

import { StandaloneContactForm } from './components/StandaloneContactForm'
import { AppContextProvider } from './components/AppContextProvider'

import './styles.core.scss'

// Both elements use light DOM (shadow: false) so the global stylesheet
// from styles.core.scss applies uniformly. Switch to shadow DOM if you
// need style isolation — see the README for the trade-offs.
register(
  StandaloneContactForm,
  'contact-form',
  ['authorization', 'api_url'],
  { shadow: false },
)

register(
  AppContextProvider,
  'app-root',
  ['authorization', 'api_url'],
  { shadow: false },
)
