import { Action, createAction, createReducer, on } from '@ngrx/store'
import cloneDeep from 'lodash.clonedeep'
import { Custodian } from '../types'

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
