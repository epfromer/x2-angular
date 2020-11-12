import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { ChartOptions } from 'chart.js'
import {
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts'
import { EmailSentByDay, selectDarkMode } from '../../store'

// https://www.npmjs.com/package/ng2-charts
// https://www.chartjs.org/docs/latest/configuration/

@Component({
  selector: 'volume-timeline-chartjs',
  template: `
    <div *ngIf="cData.length > 0">
      <canvas
        baseChart
        chartType="bar"
        legend="true"
        [data]="cData"
        [labels]="labels"
        [options]="options"
        [height]="chartHeight"
        [width]="chartWidth"
      >
      </canvas>
    </div>
  `,
  styles: [``],
})
export class VolumeTimelineChartJSComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailSentByDay>
  @Input() handleClick: (search: string, name: string) => void

  constructor(private router: Router, private store: Store) {
    monkeyPatchChartJsTooltip()
    monkeyPatchChartJsLegend()
  }

  darkMode = false
  chartHeight = '300'
  chartWidth = '600'
  options: ChartOptions = {}
  labels: Label[] = []
  cData: SingleDataSet = []

  createChart(): void {
    if (!this.data) return

    this.cData = this.data.map((datum) => datum.total)
    this.labels = this.data.map((datum) => String(datum.sent))
    this.options = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      title: {
        display: true,
        fontColor: this.darkMode ? 'white' : 'black',
        fontSize: 16,
        padding: 10,
        text: this.title,
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'month',
            },
            ticks: {
              fontColor: this.darkMode ? 'white' : 'black',
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
              fontColor: this.darkMode ? 'white' : 'black',
            },
          },
        ],
      },

      // TODO https://www.npmjs.com/package/ng2-charts#events
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // onClick: (e: unknown, item: any) => {
      //   if (item && item.length > 0) {
      //     this.handleClick(this.search, this.data[item[0]._index].name)
      //   }
      // },
    }
  }

  ngOnChanges(): void {
    this.createChart()
  }

  ngOnInit(): void {
    this.createChart()
    this.store.pipe(select(selectDarkMode)).subscribe((darkMode: boolean) => {
      this.darkMode = darkMode
      this.createChart()
    })
  }
}
