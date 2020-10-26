import { createAction } from '@ngrx/store'
import { Customer } from './customer'

export const addCustomer = createAction(
  '[Customer] Add Customer',
  (customer: Customer) => ({ customer })
)
