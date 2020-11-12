import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import {
  clearSearch,
  Custodian,
  EmailXferedDatum,
  getEmailAsync,
  getEmailReceivers,
  getEmailSenders,
  selectCustodians,
  setFrom,
  setTo,
} from '../store'

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
  constructor(private _router: Router, private store: Store) { }

  handleClick(search: string, value: string): void {
    console.log(search, value, this._router)
    this.store.dispatch(clearSearch())
    const name = value.slice(0, value.search(/,/))
    this.store.dispatch(search === 'from' ? setFrom(name) : setTo(name))
    getEmailAsync(this.store)
    this._router.navigateByUrl('/SearchView')
  }

  ngOnInit(): void {
    this.store
      .pipe(select(selectCustodians))
      .subscribe((custodians: Custodian[]) => {
        this.emailSenders = getEmailSenders(custodians)
        this.emailReceivers = getEmailReceivers(custodians)
      })
  }
}
