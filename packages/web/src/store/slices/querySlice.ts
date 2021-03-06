import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store'
import cloneDeep from 'lodash.clonedeep'

export interface QueryState {
  sort: string
  order: number
  sent: string
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
      s.to = ''
      return s
    })
  )
  return reducer(state, action)
}

// selectors & getters
export const getAllText = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.allText
)
export const getBody = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.body
)
export const getEmailListPage = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.emailListPage
)
export const getFrom = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.from
)
export const getOrder = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.order
)
export const getSort = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.sort
)
export const getSent = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.sent
)
export const getSubject = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.subject
)
export const getTo = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.to
)
export const getQuery = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => ({
    allText: state.allText,
    body: state.body,
    emailListPage: state.emailListPage,
    from: state.from,
    order: state.order,
    sent: state.sent,
    sort: state.sort,
    subject: state.subject,
    to: state.to,
  })
)
