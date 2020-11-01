import { ActionReducerMap } from '@ngrx/store'
import { appSettingsReducer, AppSettingsState } from './slices/appSettingsSlice'
import { custodiansReducer, CustodiansState } from './slices/custodiansSlice'
import { wordCloudReducer, WordCloudState } from './slices/wordCloudSlice'

interface AppState {
  appSettings: AppSettingsState
  custodians: CustodiansState
  wordCloud: WordCloudState
}
export const reducers: ActionReducerMap<AppState> = {
  appSettings: appSettingsReducer,
  custodians: custodiansReducer,
  wordCloud: wordCloudReducer,
}

export * from './slices/appSettingsSlice'
export * from './slices/custodiansSlice'
export * from './slices/wordCloudSlice'
export * from './custodians'
export * from './initialData'
export * from './constants'
export * from './types'
