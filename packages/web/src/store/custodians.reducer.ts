import { Action, createReducer, on } from '@ngrx/store'
// import { setCustodians, setCustodiansLoading } from './custodians.actions'
// import { Custodian } from './types'
// import { cloneDeep } from 'lodash.clonedeep'
import { increment, decrement, reset } from './custodians.actions'

// export interface CustodiansState {
//   custodiansLoading: boolean
//   custodians: Array<Custodian> | undefined
// }
// const initialState: CustodiansState = {
//   custodiansLoading: false,
//   // custodians: undefined, TODO
//   custodians: [
//     {
//       id: 'fastow',
//       name: 'Fastow, Andrew',
//       title: 'Chief Financial Officer',
//       color: '#e91e63',
//       senderTotal: 5,
//       receiverTotal: 34,
//       toCustodians: [{ custodianId: 'lay', total: 1 }],
//     },
//     {
//       id: 'lay',
//       name: 'Lay, Kenneth',
//       title: 'Founder, CEO and Chairman',
//       color: '#ffff00',
//       senderTotal: 40,
//       receiverTotal: 2690,
//       toCustodians: [{ custodianId: 'fastow', total: 1 }],
//     },
//   ],
// }

export const initialState = 1

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, () => 0)
)

export function custodiansReducer(state, action) {
  return _counterReducer(state, action)
}

// export function custodiansReducer(
//   state: CustodiansState = initialState,
//   action: Action
// ): CustodiansState {
//   switch (action.type) {
//     case 'setCustodiansLoading':
//       const s = cloneDeep(state)
//       s.custodiansLoading = action.payload
//       return s
//     default:
//       return cloneDeep(state)
//   }
// }

// const reducer = createReducer(
//   initialState,
//   on(setCustodiansLoading, (state, val) => {
//     // TODO figure out shape of val
//     console.log(val)
//     return { ...state }
//   }),
//   on(setCustodians, (state, val) => {
//     // TODO figure out shape of val, use lodash or maybe immer to copy
//     console.log(val)
//     return { ...state }
//   })
// )

// export function custodiansReducer(
//   state: CustodiansState,
//   action: Action
// ): CustodiansState {
//   return reducer(state, action)
// }
