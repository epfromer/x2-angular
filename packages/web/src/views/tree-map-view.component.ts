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
      <tree-map-highcharts
        id="container-Senders"
        title="Senders"
        [data]="emailSenders"
      ></tree-map-highcharts>
      <tree-map-highcharts
        id="container-Receivers"
        title="Receivers"
        [data]="emailReceivers"
      ></tree-map-highcharts>
    </div>
    <div class="mat-headline">ECharts</div>
    <div
      fxLayout="row wrap"
      fxLayoutAlign="space-around center"
      fxLayout.xs="column"
      fxLayout.sm="column"
    >
      <tree-map-echarts
        title="Senders"
        [data]="emailSenders"
      ></tree-map-echarts>
      <tree-map-echarts
        title="Receivers"
        [data]="emailReceivers"
      ></tree-map-echarts>
    </div>
  `,
  styles: [``],
})
export class TreeMapViewComponent {
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
