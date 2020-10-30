import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store'
import { defaultThemeName } from '../../../constants'
import { ImportLogEntry } from '../types'
import cloneDeep from 'lodash.clonedeep'

export interface AppSettingsState {
  darkMode: boolean
  importLog: Array<ImportLogEntry> | undefined
  themeName: string
}
const initialState: AppSettingsState = {
  darkMode: false,
  importLog: undefined,
  themeName: defaultThemeName,
}

// Actions
export const setDarkMode = createAction('setDarkMode', (darkMode: boolean) => ({
  darkMode,
}))

export const setImportLog = createAction(
  'setImportLog',
  (importLog: string) => ({ importLog })
)

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
    on(setImportLog, (state, val) => {
      const s = cloneDeep(state)
      s.importLog = val.importLog
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

export const selectImportLog = createSelector(
  createFeatureSelector<AppSettingsState>('appSettings'),
  (state) => state.importLog
)

export const selectThemeName = createSelector(
  createFeatureSelector<AppSettingsState>('appSettings'),
  (state) => state.themeName
)