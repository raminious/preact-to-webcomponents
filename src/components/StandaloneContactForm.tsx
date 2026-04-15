import { ContactForm } from './ContactForm'
import { AppContextProvider } from './AppContextProvider'

interface Props {
  authorization?: string
  api_url?: string
}

// Wraps <ContactForm/> in its own provider so <contact-form> can be used
// standalone — without an outer <app-root>. Each instance gets its own
// store; preact context does not cross custom-element boundaries.
export function StandaloneContactForm({ authorization = '', api_url }: Props) {
  return (
    <AppContextProvider authorization={authorization} api_url={api_url}>
      <ContactForm />
    </AppContextProvider>
  )
}
