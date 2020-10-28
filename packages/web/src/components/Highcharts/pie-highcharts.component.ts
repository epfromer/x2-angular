import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import * as Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import Boost from 'highcharts/modules/boost'
import noData from 'highcharts/modules/no-data-to-display'
import { EmailXferedDatum } from '../../store/types'

// https://www.highcharts.com/demo/pie-basic

Boost(Highcharts)
noData(Highcharts)
More(Highcharts)
noData(Highcharts)

@Component({
  selector: 'pie-highcharts',
  templateUrl: './pie-highcharts.component.html',
})
export class PieHighchartsComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailXferedDatum>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }

  createChart(): void {
    if (!this.data) return

    interface HighchartsDatum {
      name: string
      y: number
      color: string
      events: unknown
    }
    const custodians: Array<HighchartsDatum> = []
    this.data.forEach((datum) => {
      custodians.push({
        name: datum.name,
        y: datum.value,
        color: datum.color,
        events: {
          click: () => this.handleClick(this.search, datum.name),
        },
      })
    })

    const options: unknown = {
      chart: {
        type: 'pie',
        backgroundColor: 'black',
        height: 700,
        width: 500,
      },
      title: {
        text: this.title,
        style: {
          color: 'white',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          data: custodians,
        },
      ],
    }

    Highcharts.chart('container', options)
  }

  ngOnChanges(): void {
    this.createChart()
  }

  ngOnInit(): void {
    this.createChart()
  }
}
