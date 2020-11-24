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
  getCustodians,
  setFrom,
  setTo,
  getCustodiansLoading,
} from '../store'

@Component({
  template: `
    <loading-indicator *ngIf="custodiansLoading"></loading-indicator>
    <div *ngIf="!custodiansLoading">
      <div class="mat-headline">Highcharts</div>
      <div fxLayout="row wrap" fxLayoutAlign="space-around center">
        <pie-highcharts
          id="highcharts-pie-Senders"
          title="Senders"
          search="from"
          [data]="emailSenders"
          (handleClick)="handleClick($event)"
        ></pie-highcharts>
        <pie-highcharts
          id="highcharts-pie-Receivers"
          title="Receivers"
          search="to"
          [data]="emailReceivers"
          (handleClick)="handleClick($event)"
        ></pie-highcharts>
      </div>
      <div class="mat-headline">ChartJS</div>
      <div
        fxLayout="row wrap"
        fxLayoutAlign="space-around center"
        fxLayout.xs="column"
        fxLayout.sm="column"
      >
        <pie-chartjs
          title="Senders"
          search="from"
          [data]="emailSenders"
          (handleClick)="handleClick($event)"
        ></pie-chartjs>
        <pie-chartjs
          title="Receivers"
          search="to"
          [data]="emailReceivers"
          (handleClick)="handleClick($event)"
        ></pie-chartjs>
      </div>
      <div class="mat-headline">ECharts</div>
      <div
        fxLayout="row wrap"
        fxLayoutAlign="space-around center"
        fxLayout.xs="column"
        fxLayout.sm="column"
      >
        <pie-echarts
          title="Senders"
          search="from"
          [data]="emailSenders"
          (handleClick)="handleClick($event)"
        ></pie-echarts>
        <pie-echarts
          title="Receivers"
          search="to"
          [data]="emailReceivers"
          (handleClick)="handleClick($event)"
        ></pie-echarts>
      </div>
    </div>
  `,
  styles: [``],
})
export class PieViewComponent {
  constructor(private router: Router, private store: Store) {
    // empty constructor
  }

  custodiansLoading = false
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
      .pipe(select(getCustodians))
      .subscribe((custodians: Custodian[]) => {
        this.emailSenders = getEmailSenders(custodians)
        this.emailReceivers = getEmailReceivers(custodians)
      })
    this.store
      .pipe(select(getCustodiansLoading))
      .subscribe(
        (custodiansLoading: boolean) =>
          (this.custodiansLoading = custodiansLoading)
      )
  }
}
