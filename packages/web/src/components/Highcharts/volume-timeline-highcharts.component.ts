import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import Boost from 'highcharts/modules/boost'
import noData from 'highcharts/modules/no-data-to-display'
import { EmailSentByDay, selectDarkMode } from '../../store'

// https://www.highcharts.com/demo/line-time-series

Boost(Highcharts)
noData(Highcharts)
More(Highcharts)
noData(Highcharts)

@Component({
  selector: 'volume-timeline-highcharts',
  template: '',
})
export class VolumeTimelineHighchartsComponent {
  @Input() title: string
  @Input() data: Array<EmailSentByDay>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  darkMode = false
  chart = undefined

  createChart(): void {
    if (!this.data) return
    if (this.chart) this.chart.destroy()

    const options: unknown = {
      chart: {
        zoomType: 'x',
        backgroundColor: this.darkMode ? '#303030' : '#FAFAFA',
      },
      title: {
        text: this.title,
        style: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      xAxis: {
        labels: {
          overflow: 'justify',
          style: {
            color: this.darkMode ? 'white' : 'black',
          },
        },
        type: 'datetime',
      },
      yAxis: {
        labels: {
          overflow: 'justify',
          style: {
            color: this.darkMode ? 'white' : 'black',
          },
        },
        title: {
          text: '# emails sent',
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          events: {
            // click: (e: any) =>
            //   this.handleClick(
            //     new Date(e.point.category).toISOString().slice(0, 10)
            //   ),
          },
        },
      },
      series: [
        {
          type: 'area',
          name: '# emails sent',
          data: this.data.map((stat) => [
            new Date(stat.sent).getTime(),
            stat.total,
          ]),
        },
      ],
    }

    this.chart = Highcharts.chart('volume-timeline-highcharts', options)
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

  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy()
  }
}
