import { Component, EventEmitter, Input, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { EChartOption } from 'echarts'
import { EmailSent, getDarkMode, IDColorKey } from '../../store'

// https://echarts.apache.org/examples/en/index.html#chart-type-graph

@Component({
  selector: 'chord-echarts',
  template: `
    <div class="container">
      <div echarts [options]="options" (chartClick)="onClick($event)"></div>
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
  @Output() handleClick = new EventEmitter()

  constructor(private store: Store) {
    // empty constructor
  }

  darkMode = false
  options: EChartOption = {}

  createChart(): void {
    if (!this.data || !this.data.length) return
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onClick(data): void {
    const names = data.name.split('>')
    if (names && names.length > 1) {
      this.handleClick.emit({ from: names[0].trim(), to: names[1].trim() })
    }
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
}
