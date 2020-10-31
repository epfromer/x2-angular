import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { EChartOption } from 'echarts'
import * as Highcharts from 'highcharts'
import { EmailXferedDatum, selectDarkMode } from '../../store'

@Component({
  selector: 'bar-highcharts',
  templateUrl: './bar-highcharts.component.html',
})
export class BarHighchartsComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailXferedDatum>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  darkMode = false
  options: EChartOption = {}

  createChart(): void {
    if (!this.data) return

    const options: unknown = {
      chart: {
        type: 'bar',
        backgroundColor: this.darkMode ? '#303030' : '#FAFAFA',
      },
      title: {
        text: this.title,
        style: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      xAxis: {
        categories: this.data.map((datum) => datum.name),
        title: {
          text: null,
        },
        labels: {
          style: {
            color: this.darkMode ? 'white' : 'black',
          },
        },
      },
      yAxis: {
        labels: {
          overflow: 'justify',
          style: {
            color: this.darkMode ? 'white' : 'black',
          },
        },
        title: {
          text: null,
        },
      },
      tooltip: {
        valueSuffix: ' email',
      },
      plotOptions: {
        bar: {
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            click: (e: any) => this.handleClick(this.search, e.point.category),
          },
        },
      },
      series: [
        {
          showInLegend: false,
          colorByPoint: true,
          colors: this.data.map((datum) => datum.color),
          data: this.data.map((datum) => datum.value),
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
