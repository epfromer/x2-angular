import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store'
import { defaultThemeName } from '../constants'
import cloneDeep from 'lodash.clonedeep'

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

// Selectors
export const selectDarkMode = createSelector(
  createFeatureSelector<AppSettingsState>('appSettings'),
  (state) => state.darkMode
)

export const selectThemeName = createSelector(
  createFeatureSelector<AppSettingsState>('appSettings'),
  (state) => state.themeName
)
