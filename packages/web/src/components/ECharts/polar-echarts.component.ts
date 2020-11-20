import { Component, EventEmitter, Input, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { EChartOption } from 'echarts'
import { EmailXferedDatum, getDarkMode } from '../../store'

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
      <div echarts [options]="options" (chartClick)="onClick($event)"></div>
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
  @Output() handleClick = new EventEmitter()

  constructor(private store: Store) {
    // empty constructor
  }

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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onClick(data): void {
    this.handleClick.emit({
      search: this.search,
      value: data.name,
    })
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
