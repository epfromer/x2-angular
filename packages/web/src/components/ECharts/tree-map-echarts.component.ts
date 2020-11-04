import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { EChartOption } from 'echarts'
import { EmailXferedDatum, selectDarkMode } from '../../store'

// https://www.npmjs.com/package/ngx-echarts

interface EChartsDatum {
  value: number
  name: string
  itemStyle: unknown
}
@Component({
  selector: 'tree-map-echarts',
  template: `
    <div class="container">
      <div echarts [options]="options"></div>
    </div>
  `,
  styles: [
    `
      .container {
        width: 500px;
      }
    `,
  ],
})
export class TreeMapEChartsComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailXferedDatum>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  darkMode = false
  options: EChartOption = {}

  createChart(): void {
    if (!this.data) return

    const chartData: Array<EChartsDatum> = []
    this.data.reverse().forEach((datum) => {
      chartData.push({
        name: datum.name,
        value: datum.value,
        itemStyle: {
          normal: {
            color: datum.color,
            lineStyle: {
              color: datum.color,
            },
            areaStyle: {
              color: datum.color,
            },
          },
        },
      })
    })

    this.options = {
      grid: {
        left: '1%',
        right: '1%',
        bottom: '3%',
        containLabel: true,
      },
      title: {
        text: this.title,
        top: 20,
        left: 'center',
        textStyle: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      series: [
        {
          type: 'treemap',
          data: chartData,
        },
      ],
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
