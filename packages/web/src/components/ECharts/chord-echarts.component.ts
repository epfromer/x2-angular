import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { EChartOption } from 'echarts'
import { EmailSentDatum, IDColorKey, selectDarkMode } from '../../store'

// https://www.npmjs.com/package/ngx-echarts

const chartHeight = '900px'

@Component({
  selector: 'chord-echarts',
  templateUrl: './chord-echarts.component.html',
})
export class ChordEChartsComponent {
  @Input() title: string
  @Input() data: Array<EmailSentDatum>
  @Input() nodes: Array<IDColorKey>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  darkMode = false
  options: EChartOption = {}

  createChart(): void {
    if (!this.data) return
    return

    // const maxSent = this.nodes.reduce(
    //   (maxVal, cur) => (cur.emailTotal > maxVal.emailTotal ? cur : maxVal),
    //   0
    // ).emailTotal
    const chartNodes: Array<any> = this.nodes.map((node) => ({
      id: node.id,
      name: node.id,
      category: node.id,
      // symbolSize: (node.emailTotal / maxSent) * 40 + 10,
      itemStyle: {
        color: node.color,
      },
      label: {
        normal: {
          show: true,
        },
      },
    }))
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
