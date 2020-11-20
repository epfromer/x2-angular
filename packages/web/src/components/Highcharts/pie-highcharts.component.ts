import { Component, EventEmitter, Input, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import Boost from 'highcharts/modules/boost'
import noData from 'highcharts/modules/no-data-to-display'
import { EmailXferedDatum, getDarkMode } from '../../store'

// https://www.highcharts.com/demo/pie-basic

Boost(Highcharts)
noData(Highcharts)
More(Highcharts)
noData(Highcharts)

@Component({
  selector: 'pie-highcharts',
  template: '',
})
export class PieHighchartsComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailXferedDatum>
  @Output() handleClick = new EventEmitter()

  constructor(private store: Store) {
    // empty constructor
  }

  darkMode = false
  chart = undefined

  createChart(): void {
    if (!this.data || !this.data.length) return
    if (this.chart) this.chart.destroy()

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
          click: () =>
            this.handleClick.emit({ search: this.search, value: datum.name }),
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

    this.chart = Highcharts.chart('highcharts-pie-' + this.title, options)
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

  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy()
  }
}
