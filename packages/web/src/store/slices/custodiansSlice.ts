import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  Store,
} from '@ngrx/store'
import request, { gql } from 'graphql-request'
import cloneDeep from 'lodash.clonedeep'
import { environment } from 'src/environments/environment'
import { Custodian, EmailXferedDatum } from '../types'

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

// selectors & getters
export const getCustodiansLoading = createSelector(
  createFeatureSelector<CustodiansState>('custodians'),
  (state) => state.custodiansLoading
)
export const getCustodians = createSelector(
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
export interface EmailSent {
  source: string
  target: string
  value: number
}
export interface EmailSentByCustodian {
  data: Array<EmailSent>
  nodes: Array<IDColorKey>
}
export function getEmailSentByCustodian(
  custodians: Array<Custodian>
): EmailSentByCustodian {
  const custodianNameFromId = (id: string) =>
    custodians.find((c: Custodian) => c.id === id).name

  const data: Array<EmailSent> = []
  const nodes: Array<IDColorKey> = []

  if (custodians) {
    custodians.forEach((fromCustodian: Custodian) => {
      fromCustodian.toCustodians.forEach((toCustodian) => {
        data.push({
          source: fromCustodian.name,
          target: custodianNameFromId(toCustodian.custodianId),
          value: toCustodian.total,
        })
      })
    })
    // and array of color keys
    custodians.forEach((custodian: Custodian) => {
      nodes.push({ id: custodian.name, color: custodian.color })
    })
  }

  return { data, nodes }
}

export function getCustodiansAsync(store: Store): void {
  store.dispatch(setCustodiansLoading(true))
  const server = environment.x2Server
  const query = gql`
    {
      getCustodians {
        id
        name
        title
        color
        senderTotal
        receiverTotal
        toCustodians {
          custodianId
          total
        }
      }
    }
  `
  request(`${server}/graphql/`, query)
    .then((data) => {
      store.dispatch(setCustodians(data.getCustodians))
      store.dispatch(setCustodiansLoading(false))
    })
    .catch((e) => console.error(e))
}
