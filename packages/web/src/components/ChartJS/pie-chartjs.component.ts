import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { ChartOptions } from 'chart.js'
import {
  Color,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts'
import { EmailXferedDatum } from '../../store/types'

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

  // https://www.npmjs.com/package/ng2-charts

  public chartHeight = '400'
  public options: ChartOptions = {}
  public labels: Label[] = []
  public cData: SingleDataSet = []
  public colors: Color[] = []

  createChart(): void {
    this.cData = this.data.map((datum) => datum.value)
    this.labels = this.data.map((datum) => datum.name)
    this.colors = [{ backgroundColor: this.data.map((datum) => datum.color) }]
    this.options = {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        // eslint-disable-next-line angular/document-service
        fontColor: getComputedStyle(document.body).getPropertyValue('color'),
        fontSize: 16,
        padding: 10,
        text: this.title,
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
  }
}
