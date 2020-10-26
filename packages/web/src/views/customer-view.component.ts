import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { Customer } from '../store/customer'
import { select, Store } from '@ngrx/store'
import { selectCustomers } from '../store/customer.selectors'
import { CustomerState } from '../store/customer.reducer'

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
})
export class CustomerViewComponent {
  customers$: Observable<Customer[]>

  constructor(private store: Store<CustomerState>) {
    this.customers$ = this.store.pipe(select(selectCustomers))
  }
}
