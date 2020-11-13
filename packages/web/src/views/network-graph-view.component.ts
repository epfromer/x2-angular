import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import {
  clearSearch,
  Custodian,
  getEmailAsync,
  getEmailSentByCustodian,
  selectCustodians,
  setFrom,
  setTo,
} from '../store'

@Component({
  template: `
    <div class="mat-headline">Highcharts</div>
    <div fxLayout="row" fxLayoutAlign="center">
      <network-graph-highcharts
        class="highcharts"
        id="network-graph-highcharts"
        title="Custodian Interaction"
        [data]="data"
        [nodes]="nodes"
        (handleClick)="handleClick($event)"
      >
      </network-graph-highcharts>
    </div>
    <div class="mat-headline">ECharts</div>
    <div fxLayout="row" fxLayoutAlign="center">
      <network-graph-echarts
        title="Custodian Interaction"
        [data]="data"
        [nodes]="nodes"
        (handleClick)="handleClick($event)"
      >
      </network-graph-echarts>
    </div>
  `,
  styles: [
    `
      .highcharts {
        width: 100%;
      }
    `,
  ],
})
export class NetworkGraphViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  data = []
  nodes = []

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleClick(names): void {
    this.store.dispatch(clearSearch())
    if (names.from) {
      this.store.dispatch(setFrom(names.from.slice(0, names.from.search(/,/))))
    }
    if (names.to) {
      this.store.dispatch(setTo(names.to.slice(0, names.to.search(/,/))))
    }
    getEmailAsync(this.store)
    this.router.navigateByUrl('/SearchView')
  }

  ngOnInit(): void {
    this.store
      .pipe(select(selectCustodians))
      .subscribe((custodians: Custodian[]) => {
        const emailSent = getEmailSentByCustodian(custodians)
        this.data = emailSent.data
        this.nodes = emailSent.nodes
      })
  }
}
