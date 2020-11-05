import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Custodian, getEmailSentByCustodian, selectCustodians } from '../store'

@Component({
  template: `
    <div class="mat-headline">Highcharts</div>
    <div fxLayout="row" fxLayoutAlign="center">
      <chord-highcharts
        id="chord-highcharts"
        title="Custodian Interaction"
        [data]="data"
        [nodes]="nodes"
      >
      </chord-highcharts>
    </div>
    <div class="mat-headline">ECharts</div>
    <div fxLayout="row" fxLayoutAlign="center">
      <chord-echarts
        title="Custodian Interaction"
        [data]="data"
        [nodes]="nodes"
      >
      </chord-echarts>
    </div>
  `,
  styles: [],
})
export class ChordViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

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
