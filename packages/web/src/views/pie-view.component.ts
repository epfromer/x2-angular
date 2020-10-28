import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import {
  CustodiansState,
  getEmailReceivers,
  selectCustodians,
} from '../store/slices/custodiansSlice'
import { Custodian, EmailXferedDatum } from '../store/types'

@Component({
  templateUrl: './pie-view.component.html',
})
export class PieViewComponent {
  emailSenders: EmailXferedDatum[]
  emailReceivers: EmailXferedDatum[]

  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store<CustodiansState>) { }

  ngOnInit(): void {
    this.store
      .pipe(select(selectCustodians))
      .subscribe((custodians: Custodian[]) => {
        this.emailReceivers = getEmailReceivers(custodians)
      })
  }
}
