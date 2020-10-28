import { Component, Input, SimpleChanges } from '@angular/core'
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
  // TODO - make this into setter to create new data when set?
  // https://angular.io/guide/component-interaction#intercept-input-property-changes-with-a-setter
  @Input() data: Array<EmailXferedDatum>
  @Input() handleClick: (search: string, name: string) => void

  public options2: any = {
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

  foo(): string {
    return JSON.stringify(this.data)
  }

  ngOnInit(): void {
    console.log(this.data)

    if (false) {
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

      console.log(custodians)

      const options: unknown = {
        chart: {
          type: 'pie',
          backgroundColor: 'black',
          height: 700,
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    // TODO this doesn't work - pass observable through?
    console.log(changes)
  }
}
