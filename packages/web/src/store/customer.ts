import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store'

export const customerFeatureKey = 'customers'

export interface Customer {
  name: string
}
export interface CustomerState {
  customers: Customer[]
}
export const initialState: CustomerState = {
  customers: [{ name: 'ed' }, { name: 'cris' }],
}

// Actions
export const addCustomer = createAction(
  '[Customer] Add Customer',
  (customer: Customer) => ({ customer })
)

// Reducer
export const customerReducer = createReducer(
  initialState,
  on(addCustomer, (state: CustomerState, { customer }) => ({
    ...state,
    customers: [...state.customers, customer],
  }))
)

export function reducer(state: CustomerState | undefined, action: Action): any {
  return customerReducer(state, action)
}

// Selectors
export const selectCustomerState = createFeatureSelector<CustomerState>(
  customerFeatureKey
)

export const selectCustomers = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.customers
)
