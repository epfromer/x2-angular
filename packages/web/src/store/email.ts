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

async function makeQueryObj(store: Store): Promise<unknown> {
  const sort = await store.pipe(select(selectQuery), take(1)).toPromise()
  console.log(sort)
  // const state = store.getState()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const state = await store.pipe(select(''))
  // const query: any = {
  //   skip: state.query.emailListPage * defaultLimit,
  //   limit: defaultLimit,
  //   sort: state.query.sort,
  //   order: state.query.order,
  // }
  // if (state.query.sent) query.sent = state.query.sent
  // if (state.query.timeSpan) query.timeSpan = state.query.timeSpan
  // if (state.query.from) query.from = state.query.from
  // if (state.query.to) query.to = state.query.to
  // if (state.query.subject) query.subject = state.query.subject
  // if (state.query.allText) query.allText = state.query.allText
  // if (state.query.body) query.body = state.query.body
  // return query
  return {}
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
  request(`${server}/graphql/`, query, makeQueryObj(store))
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
