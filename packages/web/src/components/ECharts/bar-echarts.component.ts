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
  selector: 'bar-echarts',
  template: `
    <div class="container">
      <div echarts [options]="options" (chartClick)="onClick($event)"></div>
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
export class BarEChartsComponent {
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        axisLabel: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      yAxis: {
        data: chartData.map((datum) => datum.name),
        axisLabel: {
          color: this.darkMode ? 'white' : 'black',
          width: 100,
        },
      },
      series: [
        {
          type: 'bar',
          data: chartData,
          // animationType: 'scale',
          // animationEasing: 'elasticOut',
          // animationDelay: () => Math.random() * 200,
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
