import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import {
  CustodiansState,
  getEmailReceivers,
  getEmailSenders,
  selectCustodians,
} from '../store'
import { Custodian, EmailXferedDatum } from '../store'

@Component({
  templateUrl: './bar-view.component.html',
})
export class BarViewComponent {
  emailSenders: EmailXferedDatum[]
  emailReceivers: EmailXferedDatum[]

  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store<CustodiansState>) { }

  ngOnInit(): void {
    this.store
      .pipe(select(selectCustodians))
      .subscribe((custodians: Custodian[]) => {
        this.emailSenders = getEmailSenders(custodians)
      })
    this.store
      .pipe(select(selectCustodians))
      .subscribe((custodians: Custodian[]) => {
        this.emailReceivers = getEmailReceivers(custodians)
      })
  }
}
