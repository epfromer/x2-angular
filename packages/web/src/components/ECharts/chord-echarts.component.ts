import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { EChartOption } from 'echarts'
import { EmailSent, IDColorKey, selectDarkMode } from '../../store'

// https://echarts.apache.org/examples/en/index.html#chart-type-graph

@Component({
  selector: 'chord-echarts',
  template: `
    <div class="container">
      <div echarts [options]="options"></div>
    </div>
  `,
  styles: [
    `
      .container {
        width: 700px;
      }
    `,
  ],
})
export class ChordEChartsComponent {
  @Input() title: string
  @Input() data: Array<EmailSent>
  @Input() nodes: Array<IDColorKey>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  darkMode = false
  options: EChartOption = {}

  createChart(): void {
    if (!this.data) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartNodes: Array<any> = this.nodes.map((node) => ({
      id: node.id,
      name: node.id,
      category: node.id,
      itemStyle: {
        color: node.color,
      },
      label: {
        normal: {
          show: true,
        },
      },
    }))

    this.options = {
      title: {
        text: this.title,
        left: 'center',
        textStyle: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      tooltip: {},
      legend: [
        {
          orient: 'vertical',
          x: 'left',
          y: 'center',
          padding: [0, 0, 0, 0],
          textStyle: {
            color: this.darkMode ? 'white' : 'black',
          },
          data: chartNodes.map((a) => a.name),
        },
      ],
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          name: this.title,
          top: 50,
          left: 50,
          right: 50,
          type: 'graph',
          layout: 'circular',
          data: chartNodes,
          links: this.data,
          categories: chartNodes,
          roam: true,
          label: {
            position: 'bottom',
            formatter: '{b}',
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3,
          },
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
