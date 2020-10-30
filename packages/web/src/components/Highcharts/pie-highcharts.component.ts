import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import * as Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import Boost from 'highcharts/modules/boost'
import noData from 'highcharts/modules/no-data-to-display'
import { EmailXferedDatum, selectDarkMode } from '../../store'
import { select, Store } from '@ngrx/store'

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
  constructor(private _router: Router, private store: Store) { }

  darkMode = false

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
        backgroundColor: this.darkMode ? '#303030' : '#FAFAFA',
      },
      title: {
        text: this.title,
        style: {
          color: this.darkMode ? 'white' : 'black',
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

    Highcharts.chart('container-' + this.title, options)
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