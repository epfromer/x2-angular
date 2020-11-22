import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  Store,
} from '@ngrx/store'
import request, { gql } from 'graphql-request'
import cloneDeep from 'lodash.clonedeep'
import { environment } from 'src/environments/environment'
import { defaultThemeName } from '../../constants'
import { setCustodians, setCustodiansLoading } from './custodiansSlice'
import {
  setEmailSentByDay,
  setEmailSentByDayLoading,
} from './emailSentByDaySlice'
import { setWordCloud, setWordCloudLoading } from './wordCloudSlice'

// TODO - get dark mode from OS

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

// selectors & getters
export const getDarkMode = createSelector(
  createFeatureSelector<AppSettingsState>('appSettings'),
  (state) => state.darkMode
)
export const getThemeName = createSelector(
  createFeatureSelector<AppSettingsState>('appSettings'),
  (state) => state.themeName
)

export async function loadAppSettingsAsync(store: Store): Promise<void> {
  try {
    let darkMode = false
    let themeName = defaultThemeName
    if (typeof Storage !== 'undefined') {
      if (
        localStorage.getItem('darkMode') &&
        localStorage.getItem('darkMode') === 'true'
      ) {
        darkMode = true
      }
      if (
        localStorage.getItem('themeName') &&
        localStorage.getItem('themeName') !== 'null'
      ) {
        themeName = localStorage.getItem('themeName')
      }
    } else {
      // let value = await AsyncStorage.getItem('darkMode')
      // if (value === 'true') darkMode = true
      // value = await AsyncStorage.getItem('themeName')
      // if (value) themeName = value
    }
    store.dispatch(setDarkMode(darkMode))
    store.dispatch(setThemeName(themeName))
  } catch (e) {
    console.error(e)
  }
}

export async function setDarkModeAsync(
  store: Store,
  darkMode: boolean
): Promise<void> {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('darkMode', String(darkMode))
  } else {
    // await AsyncStorage.setItem('darkMode', String(darkMode))
  }
  store.dispatch(setDarkMode(darkMode))
}

export async function setThemeNameAsync(
  store: Store,
  themeName: string
): Promise<void> {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('themeName', themeName)
  } else {
    // await AsyncStorage.setItem('themeName', themeName)
  }
  store.dispatch(setThemeName(themeName))
}

// graphQl query
export function getInitialDataAsync(store: Store): void {
  store.dispatch(setWordCloudLoading(true))
  store.dispatch(setEmailSentByDayLoading(true))
  store.dispatch(setCustodiansLoading(true))
  const server = environment.x2Server
  const query = gql`
    {
      getWordCloud {
        tag
        weight
      }
      getEmailSentByDay {
        sent
        total
      }
      getCustodians {
        id
        name
        title
        color
        senderTotal
        receiverTotal
        toCustodians {
          custodianId
          total
        }
      }
    }
  `
  request(`${server}/graphql/`, query)
    .then((data) => {
      store.dispatch(setWordCloud(data.getWordCloud))
      store.dispatch(setEmailSentByDay(data.getEmailSentByDay))
      store.dispatch(setCustodians(data.getCustodians))
      store.dispatch(setWordCloudLoading(false))
      store.dispatch(setEmailSentByDayLoading(false))
      store.dispatch(setCustodiansLoading(false))
    })
    .catch((e) => console.error(e))
}
