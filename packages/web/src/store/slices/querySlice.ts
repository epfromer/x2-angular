import { Action, createAction, createReducer, on } from '@ngrx/store'
import cloneDeep from 'lodash.clonedeep'

export interface QueryState {
  sort: string
  order: number
  sent: string
  timeSpan: number
  from: string
  to: string
  subject: string
  allText: string
  body: string
  emailListPage: number
}
const initialState: QueryState = {
  sort: 'sent',
  order: 1,
  sent: '',
  timeSpan: 0,
  from: '',
  to: '',
  subject: '',
  allText: '',
  body: '',
  emailListPage: 0,
}

// Actions
export const setSort = createAction('setSort', (sort: string) => ({ sort }))
export const setOrder = createAction('setOrder', (order: number) => ({ order }))
export const setSent = createAction('setSent', (sent: string) => ({ sent }))
export const setTimeSpan = createAction('setTimeSpan', (timeSpan: number) => ({
  timeSpan,
}))
export const setFrom = createAction('setFrom', (from: string) => ({ from }))
export const setTo = createAction('setTo', (to: string) => ({ to }))
export const setSubject = createAction('setSubject', (subject: string) => ({
  subject,
}))
export const setAllText = createAction('setAllText', (allText: string) => ({
  allText,
}))
export const setBody = createAction('setBody', (body: string) => ({ body }))
export const setEmailListPage = createAction(
  'setEmailListPage',
  (emailListPage: number) => ({ emailListPage })
)
export const clearSearch = createAction('clearSearch')

// Reducer
export function queryReducer(
  state: QueryState | undefined,
  action: Action
): QueryState {
  const reducer = createReducer(
    initialState,
    on(setSort, (state, val) => {
      const s = cloneDeep(state)
      s.sort = val.sort
      return s
    }),
    on(setOrder, (state, val) => {
      const s = cloneDeep(state)
      s.order = val.order
      return s
    }),
    on(setSent, (state, val) => {
      const s = cloneDeep(state)
      s.sent = val.sent
      return s
    }),
    on(setTimeSpan, (state, val) => {
      const s = cloneDeep(state)
      s.timeSpan = val.timeSpan
      return s
    }),
    on(setFrom, (state, val) => {
      const s = cloneDeep(state)
      s.from = val.from
      return s
    }),
    on(setTo, (state, val) => {
      const s = cloneDeep(state)
      s.to = val.to
      return s
    }),
    on(setSubject, (state, val) => {
      const s = cloneDeep(state)
      s.subject = val.subject
      return s
    }),
    on(setAllText, (state, val) => {
      const s = cloneDeep(state)
      s.allText = val.allText
      return s
    }),
    on(setBody, (state, val) => {
      const s = cloneDeep(state)
      s.body = val.body
      return s
    }),
    on(setEmailListPage, (state, val) => {
      const s = cloneDeep(state)
      s.emailListPage = val.emailListPage
      return s
    }),
    on(clearSearch, (state) => {
      const s = cloneDeep(state)
      s.allText = ''
      s.body = ''
      s.emailListPage = 0
      s.from = ''
      s.order = 1
      s.sort = 'sent'
      s.sent = ''
      s.subject = ''
      s.timeSpan = 0
      s.to = ''
      return s
    })
  )
  return reducer(state, action)
}