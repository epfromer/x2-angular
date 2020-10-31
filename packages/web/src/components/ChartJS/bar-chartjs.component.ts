import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { ChartOptions } from 'chart.js'
import {
  Color,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts'
import { EmailXferedDatum, selectDarkMode } from '../../store'

// https://www.npmjs.com/package/ng2-charts

@Component({
  selector: 'bar-chartjs',
  templateUrl: './bar-chartjs.component.html',
})
export class BarChartJSComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailXferedDatum>
  @Input() handleClick: (search: string, name: string) => void

  constructor(private _router: Router, private store: Store) {
    monkeyPatchChartJsTooltip()
    monkeyPatchChartJsLegend()
  }

  darkMode = false
  legend = false
  chartHeight = '300'
  chartWidth = '600'
  options: ChartOptions = {}
  labels: Label[] = []
  cData: SingleDataSet = []
  colors: Color[] = []

  createChart(): void {
    if (!this.data) return

    this.cData = this.data.map((datum) => datum.value)
    this.labels = this.data.map((datum) => datum.name)
    this.colors = [{ backgroundColor: this.data.map((datum) => datum.color) }]
    this.options = {
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
