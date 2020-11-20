import { Component, EventEmitter, Input, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import Boost from 'highcharts/modules/boost'
import HighchartsWheel from 'highcharts/modules/dependency-wheel'
import noData from 'highcharts/modules/no-data-to-display'
import HighchartSankey from 'highcharts/modules/sankey'
import { EmailSent, getDarkMode, IDColorKey } from '../../store'

// https://www.highcharts.com/docs/chart-and-series-types/dependency-wheel

Boost(Highcharts)
noData(Highcharts)
More(Highcharts)
noData(Highcharts)
HighchartSankey(Highcharts)
HighchartsWheel(Highcharts)

@Component({
  selector: 'chord-highcharts',
  template: '',
})
export class ChordHighchartsComponent {
  @Input() title: string
  @Input() data: Array<EmailSent>
  @Input() nodes: Array<IDColorKey>
  @Output() handleClick = new EventEmitter()

  constructor(private store: Store) {
    // empty constructor
  }

  darkMode = false
  chart = undefined

  createChart(): void {
    if (!this.data || !this.data.length) return
    if (this.chart) this.chart.destroy()

    const chartData = this.data.map((datum) => [
      datum.source,
      datum.target,
      datum.value,
    ])

    const options: unknown = {
      chart: {
        backgroundColor: this.darkMode ? '#303030' : '#FAFAFA',
      },
      title: {
        text: this.title,
        style: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      plotOptions: {
        dependencywheel: {
          keys: ['from', 'to', 'weight'],
        },
        series: {
          cursor: 'pointer',
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            click: (e: any) =>
              this.handleClick.emit({ from: e.point.from, to: e.point.to }),
          },
        },
      },
      series: [
        {
          type: 'dependencywheel',
          data: chartData,
          nodes: this.nodes,
        },
      ],
    }

    this.chart = Highcharts.chart('chord-highcharts', options)
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
