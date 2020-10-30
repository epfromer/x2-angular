import { ActionReducerMap } from '@ngrx/store'
import { appSettingsReducer, AppSettingsState } from './slices/appSettingsSlice'
import { custodiansReducer, CustodiansState } from './slices/custodiansSlice'

interface AppState {
  appSettingsState: AppSettingsState
  custodiansState: CustodiansState
}
export const reducers: ActionReducerMap<AppState> = {
  appSettingsState: appSettingsReducer,
  custodiansState: custodiansReducer,
}

export * from './slices/appSettingsSlice'
export * from './slices/custodiansSlice'
