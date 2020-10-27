import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store'
import { Custodian } from '../types'
import cloneDeep from 'lodash.clonedeep'

export interface CustodiansState {
  custodiansLoading: boolean
  custodians: Array<Custodian> | undefined
}
const initialState: CustodiansState = {
  custodiansLoading: false,
  custodians: [],
}

// Actions
export const setCustodiansLoading = createAction(
  'setCustodiansLoading',
  (custodiansLoading: boolean) => ({ custodiansLoading })
)
export const setCustodians = createAction(
  'setCustodians',
  (custodians: Array<Custodian>) => ({ custodians })
)

// Reducer
export function custodiansReducer(
  state: CustodiansState | undefined,
  action: Action
): CustodiansState {
  const reducer = createReducer(
    initialState,
    on(setCustodiansLoading, (state, val) => {
      const s = cloneDeep(state)
      s.custodiansLoading = val.custodiansLoading
      return s
    }),
    on(setCustodians, (state, val) => {
      const s = cloneDeep(state)
      s.custodians = val.custodians
      return s
    })
  )
  return reducer(state, action)
}

// Selectors
export const selectCustodiansLoading = createSelector(
  createFeatureSelector<CustodiansState>('custodians'),
  (state) => state.custodiansLoading
)
export const selectCustodians = createSelector(
  createFeatureSelector<CustodiansState>('custodians'),
  (state) => state.custodians
)
