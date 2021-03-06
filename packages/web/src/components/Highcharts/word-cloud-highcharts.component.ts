import { Component, EventEmitter, Input, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import Boost from 'highcharts/modules/boost'
import noData from 'highcharts/modules/no-data-to-display'
import HighchartWordCloud from 'highcharts/modules/wordcloud'
import { getDarkMode, WordCloudTag } from 'src/store'

Boost(Highcharts)
noData(Highcharts)
More(Highcharts)
noData(Highcharts)
HighchartWordCloud(Highcharts)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Highcharts.seriesTypes.wordcloud.prototype.deriveFontSize = function (
  relativeWeight: number
) {
  const minFontSize = 5
  const maxFontSize = 25
  return Math.floor(minFontSize + (maxFontSize - minFontSize) * relativeWeight)
}

@Component({
  selector: 'word-cloud-highcharts',
  template: '',
})
export class WordCloudHighchartsComponent {
  @Input() title: string
  @Input() data: Array<WordCloudTag>
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
            click: (e) => this.handleClick.emit(e.point.name),
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
    this.store.pipe(select(getDarkMode)).subscribe((darkMode: boolean) => {
      this.darkMode = darkMode
      this.createChart()
    })
  }

  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy()
  }
}
