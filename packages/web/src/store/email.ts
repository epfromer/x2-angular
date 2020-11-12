import { select, Store } from '@ngrx/store'
import { take } from 'rxjs/operators'
import { gql, request } from 'graphql-request'
// import { getSearchHistoryAsync } from './searchHistory'
import { environment } from '../environments/environment'
import { selectQuery } from './selectors'
import {
  appendEmail,
  setEmail,
  setEmailLoading,
  setEmailTotal,
} from './slices/emailSlice'
import { defaultLimit } from './constants'

async function makeQueryObj(store: Store): Promise<unknown> {
  const state = await store.pipe(select(selectQuery), take(1)).toPromise()
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
    .catch((err) => console.error('getEmailAsync: ', err))
}
