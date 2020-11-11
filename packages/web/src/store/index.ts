import { ActionReducerMap } from '@ngrx/store'
import { appSettingsReducer, AppSettingsState } from './slices/appSettingsSlice'
import { custodiansReducer, CustodiansState } from './slices/custodiansSlice'
import {
  emailSentByDayReducer,
  EmailSentByDayState,
} from './slices/emailSentByDaySlice'
import { emailReducer, EmailState } from './slices/emailSlice'
import { queryReducer, QueryState } from './slices/querySlice'
import { wordCloudReducer, WordCloudState } from './slices/wordCloudSlice'

interface AppState {
  appSettings: AppSettingsState
  custodians: CustodiansState
  email: EmailState
  emailSentByDay: EmailSentByDayState
  query: QueryState
  wordCloud: WordCloudState
}
export const reducers: ActionReducerMap<AppState> = {
  appSettings: appSettingsReducer,
  custodians: custodiansReducer,
  email: emailReducer,
  emailSentByDay: emailSentByDayReducer,
  query: queryReducer,
  wordCloud: wordCloudReducer,
}

export * from './appSettings'
export * from './constants'
export * from './custodians'
export * from './email'
export * from './initialData'
export * from './selectors'
export * from './slices/appSettingsSlice'
export * from './slices/custodiansSlice'
export * from './slices/emailSentByDaySlice'
export * from './slices/emailSlice'
export * from './slices/querySlice'
export * from './slices/wordCloudSlice'
export * from './types'
