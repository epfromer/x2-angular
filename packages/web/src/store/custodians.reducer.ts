import { Action, createReducer, createSelector, on } from '@ngrx/store'
import { setCustodians, setCustodiansLoading } from './custodians.actions'
import { Custodian } from './types'
// import { cloneDeep } from 'lodash.clonedeep'

export interface CustodiansState {
  custodiansLoading: boolean
  custodians: Array<Custodian> | undefined
}
const initialState: CustodiansState = {
  custodiansLoading: false,
  // custodians: undefined, TODO
  custodians: [
    {
      id: 'fastow',
      name: 'Fastow, Andrew',
      title: 'Chief Financial Officer',
      color: '#e91e63',
      senderTotal: 5,
      receiverTotal: 34,
      toCustodians: [{ custodianId: 'lay', total: 1 }],
    },
    {
      id: 'lay',
      name: 'Lay, Kenneth',
      title: 'Founder, CEO and Chairman',
      color: '#ffff00',
      senderTotal: 40,
      receiverTotal: 2690,
      toCustodians: [{ custodianId: 'fastow', total: 1 }],
    },
  ],
}

const reducer = createReducer(
  initialState,
  on(setCustodiansLoading, (state, val) => {
    // TODO figure out shape of val
    console.log(val)
    return { ...state }
  }),
  on(setCustodians, (state, val) => {
    // TODO figure out shape of val, use lodash or maybe immer to copy
    console.log(val)
    return { ...state }
  })
)

export function custodiansReducer(
  state: CustodiansState | undefined,
  action: Action
): CustodiansState {
  return reducer(state, action)
}

// selectors
export const selectCustodians = (state: CustodiansState): Array<Custodian> =>
  state.custodians
