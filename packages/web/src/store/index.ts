import { ActionReducerMap } from '@ngrx/store'
import { appSettingsReducer, AppSettingsState } from './slices/appSettingsSlice'
import { custodiansReducer, CustodiansState } from './slices/custodiansSlice'
import {
  emailSentByDayReducer,
  EmailSentByDayState,
} from './slices/emailSentByDaySlice'
import { wordCloudReducer, WordCloudState } from './slices/wordCloudSlice'

interface AppState {
  appSettings: AppSettingsState
  custodians: CustodiansState
  emailSentByDay: EmailSentByDayState
  wordCloud: WordCloudState
}
export const reducers: ActionReducerMap<AppState> = {
  appSettings: appSettingsReducer,
  custodians: custodiansReducer,
  emailSentByDay: emailSentByDayReducer,
  wordCloud: wordCloudReducer,
}

export * from './constants'
export * from './custodians'
export * from './appSettings'
export * from './initialData'
export * from './slices/appSettingsSlice'
export * from './slices/custodiansSlice'
export * from './slices/emailSentByDaySlice'
export * from './slices/wordCloudSlice'
export * from './types'
