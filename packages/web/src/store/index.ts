import { ActionReducerMap } from '@ngrx/store'
import { appSettingsReducer, AppSettingsState } from './slices/appSettingsSlice'
import { custodiansReducer, CustodiansState } from './slices/custodiansSlice'

interface AppState {
  appSettings: AppSettingsState
  custodians: CustodiansState
}
export const reducers: ActionReducerMap<AppState> = {
  appSettings: appSettingsReducer,
  custodians: custodiansReducer,
}

export * from './slices/appSettingsSlice'
export * from './slices/custodiansSlice'
export * from './types'
