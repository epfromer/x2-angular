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
      <bar-highcharts
        id="container-Senders"
        title="Senders"
        [data]="emailSenders"
      ></bar-highcharts>
      <bar-highcharts
        id="container-Receivers"
        title="Receivers"
        [data]="emailReceivers"
      ></bar-highcharts>
    </div>
    <div class="mat-headline">ChartJS</div>
    <div
      fxLayout="row wrap"
      fxLayoutAlign="space-around center"
      fxLayout.xs="column"
      fxLayout.sm="column"
    >
      <bar-chartjs title="Senders" [data]="emailSenders"></bar-chartjs>
      <bar-chartjs title="Receivers" [data]="emailReceivers"></bar-chartjs>
    </div>
    <div class="mat-headline">ECharts</div>
    <div
      fxLayout="row wrap"
      fxLayoutAlign="space-around center"
      fxLayout.xs="column"
      fxLayout.sm="column"
    >
      <bar-echarts title="Senders" [data]="emailSenders"></bar-echarts>
      <bar-echarts title="Receivers" [data]="emailReceivers"></bar-echarts>
    </div>
  `,
  styles: [``],
})
export class BarViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store<CustodiansState>) { }

  emailSenders: EmailXferedDatum[]
  emailReceivers: EmailXferedDatum[]

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
