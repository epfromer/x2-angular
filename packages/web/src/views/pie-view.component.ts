import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import {
  CustodiansState,
  selectEmailReceivers,
  selectEmailSenders,
} from '../store/slices/custodiansSlice'
import { EmailXferedDatum } from '../store/types'

@Component({
  templateUrl: './pie-view.component.html',
})
export class PieViewComponent {
  emailSenders: EmailXferedDatum[]
  emailReceivers: EmailXferedDatum[]

  constructor(private store: Store<CustodiansState>) { }

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
