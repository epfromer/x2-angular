import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { EChartOption } from 'echarts'
import { EmailXferedDatum } from '../../store/types'

// https://www.npmjs.com/package/ngx-echarts

interface EChartsDatum {
  value: number
  name: string
  itemStyle: unknown
}
@Component({
  selector: 'pie-echarts',
  templateUrl: './pie-echarts.component.html',
})
export class PieEChartsComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailXferedDatum>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }

  options: EChartOption = {}

  createChart(): void {
    if (!this.data) return

    const chartData: Array<EChartsDatum> = []
    this.data.forEach((datum) => {
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
      title: {
        text: this.title,
        top: 20,
        left: 'center',
        textStyle: {
          // eslint-disable-next-line angular/document-service
          color: getComputedStyle(document.body).getPropertyValue('color'),
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      series: [
        {
          type: 'pie',
          radius: '55%',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
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
  }
}
