import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  select,
  Store,
} from '@ngrx/store'
import request, { gql } from 'graphql-request'
import cloneDeep from 'lodash.clonedeep'
import { take } from 'rxjs/internal/operators/take'
import { environment } from 'src/environments/environment'
import { defaultLimit } from '../constants'
import { Email } from '../types'
import { getQuery } from './querySlice'

export interface EmailState {
  emailLoading: boolean
  email: Array<Email> | undefined
  emailTotal: number
}
const initialState: EmailState = {
  emailLoading: false,
  email: undefined,
  emailTotal: 0,
}

// Actions
export const setEmailLoading = createAction(
  'setEmailLoading',
  (emailLoading: boolean) => ({
    emailLoading,
  })
)
export const setEmail = createAction(
  'setEmail',
  (email: Array<Email> | undefined) => ({
    email,
  })
)
export const appendEmail = createAction(
  'appendEmail',
  (email: Array<Email> | undefined) => ({
    email,
  })
)
export const setEmailTotal = createAction(
  'setEmailLoading',
  (emailTotal: number) => ({
    emailTotal,
  })
)

// Reducer
export function emailReducer(
  state: EmailState | undefined,
  action: Action
): EmailState {
  const reducer = createReducer(
    initialState,
    on(setEmailLoading, (state, val) => {
      const s = cloneDeep(state)
      s.emailLoading = val.emailLoading
      return s
    }),
    on(setEmail, (state, val) => {
      const s = cloneDeep(state)
      s.email = val.email
      return s
    }),
    on(appendEmail, (state, val) => {
      const s = cloneDeep(state)
      if (s.email) {
        s.email.push(...val.email)
      } else {
        s.email = val.email
      }
      return s
    }),
    on(setEmailTotal, (state, val) => {
      const s = cloneDeep(state)
      s.emailTotal = val.emailTotal
      return s
    })
  )
  return reducer(state, action)
}

// selectors & getters
export const getEmailLoading = createSelector(
  createFeatureSelector<EmailState>('email'),
  (state) => state.emailLoading
)
export const getEmail = createSelector(
  createFeatureSelector<EmailState>('email'),
  (state) => state.email
)
export const getEmailTotal = createSelector(
  createFeatureSelector<EmailState>('email'),
  (state) => state.emailTotal
)
export const getEmailById = createSelector(
  createFeatureSelector<EmailState>('email'),
  (state, props) => {
    if (!state.email || !state.email.length) return undefined
    return state.email.find((e: Email) => e.id === props.id)
  }
)
export const getNextEmailId = createSelector(
  createFeatureSelector<EmailState>('email'),
  (state, props) => {
    if (!state.email || !state.email.length) return undefined
    const i = state.email.findIndex((e: Email) => e.id === props.id)
    return i < state.email.length - 1 ? state.email[i + 1].id : undefined
  }
)
export const getPreviousEmailId = createSelector(
  createFeatureSelector<EmailState>('email'),
  (state, props) => {
    if (!state.email || !state.email.length) return undefined
    const i = state.email.findIndex((e: Email) => e.id === props.id)
    return i > 0 ? state.email[i - 1].id : undefined
  }
)
export const getEmailIndex = createSelector(
  createFeatureSelector<EmailState>('email'),
  (state, props) => {
    if (!state.email || !state.email.length) return undefined
    return state.email.findIndex((e: Email) => e.id === props.id) + 1
  }
)

// export const getDateStr = (date: Date): string => {
//   const month = (date.getMonth() + 1 + '').padStart(2, '0')
//   const day = (date.getDate() + '').padStart(2, '0')
//   return `${date.getFullYear()}-${month}-${day}`
// }

// graphQl query
async function makeQueryObj(store: Store): Promise<unknown> {
  const state = await store.pipe(select(getQuery), take(1)).toPromise()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {
    skip: state.emailListPage * defaultLimit,
    limit: defaultLimit,
    sort: state.sort,
    order: state.order,
  }
  if (state.sent) query.sent = state.sent
  if (state.timeSpan) query.timeSpan = state.timeSpan
  if (state.from) query.from = state.from
  if (state.to) query.to = state.to
  if (state.subject) query.subject = state.subject
  if (state.allText) query.allText = state.allText
  if (state.body) query.body = state.body
  return query
}

export async function getEmailAsync(
  store: Store,
  append = false
): Promise<void> {
  store.dispatch(setEmailLoading(true))
  const server = environment.x2Server
  const query = gql`
    query getEmail(
      $skip: Int
      $limit: Int
      $sort: String
      $order: Int
      $sent: String
      $timeSpan: Int
      $from: String
      $to: String
      $subject: String
      $allText: String
      $body: String
    ) {
      getEmail(
        skip: $skip
        limit: $limit
        sort: $sort
        order: $order
        sent: $sent
        timeSpan: $timeSpan
        from: $from
        to: $to
        subject: $subject
        allText: $allText
        body: $body
      ) {
        emails {
          id
          sent
          sentShort
          from
          fromCustodian
          to
          toCustodians
          cc
          bcc
          subject
          body
        }
        total
      }
    }
  `
  const queryObj = await makeQueryObj(store)
  request(`${server}/graphql/`, query, queryObj)
    .then((data) => {
      if (append) {
        store.dispatch(appendEmail(data.getEmail.emails))
      } else {
        store.dispatch(setEmail(data.getEmail.emails))
      }
      store.dispatch(setEmailTotal(data.getEmail.total))
      store.dispatch(setEmailLoading(false))
      // getSearchHistoryAsync()
    })
    .catch((e) => console.error(e))
}
