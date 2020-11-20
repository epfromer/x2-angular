import { Component, EventEmitter, Input, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { EChartOption } from 'echarts'
import * as Highcharts from 'highcharts'
import treemap from 'highcharts/modules/treemap'
import { EmailXferedDatum, getDarkMode } from '../../store'

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
  @Output() handleClick = new EventEmitter()

  constructor(private store: Store) {
    // empty constructor
  }

  darkMode = false
  options: EChartOption = {}
  chart = undefined

  createChart(): void {
    if (!this.data || !this.data.length) return
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
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            click: (e: any) =>
              this.handleClick.emit({
                search: this.search,
                value: e.point.name,
              }),
          },
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
    this.store.pipe(select(getDarkMode)).subscribe((darkMode: boolean) => {
      this.darkMode = darkMode
      this.createChart()
    })
  }

  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy()
  }
}
