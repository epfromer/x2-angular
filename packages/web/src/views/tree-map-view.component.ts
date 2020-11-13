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
      <tree-map-highcharts
        id="container-Senders"
        title="Senders"
        search="from"
        [data]="emailSenders"
        (handleClick)="handleClick($event)"
      ></tree-map-highcharts>
      <tree-map-highcharts
        id="container-Receivers"
        title="Receivers"
        search="to"
        [data]="emailReceivers"
        (handleClick)="handleClick($event)"
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
        search="from"
        [data]="emailSenders"
        (handleClick)="handleClick($event)"
      ></tree-map-echarts>
      <tree-map-echarts
        title="Receivers"
        search="to"
        [data]="emailReceivers"
        (handleClick)="handleClick($event)"
      ></tree-map-echarts>
    </div>
  `,
  styles: [``],
})
export class TreeMapViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  emailSenders: EmailXferedDatum[]
  emailReceivers: EmailXferedDatum[]

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleClick({ search, value }): void {
    this.store.dispatch(clearSearch())
    const name = value.slice(0, value.search(/,/))
    this.store.dispatch(search === 'from' ? setFrom(name) : setTo(name))
    getEmailAsync(this.store)
    this.router.navigateByUrl('/SearchView')
  }

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
