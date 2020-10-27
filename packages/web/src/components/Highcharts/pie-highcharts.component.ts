import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as Highcharts from 'highcharts'

import Boost from 'highcharts/modules/boost'
import noData from 'highcharts/modules/no-data-to-display'
import More from 'highcharts/highcharts-more'

Boost(Highcharts)
noData(Highcharts)
More(Highcharts)
noData(Highcharts)

@Component({
  selector: 'pie-highcharts',
  templateUrl: './pie-highcharts.component.html',
})
export class PieHighchartsComponent {
  // @Input() image: string
  // @Input() title: string
  // @Input() description: string
  // @Input() link: string

  public options: any = {
    chart: {
      type: 'scatter',
      height: 700,
    },
    title: {
      text: 'Sample Scatter Plot',
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function (): unknown {
        return (
          'x: ' +
          Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) +
          '  y: ' +
          this.y.toFixed(2)
        )
      },
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function (): unknown {
          return Highcharts.dateFormat('%e %b %y', this.value)
        },
      },
    },
    series: [
      {
        name: 'Normal',
        turboThreshold: 500000,
        data: [[new Date('2018-01-25 18:38:31').getTime(), 2]],
      },
      {
        name: 'Abnormal',
        turboThreshold: 500000,
        data: [[new Date('2018-02-05 18:38:31').getTime(), 7]],
      },
    ],
  }

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }

  // navTo(url: string): void {
  //   console.log(url)
  //   this._router.navigateByUrl('/' + url)
  // }

  ngOnInit(): void {
    Highcharts.chart('container', this.options)
  }
}
