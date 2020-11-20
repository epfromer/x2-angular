import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import {
  clearSearch,
  Custodian,
  getEmailAsync,
  getEmailSentByCustodian,
  getCustodians,
  setFrom,
  setTo,
} from '../store'

@Component({
  template: `
    <div class="mat-headline">Highcharts</div>
    <div fxLayout="row" fxLayoutAlign="center">
      <chord-highcharts
        id="chord-highcharts"
        title="Custodian Interaction"
        [data]="data"
        [nodes]="nodes"
        (handleClick)="handleClick($event)"
      >
      </chord-highcharts>
    </div>
    <div class="mat-headline">ECharts</div>
    <div fxLayout="row" fxLayoutAlign="center">
      <chord-echarts
        title="Custodian Interaction"
        [data]="data"
        [nodes]="nodes"
        (handleClick)="handleClick($event)"
      >
      </chord-echarts>
    </div>
  `,
  styles: [],
})
export class ChordViewComponent {
  constructor(private router: Router, private store: Store) {
    // empty constructor
  }

  data = []
  nodes = []

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleClick({ from, to }): void {
    this.store.dispatch(clearSearch())
    this.store.dispatch(setFrom(from.slice(0, from.search(/,/))))
    this.store.dispatch(setTo(to.slice(0, to.search(/,/))))
    getEmailAsync(this.store)
    this.router.navigateByUrl('/SearchView')
  }

  ngOnInit(): void {
    this.store
      .pipe(select(getCustodians))
      .subscribe((custodians: Custodian[]) => {
        const emailSent = getEmailSentByCustodian(custodians)
        this.data = emailSent.data
        this.nodes = emailSent.nodes
      })
  }
}
