import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Custodian, getEmailSentByCustodian, selectCustodians } from '../store'

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
      >
      </network-graph-highcharts>
    </div>
    <div class="mat-headline">ECharts</div>
    <div fxLayout="row" fxLayoutAlign="center">
      <network-graph-echarts
        title="Custodian Interaction"
        [data]="data"
        [nodes]="nodes"
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
