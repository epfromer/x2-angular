import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store'
import { Custodian, EmailXferedDatum } from '../types'
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

export function getEmailSenders(
  custodians: Array<Custodian>
): Array<EmailXferedDatum> {
  const data: Array<EmailXferedDatum> = []
  if (custodians) {
    custodians.forEach((custodian: Custodian) => {
      if (custodian.senderTotal) {
        data.push({
          name: custodian.name,
          value: custodian.senderTotal,
          color: custodian.color,
        })
      }
    })
  }
  return data
}

export function getEmailReceivers(
  custodians: Array<Custodian>
): Array<EmailXferedDatum> {
  const data: Array<EmailXferedDatum> = []
  if (custodians) {
    custodians.forEach((custodian: Custodian) => {
      if (custodian.receiverTotal) {
        data.push({
          name: custodian.name,
          value: custodian.receiverTotal,
          color: custodian.color,
        })
      }
    })
  }
  return data
}

export interface IDColorKey {
  id: string
  color: string
}
export interface EmailSentByCustodian {
  data: Array<unknown>
  nodes: Array<IDColorKey>
}
export function getEmailSentByCustodian(
  custodians: Array<Custodian>
): EmailSentByCustodian {
  const custodianNameFromId = (id: string) =>
    custodians.find((c: Custodian) => c.id === id).name

  const data: Array<unknown> = []
  const nodes: Array<IDColorKey> = []

  if (custodians) {
    //  create array of [from, to, number sent]
    custodians.forEach((fromCustodian: Custodian) => {
      fromCustodian.toCustodians.forEach((toCustodian) => {
        data.push([
          fromCustodian.name,
          custodianNameFromId(toCustodian.custodianId),
          toCustodian.total,
        ])
      })
    })
    // and array of color keys
    custodians.forEach((custodian: Custodian) => {
      nodes.push({ id: custodian.name, color: custodian.color })
    })
  }

  return { data, nodes }
}
