import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { CustodiansState, selectCustodians } from '../store/custodians'
import { Custodian } from '../store/types'

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
})
export class CustomerViewComponent {
  custodians$: Observable<Custodian[]>

  constructor(private store: Store<CustodiansState>) {
    this.custodians$ = this.store.pipe(select(selectCustodians))
  }
}
