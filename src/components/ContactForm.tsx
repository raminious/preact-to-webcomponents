import { useState } from 'preact/hooks'
import { useAppStore } from '../hooks/use-app-store'

export function ContactForm() {
  const baseApiUrl = useAppStore((state) => state.config.baseApiUrl)
  const authorization = useAppStore((state) => state.authorization)
  const update = useAppStore((state) => state.update)

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement

    fetch(`${baseApiUrl}/posts`, {
      method: 'POST',
      body: JSON.stringify({ email, message }),
      headers: {
        'Content-Type': 'application/json',
        ...(authorization ? { Authorization: authorization } : {}),
      },
    })
      .then((response) => response.json())
      .then(() => {
        // Dispatch from the form so the event bubbles through the DOM.
        // `composed: true` lets it cross any shadow-root boundary.
        form.dispatchEvent(
          new CustomEvent('pastel-form:contact-form:success', {
            bubbles: true,
            composed: true,
            detail: { data: { email, message } },
          }),
        )

        // sample global state update
        update((state) => {
          state.counter += 1
        })
      })
      .catch((error) => {
        form.dispatchEvent(
          new CustomEvent('pastel-form:contact-form:error', {
            bubbles: true,
            composed: true,
            detail: { error },
          }),
        )
      })
  }

  return (
    <form class="pastel-form" onSubmit={handleSubmit}>
      <label class="pastel-form__label">
        Email
        <input
          class="pastel-form__input"
          type="email"
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          required
        />
      </label>
      <label class="pastel-form__label">
        Message
        <textarea
          class="pastel-form__textarea"
          value={message}
          onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
          required
        />
      </label>

      <button class="pastel-form__button" type="submit">
        Send (Demo)
      </button>
    </form>
  )
}
