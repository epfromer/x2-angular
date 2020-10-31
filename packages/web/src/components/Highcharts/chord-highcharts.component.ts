import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import Boost from 'highcharts/modules/boost'
import HighchartsWheel from 'highcharts/modules/dependency-wheel'
import noData from 'highcharts/modules/no-data-to-display'
import HighchartSankey from 'highcharts/modules/sankey'
import {
  EmailXferedDatum,
  selectDarkMode,
  selectEmailSentByCustodian,
  EmailSentByCustodian,
  IDColorKey,
} from '../../store'

// https://www.highcharts.com/demo/pie-basic

Boost(Highcharts)
noData(Highcharts)
More(Highcharts)
noData(Highcharts)
HighchartSankey(Highcharts)
HighchartsWheel(Highcharts)

// https://www.highcharts.com/docs/chart-and-series-types/dependency-wheel

const chartHeight = '95%'

@Component({
  selector: 'chord-highcharts',
  templateUrl: './chord-highcharts.component.html',
})
export class ChordHighchartsComponent {
  @Input() title: string
  @Input() data: Array<unknown>
  @Input() nodes: Array<IDColorKey>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  darkMode = false

  createChart(): void {
    if (!this.data) return

    const options: unknown = {
      chart: {
        height: chartHeight,
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
            click: (e: any) => this.handleClick(e.point.from, e.point.to),
          },
        },
      },
      series: [
        {
          type: 'dependencywheel',
          data: this.data,
          nodes: this.nodes,
        },
      ],
    }

    Highcharts.chart('highcharts-chord', options)
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
