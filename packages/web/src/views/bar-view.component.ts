import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import {
  clearSearch,
  Custodian,
  CustodiansState,
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
      <bar-highcharts
        id="container-Senders"
        title="Senders"
        search="from"
        [data]="emailSenders"
        [handleClick]="handleClick"
      ></bar-highcharts>
      <bar-highcharts
        id="container-Receivers"
        title="Receivers"
        search="to"
        [data]="emailReceivers"
        [handleClick]="handleClick"
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
  constructor(private _router: Router, private store: Store<CustodiansState>) { }

  emailSenders: EmailXferedDatum[]
  emailReceivers: EmailXferedDatum[]

  handleClick(search: string, value: string): void {
    console.log(search, value, this._router)
    this.store.dispatch(clearSearch())
    const name = value.slice(0, value.search(/,/))
    this.store.dispatch(search === 'from' ? setFrom(name) : setTo(name))
    getEmailAsync(this.store)
    this._router.navigateByUrl('/SearchView')
  }

  ngOnInit(): void {
    console.log(this._router)
    this.store
      .pipe(select(selectCustodians))
      .subscribe((custodians: Custodian[]) => {
        this.emailSenders = getEmailSenders(custodians)
        this.emailReceivers = getEmailReceivers(custodians)
      })
  }
}
