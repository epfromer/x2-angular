import { Component, EventEmitter, Input, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { EChartOption } from 'echarts'
import { EmailSentByDay, selectDarkMode } from '../../store'

// https://www.npmjs.com/package/ngx-echarts

@Component({
  selector: 'volume-timeline-echarts',
  template: `
    <div class="container">
      <div echarts [options]="options" (chartClick)="onClick($event)"></div>
    </div>
  `,
  styles: [
    `
      .container {
        height: 400px;
        width: '100%';
      }
    `,
  ],
})
export class VolumeTimelineEChartsComponent {
  @Input() title: string
  @Input() data: Array<EmailSentByDay>
  @Output() handleClick = new EventEmitter()

  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store) { }

  darkMode = false
  options: EChartOption = {}

  createChart(): void {
    if (!this.data || !this.data.length) return
    this.options = {
      title: {
        text: this.title,
        left: 'center',
        textStyle: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        bottom: 90,
      },
      dataZoom: [
        {
          type: 'inside',
        },
        {
          type: 'slider',
        },
      ],
      xAxis: {
        data: this.data.map((datum) => datum.sent),
        silent: false,
        splitLine: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        axisLabel: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      yAxis: {
        splitArea: {
          show: false,
        },
        axisLabel: {
          color: this.darkMode ? 'white' : 'black',
        },
      },
      series: [
        {
          type: 'bar',
          data: this.data.map((datum) => datum.total),
        },
      ],
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onClick(data): void {
    this.handleClick.emit(data.name)
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
