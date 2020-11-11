import { Action, createAction, createReducer, on } from '@ngrx/store'
import cloneDeep from 'lodash.clonedeep'
import { defaultThemeName } from '../constants'

export interface AppSettingsState {
  darkMode: boolean
  themeName: string
}
const initialState: AppSettingsState = {
  darkMode: false,
  themeName: defaultThemeName,
}

// Actions
export const setDarkMode = createAction('setDarkMode', (darkMode: boolean) => ({
  darkMode,
}))
export const setThemeName = createAction(
  'setThemeName',
  (themeName: string) => ({ themeName })
)

// Reducer
export function appSettingsReducer(
  state: AppSettingsState | undefined,
  action: Action
): AppSettingsState {
  const reducer = createReducer(
    initialState,
    on(setDarkMode, (state, val) => {
      const s = cloneDeep(state)
      s.darkMode = val.darkMode
      return s
    }),
    on(setThemeName, (state, val) => {
      const s = cloneDeep(state)
      s.themeName = val.themeName
      return s
    })
  )
  return reducer(state, action)
}
