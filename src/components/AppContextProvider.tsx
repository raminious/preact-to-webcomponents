import { ReactNode, useRef } from 'preact/compat'

import { AppContext, AppStore, createAppStore } from '../context/root'

interface Props {
  authorization: string
  api_url?: string
  children: ReactNode
}

export function AppContextProvider({
  authorization,
  api_url,
  children,
}: Props) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = createAppStore({
      authorization,
      config: {
        baseApiUrl: api_url ?? 'https://raminmousavi.dev',
      },
      counter: 0,
    })
  }

  return (
    <AppContext.Provider value={{ store: storeRef.current }}>
      {children}
    </AppContext.Provider>
  )
}
