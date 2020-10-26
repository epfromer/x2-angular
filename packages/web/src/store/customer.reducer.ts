import { Action, createReducer, on } from '@ngrx/store'
import * as CustomerActions from './customer.actions'
import { Customer } from './customer'

export const customerFeatureKey = 'customers'

export interface CustomerState {
  customers: Customer[]
}

export const initialState: CustomerState = {
  customers: [{ name: 'ed' }, { name: 'cris' }],
}

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.addCustomer, (state: CustomerState, { customer }) => ({
    ...state,
    customers: [...state.customers, customer],
  }))
)

export function reducer(state: CustomerState | undefined, action: Action): any {
  return customerReducer(state, action)
}
