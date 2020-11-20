import { Component, EventEmitter, Input, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as Highcharts from 'highcharts'
import { EmailXferedDatum, getDarkMode } from '../../store'

// https://www.highcharts.com/demo/bar-basic

@Component({
  selector: 'bar-highcharts',
  template: '',
})
export class BarHighchartsComponent {
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
            click: (e: any) =>
              this.handleClick.emit({
                search: this.search,
                value: e.point.category,
              }),
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

    this.chart = Highcharts.chart('container-' + this.title, options)
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
