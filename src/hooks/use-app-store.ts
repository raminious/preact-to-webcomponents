import { useContext } from 'preact/compat'
import { useStore } from 'zustand'

import { AppContext, AppState, Actions } from '../context/root'

type Selector<U> = (state: AppState & Actions) => U

export function useAppStore<U = Partial<AppState & Actions>>(selector: Selector<U>) {
  return useStore(useContext(AppContext)!.store, selector)
}
