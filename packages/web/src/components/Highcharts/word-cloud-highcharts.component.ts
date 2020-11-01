import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import Boost from 'highcharts/modules/boost'
import noData from 'highcharts/modules/no-data-to-display'
import HighchartWordCloud from 'highcharts/modules/wordcloud'
import { selectDarkMode, WordCloudTag } from '../../store'

Boost(Highcharts)
noData(Highcharts)
More(Highcharts)
noData(Highcharts)
HighchartWordCloud(Highcharts)

const chartHeight = '500px'

@Component({
  selector: 'word-cloud-highcharts',
  templateUrl: './word-cloud-highcharts.component.html',
})
export class WordCloudHighchartsComponent {
  @Input() title: string
  @Input() data: Array<WordCloudTag>
  @Input() handleClick: (word: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  darkMode = false
  chart = undefined

  createChart(): void {
    if (!this.data) return
    if (this.chart) this.chart.destroy()

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
        series: {
          cursor: 'pointer',
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            click: (e: any) => this.handleClick(e.point.name),
          },
        },
      },
      series: [
        {
          type: 'wordcloud',
          name: 'Occurrences',
          data: this.data.map((word) => ({
            name: word.tag,
            weight: word.weight,
          })),
        },
      ],
    }

    this.chart = Highcharts.chart('highcharts-word-cloud', options)
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
