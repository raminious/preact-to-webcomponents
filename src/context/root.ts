import { createContext } from 'preact/compat'
import { immer } from 'zustand/middleware/immer'
import { createStore } from 'zustand/vanilla'

type UpdaterFunction = (state: AppState) => void

export interface AppState {
  authorization: string
  config: {
    baseApiUrl: string
  }
  counter: number
}

export interface Actions {
  update: (fn: UpdaterFunction) => void
  reset: () => void
}

export const createAppStore = (props: AppState) => {
  return createStore<AppState & Actions>()(
    immer((set) => ({
      ...props,
      update: (fn) => set(fn),
      // shallow-merge initial values back in; spread keeps the action
      // functions on the store intact (set(props) would also merge, but
      // being explicit is clearer for readers).
      reset: () => set((state) => ({ ...state, ...props })),
    })),
  )
}

export type AppStore = ReturnType<typeof createAppStore>

interface AppContext {
  store: AppStore
}

export const AppContext = createContext<AppContext | null>(null)
