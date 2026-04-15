import register from 'preact-custom-element'

import { AppContextProvider } from './components/AppContextProvider'
import { ContactForm } from './components/ContactForm'

import './styles.core.scss'

// Both elements use light DOM (shadow: false) so the global stylesheet
// from styles.core.scss applies uniformly. Switch to shadow DOM if you
// need style isolation — see the README for the trade-offs.
register(
  ContactForm,
  'contact-form',
  [],
  { shadow: false },
)

register(
  AppContextProvider,
  'app-root',
  ['authorization', 'api_url'],
  { 
    shadow: true,
    mode: 'closed',
  },
)
