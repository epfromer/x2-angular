import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { EChartOption } from 'echarts'
import { EmailXferedDatum } from '../../store/types'

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

  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  }
}
