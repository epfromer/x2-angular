import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Router } from '@angular/router'
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
  selector: 'polar-highcharts',
  template: '',
})
export class PolarHighchartsComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailXferedDatum>
  @Output() handleClick = new EventEmitter()

  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  darkMode = false
  chart = undefined
  chartData = []

  createChart(): void {
    if (!this.data || !this.data.length) return
    if (this.chart) this.chart.destroy()

    this.chartData = this.data.map((datum) => ({
      type: 'column',
      name: datum.name,
      data: [datum.value],
      color: datum.color,
      pointPlacement: 'between',
      events: {
        click: () =>
          this.handleClick.emit({ search: this.search, value: datum.name }),
      },
    }))

    const options: unknown = {
      chart: {
        polar: true,
        height: '100%',
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
      xAxis: {
        labels: {
          format: '{value}',
        },
      },
      legend: {
        itemStyle: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      plotOptions: {
        series: {
          pointStart: 0,
          pointInterval: 45,
        },
        column: {
          pointPadding: 0,
          groupPadding: 0,
        },
      },
      series: this.chartData,
    }

    this.chart = Highcharts.chart('highcharts-polar-' + this.title, options)
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
