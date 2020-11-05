import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { EChartOption } from 'echarts'
import * as Highcharts from 'highcharts'
import { EmailXferedDatum, selectDarkMode } from '../../store'

import treemap from 'highcharts/modules/treemap'
treemap(Highcharts)

// https://www.highcharts.com/demo/bar-basic

@Component({
  selector: 'tree-map-highcharts',
  template: '',
})
export class TreeMapHighchartsComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailXferedDatum>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  darkMode = false
  options: EChartOption = {}
  chart = undefined

  createChart(): void {
    if (!this.data) return
    if (this.chart) this.chart.destroy()

    const options: unknown = {
      chart: {
        height: '70%',
        backgroundColor: this.darkMode ? '#303030' : '#FAFAFA',
      },
      title: {
        text: this.title,
        style: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          // events: {
          //   click: (e: any) => handleClick(search, e.point.name),
          // },
        },
      },
      series: [
        {
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          alternateStartingDirection: true,
          levels: [
            {
              level: 1,
              layoutAlgorithm: 'sliceAndDice',
              dataLabels: {
                enabled: true,
                align: 'left',
                verticalAlign: 'top',
                style: {
                  fontSize: '15px',
                  fontWeight: 'bold',
                },
              },
            },
          ],
          data: this.data,
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
    this.store.pipe(select(selectDarkMode)).subscribe((darkMode: boolean) => {
      this.darkMode = darkMode
      this.createChart()
    })
  }

  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy()
  }
}
