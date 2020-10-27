import { gql, request } from 'graphql-request'
import { environment } from '../environments/environment'
import { Store } from '@ngrx/store'
import { setCustodiansLoading } from '../store/slices/custodiansSlice'
// import { setCustodians, setCustodiansLoading, store } from './index'

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
      // console.log(data)
      store.dispatch(setCustodiansLoading(false))
      // store.dispatch(setCustodians(data.getCustodians))
      // store.dispatch(setCustodiansLoading(false))
    })
    .catch((err) => console.error('getCustodiansAsync: ', err))
}
