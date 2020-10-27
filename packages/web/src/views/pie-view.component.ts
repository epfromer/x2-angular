import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  CustodiansState,
  selectCustodians,
  selectEmailSenders,
  selectEmailReceivers,
} from '../store/slices/custodiansSlice'
import { Custodian, EmailXferedDatum } from '../store/types'

@Component({
  templateUrl: './pie-view.component.html',
})
export class PieViewComponent implements OnInit {
  custodians$: Observable<Custodian[]>
  emailSenders: EmailXferedDatum[]
  emailReceivers: EmailXferedDatum[]

  constructor(private store: Store<CustodiansState>) {
    this.custodians$ = this.store.pipe(select(selectCustodians))
  }

  ngOnInit(): void {
    this.store
      .pipe(select(selectEmailSenders))
      .subscribe((senders: EmailXferedDatum[]) => (this.emailSenders = senders))
    this.store
      .pipe(select(selectEmailReceivers))
      .subscribe(
        (receivers: EmailXferedDatum[]) => (this.emailReceivers = receivers)
      )
  }

  receviers(): string {
    return JSON.stringify(this.emailReceivers)
  }
}
