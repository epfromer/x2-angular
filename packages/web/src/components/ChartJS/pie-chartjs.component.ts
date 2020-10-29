import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { EmailXferedDatum } from '../../store/types'
import { ChartType, ChartOptions } from 'chart.js'
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts'

@Component({
  selector: 'pie-chartjs',
  templateUrl: './pie-chartjs.component.html',
})
export class PieChartJSComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailXferedDatum>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) {
    monkeyPatchChartJsTooltip()
    monkeyPatchChartJsLegend()
  }

  public chartHeight = '350'

  // https://www.npmjs.com/package/ng2-charts

  public pieChartOptions: ChartOptions = {
    responsive: true,
  }
  public pieChartLabels: Label[] = [
    ['Download', 'Sales'],
    ['In', 'Store', 'Sales'],
    'Mail Sales',
  ]
  public pieChartData: SingleDataSet = [300, 500, 100]
  public pieChartType: ChartType = 'pie'
  public pieChartLegend = true
  public pieChartPlugins = []
}
