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
      <pie-highcharts
        id="highcharts-pie-Senders"
        title="Senders"
        [data]="emailSenders"
      ></pie-highcharts>
      <pie-highcharts
        id="highcharts-pie-Receivers"
        title="Receivers"
        [data]="emailReceivers"
      ></pie-highcharts>
    </div>
    <div class="mat-headline">ChartJS</div>
    <div
      fxLayout="row wrap"
      fxLayoutAlign="space-around center"
      fxLayout.xs="column"
      fxLayout.sm="column"
    >
      <pie-chartjs title="Senders" [data]="emailSenders"></pie-chartjs>
      <pie-chartjs title="Receivers" [data]="emailReceivers"></pie-chartjs>
    </div>
    <div class="mat-headline">ECharts</div>
    <div
      fxLayout="row wrap"
      fxLayoutAlign="space-around center"
      fxLayout.xs="column"
      fxLayout.sm="column"
    >
      <pie-echarts title="Senders" [data]="emailSenders"></pie-echarts>
      <pie-echarts title="Receivers" [data]="emailReceivers"></pie-echarts>
    </div>
  `,
  styles: [``],
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
        this.emailSenders = getEmailSenders(custodians)
      })
    this.store
      .pipe(select(selectCustodians))
      .subscribe((custodians: Custodian[]) => {
        this.emailReceivers = getEmailReceivers(custodians)
      })
  }
}
