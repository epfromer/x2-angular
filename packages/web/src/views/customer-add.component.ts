import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Customer } from '../store/customer'
import { addCustomer } from '../store/customer.actions'
import { CustomerState } from '../store/customer.reducer'

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
})
export class CustomerAddComponent {
  constructor(private store: Store<CustomerState>) { }

  addCustomer(customerName: string): void {
    const customer = new Customer()
    customer.name = customerName
    this.store.dispatch(addCustomer(customer))
  }
}
