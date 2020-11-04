import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { EmailSentByDay, selectEmailSentByDay } from 'src/store'

@Component({
  template: `
    <div class="mat-headline">Highcharts</div>
    <div fxLayout="row" fxLayoutAlign="center">
      <volume-timeline-highcharts
        class="highcharts"
        id="volume-timeline-highcharts"
        title="Email Volume per Day"
        [data]="data"
      >
      </volume-timeline-highcharts>
    </div>
    <div class="mat-headline">ChartJS</div>
    <volume-timeline-chartjs title="Email Volume per Day" [data]="data">
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
  constructor(private _router: Router, private store: Store) { }

  data = []

  ngOnInit(): void {
    this.store
      .pipe(select(selectEmailSentByDay))
      .subscribe((emailSentByDay: Array<EmailSentByDay>) => {
        this.data = emailSentByDay
      })
  }
}
