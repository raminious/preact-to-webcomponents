import 'preact'

// Make our custom elements known to TS so they can be used in JSX.
// Anyone consuming this library from another Preact/React app gets
// type-checked attributes on <app-root> and <contact-form>.
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'app-root': JSX.HTMLAttributes<HTMLElement> & {
        authorization?: string
        api_url?: string
      }
      'contact-form': JSX.HTMLAttributes<HTMLElement> & {
        authorization?: string
        api_url?: string
      }
    }
  }
}
