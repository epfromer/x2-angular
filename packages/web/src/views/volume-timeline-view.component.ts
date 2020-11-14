import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import {
  clearSearch,
  EmailSentByDay,
  getEmailAsync,
  getEmailSentByDay,
  setSent,
} from 'src/store'

@Component({
  template: `
    <div class="mat-headline">Highcharts</div>
    <div fxLayout="row" fxLayoutAlign="center">
      <volume-timeline-highcharts
        class="highcharts"
        id="volume-timeline-highcharts"
        title="Email Volume per Day"
        [data]="data"
        (handleClick)="handleClick($event)"
      >
      </volume-timeline-highcharts>
    </div>
    <div class="mat-headline">ChartJS</div>
    <volume-timeline-chartjs
      title="Email Volume per Day"
      [data]="data"
      (handleClick)="handleClick($event)"
    >
    </volume-timeline-chartjs>
    <div class="mat-headline">ECharts</div>
    <volume-timeline-echarts title="Email Volume per Day" [data]="data">
    </volume-timeline-echarts>
  `,
  styles: [
    `
      .highcharts {
        width: 100%;
      }
    `,
  ],
})
export class VolumeTimelineViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  data = []

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleClick(date): void {
    this.store.dispatch(clearSearch())
    this.store.dispatch(setSent(date))
    getEmailAsync(this.store)
    this.router.navigateByUrl('/SearchView')
  }

  ngOnInit(): void {
    this.store
      .pipe(select(getEmailSentByDay))
      .subscribe((emailSentByDay: Array<EmailSentByDay>) => {
        this.data = emailSentByDay
      })
  }
}
