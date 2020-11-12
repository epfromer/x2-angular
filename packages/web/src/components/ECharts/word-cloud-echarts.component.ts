import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { EChartOption } from 'echarts'
import { WordCloudTag, selectDarkMode } from '../../store'

// https://www.npmjs.com/package/ngx-echarts

// TODO - no wordcloud in ngx-charts

@Component({
  selector: 'word-cloud-echarts',
  template: `
    <div class="container">
      <div echarts [options]="options"></div>
    </div>
  `,
  styles: [
    `
      .container {
        width: 500px;
      }
    `,
  ],
})
export class WordCloudEChartsComponent {
  @Input() title: string
  @Input() data: Array<WordCloudTag>
  @Input() handleClick: (word: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  darkMode = false
  options: EChartOption = {}

  createChart(): void {
    if (!this.data) return

    console.log(this.data)

    this.options = {
      title: {
        text: this.title,
        top: 20,
        left: 'center',
        textStyle: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      series: [
        {
          type: 'wordCloud',
          shape: 'circle',
          maskImage: undefined,
          left: 'center',
          top: 'center',
          width: '90%',
          height: '80%',
          right: null,
          bottom: null,
          sizeRange: [12, 60],
          rotationRange: [-90, 90],
          rotationStep: 45,
          gridSize: 18,
          drawOutOfBound: false,
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: function () {
                // Random color
                return (
                  'rgb(' +
                  [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                  ].join(',') +
                  ')'
                )
              },
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333',
            },
          },
          data: this.data.map((word) => ({
            name: word.tag,
            value: word.weight,
          })),
        },
      ],
    }
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
