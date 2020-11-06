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
  template: `
    <div class="mat-headline">Highcharts</div>
    <div fxLayout="row wrap" fxLayoutAlign="space-around center">
      <polar-highcharts
        id="highcharts-polar-Senders"
        title="Senders"
        [data]="emailSenders"
      ></polar-highcharts>
      <polar-highcharts
        id="highcharts-polar-Receivers"
        title="Receivers"
        [data]="emailReceivers"
      ></polar-highcharts>
    </div>
    <div class="mat-headline">ECharts</div>
    <div
      fxLayout="row wrap"
      fxLayoutAlign="space-around center"
      fxLayout.xs="column"
      fxLayout.sm="column"
    >
      <polar-echarts title="Senders" [data]="emailSenders"></polar-echarts>
      <polar-echarts title="Receivers" [data]="emailReceivers"></polar-echarts>
    </div>
  `,
  styles: [``],
})
export class PolarViewComponent {
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
