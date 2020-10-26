import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
// import { Custodian } from '../store/types'
import { Customer } from '../store/customer'
// import { selectCustomers } from '../store/customer.selectors'

@Component({
  templateUrl: './pie-view.component.html',
})
export class PieViewComponent {
  custodians$: Observable<any>
  customers$: Observable<Customer[]>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(
    private _router: Router,
    private store: Store<{ custodians: any }>
  ) {
    // this.customers$ = this.store.pipe(select(selectCustomers))
  }

  // ngOnInit(): void {
  //   console.log(this.store.select('custodians'))
  // }

  foo(f): void {
    console.log(f)
  }
}
