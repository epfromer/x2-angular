import { Store } from '@ngrx/store'
import { gql, request } from 'graphql-request'
import { environment } from '../environments/environment'
import {
  setWordCloud,
  setWordCloudLoading,
} from '../store/slices/wordCloudSlice'

export function getInitialDataAsync(store: Store): void {
  store.dispatch(setWordCloudLoading(true))
  // store.dispatch(setEmailSentByDayLoading(true))
  // store.dispatch(setCustodiansLoading(true))
  const server = environment.x2Server
  const query = gql`
    {
      getWordCloud {
        tag
        weight
      }
      getEmailSentByDay {
        sent
        total
      }
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
      store.dispatch(setWordCloud(data.getWordCloud))
      // store.dispatch(setEmailSentByDay(data.getEmailSentByDay))
      // store.dispatch(setCustodians(data.getCustodians))
      store.dispatch(setWordCloudLoading(false))
      // store.dispatch(setEmailSentByDayLoading(false))
      // store.dispatch(setCustodiansLoading(false))
    })
    .catch((err) => console.error('getInitialDataAsync: ', err))
}
