import { Component, EventEmitter, Input, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { EChartOption } from 'echarts'
import { EmailSent, IDColorKey, selectDarkMode } from '../../store'

// https://echarts.apache.org/examples/en/index.html#chart-type-graph

@Component({
  selector: 'network-graph-echarts',
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
export class NetworkGraphEChartsComponent {
  @Input() title: string
  @Input() data: Array<EmailSent>
  @Input() nodes: Array<IDColorKey>
  @Output() handleClick = new EventEmitter()

  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store) { }

  darkMode = false
  options: EChartOption = {}

  createChart(): void {
    if (!this.data || !this.data.length) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartNodes: Array<any> = this.nodes.map((node) => ({
      id: node.id,
      name: node.id,
      category: node.id,
      x: null,
      y: null,
      draggable: true,
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
        top: 20,
        left: 'center',
        textStyle: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      tooltip: {},
      legend: [
        {
          bottom: 0,
          data: chartNodes.map((a) => a.name),
          textStyle: {
            color: this.darkMode ? 'white' : 'black',
          },
        },
      ],
      series: [
        {
          name: this.title,
          top: 50,
          left: 50,
          right: 50,
          type: 'graph',
          layout: 'force',
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
          force: {
            repulsion: 1000,
          },
        },
      ],
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onClick(data): void {
    console.log(data)
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
