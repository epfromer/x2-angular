import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import Boost from 'highcharts/modules/boost'
import noData from 'highcharts/modules/no-data-to-display'
import { EmailSentByDay, getDarkMode } from 'src/store'

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
  @Output() handleClick = new EventEmitter()

  constructor(private router: Router, private store: Store) {
    // empty constructor
  }

  darkMode = false
  chart = undefined

  createChart(): void {
    if (!this.data || !this.data.length) return
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            click: (e: any) =>
              this.handleClick.emit(
                new Date(e.point.category).toISOString().slice(0, 10)
              ),
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
    this.store.pipe(select(getDarkMode)).subscribe((darkMode: boolean) => {
      this.darkMode = darkMode
      this.createChart()
    })
  }

  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy()
  }
}
