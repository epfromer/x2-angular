import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import Boost from 'highcharts/modules/boost'
import HighchartNetworkGraph from 'highcharts/modules/networkgraph'
import noData from 'highcharts/modules/no-data-to-display'
import { EmailSent, IDColorKey, selectDarkMode } from '../../store'

// https://www.highcharts.com/docs/chart-and-series-types/dependency-wheel

Boost(Highcharts)
noData(Highcharts)
More(Highcharts)
noData(Highcharts)
HighchartNetworkGraph(Highcharts)

@Component({
  selector: 'network-graph-highcharts',
  template: '',
})
export class NetworkGraphHighchartsComponent {
  @Input() title: string
  @Input() data: Array<EmailSent>
  @Input() nodes: Array<IDColorKey>
  @Output() handleClick = new EventEmitter()

  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  darkMode = false
  chart = undefined

  createChart(): void {
    if (!this.data) return
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
        networkgraph: {
          keys: ['from', 'to', 'weight'],
        },
        series: {
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            linkFormat: '{point.fromNode.name} \u2192 {point.toNode.name}',
          },
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            click: (e: any) => this.handleClick.emit(e.point.id),
          },
          marker: {
            radius: 20,
          },
        },
      },
      series: [
        {
          type: 'networkgraph',
          data: chartData,
          nodes: this.nodes,
        },
      ],
    }

    this.chart = Highcharts.chart('network-graph-highcharts', options)
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
