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
  selector: 'polar-echarts',
  template: `
    <div class="container">
      <div echarts [options]="options"></div>
    </div>
  `,
  styles: [
    `
      .container {
        height: 400px;
        width: 500px;
      }
    `,
  ],
})
export class PolarEChartsComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailXferedDatum>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  darkMode = false
  options: EChartOption = {}

  createChart(): void {
    if (!this.data || !this.data.length) return
    const chartData: Array<EChartsDatum> = []
    this.data.forEach((datum) => {
      chartData.push({
        name: datum.name,
        value: datum.value,
        itemStyle: {
          normal: {
            color: datum.color,
          },
        },
      })
    })

    this.options = {
      title: {
        text: this.title,
        left: 'center',
        textStyle: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        show: true,
        bottom: 0,
        textStyle: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      series: [
        {
          type: 'pie',
          roseType: 'radius',
          label: {
            color: this.darkMode ? 'white' : 'black',
          },
          labelLine: {
            lineStyle: {
              color: this.darkMode ? 'white' : 'black',
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
          data: chartData,
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: () => Math.random() * 200,
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
