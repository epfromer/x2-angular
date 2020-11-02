import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import Boost from 'highcharts/modules/boost'
import noData from 'highcharts/modules/no-data-to-display'
import { EmailSent, IDColorKey, selectDarkMode } from '../../store'

// https://www.highcharts.com/demo/line-time-series

Boost(Highcharts)
noData(Highcharts)
More(Highcharts)
noData(Highcharts)

const chartHeight = '95%'

@Component({
  selector: 'volume-timeline-highcharts',
  template: '',
})
export class VolumeTimelineHighchartsComponent {
  @Input() title: string
  @Input() data: Array<EmailSent>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  darkMode = false
  chart = undefined

  createChart(): void {
    if (!this.data) return
    if (this.chart) this.chart.destroy()

    const options: unknown = {}

    this.chart = Highcharts.chart('highcharts-volume-timeline', options)
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
