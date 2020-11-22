import { Component, EventEmitter, Input, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { ChartOptions } from 'chart.js'
import {
  Color,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts'
import { EmailXferedDatum, getDarkMode } from 'src/store'

// https://www.npmjs.com/package/ng2-charts
// https://www.chartjs.org/docs/latest/configuration/

@Component({
  selector: 'pie-chartjs',
  template: `
    <div *ngIf="cData.length > 0">
      <canvas
        baseChart
        chartType="pie"
        legend="true"
        [data]="cData"
        [labels]="labels"
        [options]="options"
        [colors]="colors"
        [height]="chartHeight"
      >
      </canvas>
    </div>
  `,
  styles: [``],
})
export class PieChartJSComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailXferedDatum>
  @Output() handleClick = new EventEmitter()

  constructor(private store: Store) {
    monkeyPatchChartJsTooltip()
    monkeyPatchChartJsLegend()
  }

  darkMode = false
  chartHeight = '400'
  options: ChartOptions = {}
  labels: Label[] = []
  cData: SingleDataSet = []
  colors: Color[] = []

  createChart(): void {
    if (!this.data || !this.data.length) return
    this.cData = this.data.map((datum) => datum.value)
    this.labels = this.data.map((datum) => datum.name)
    this.colors = [{ backgroundColor: this.data.map((datum) => datum.color) }]
    this.options = {
      legend: {
        position: 'bottom',
        labels: {
          fontColor: this.darkMode ? 'white' : 'black',
        },
      },
      title: {
        display: true,
        fontColor: this.darkMode ? 'white' : 'black',
        fontSize: 16,
        padding: 10,
        text: this.title,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick: (e: any, item: any) => {
        if (item && item.length) {
          this.handleClick.emit({
            search: this.search,
            value: this.data[item[0]._index],
          })
        }
      },
    }
  }

  ngOnChanges(): void {
    this.createChart()
  }

  ngOnInit(): void {
    this.createChart()
    this.store.pipe(select(getDarkMode)).subscribe((darkMode: boolean) => {
      this.darkMode = darkMode
      this.createChart()
    })
  }
}
