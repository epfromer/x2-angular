import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  CustodiansState,
  selectCustodians,
} from '../store/slices/custodiansSlice'
import { Custodian } from '../store/types'

@Component({
  templateUrl: './pie-view.component.html',
})
export class PieViewComponent {
  custodians$: Observable<Custodian[]>

  constructor(private store: Store<CustodiansState>) {
    this.custodians$ = this.store.pipe(select(selectCustodians))
  }
}
