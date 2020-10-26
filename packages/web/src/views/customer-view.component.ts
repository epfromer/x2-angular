import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { selectCustomers } from '../store/customer'
import { Customer, CustomerState } from '../store/customer'

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
