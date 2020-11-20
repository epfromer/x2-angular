import { NgModule } from '@angular/core'
import { NgxEchartsModule } from 'ngx-echarts'
import { BarEChartsComponent } from './bar-echarts.component'
import { ChordEChartsComponent } from './chord-echarts.component'
import { NetworkGraphEChartsComponent } from './network-graph-echarts.component'
import { PieEChartsComponent } from './pie-echarts.component'
import { PolarEChartsComponent } from './polar-echarts.component'
import { TreeMapEChartsComponent } from './tree-map-echarts.component'
import { VolumeTimelineEChartsComponent } from './volume-timeline-echarts.component'
import { WordCloudEChartsComponent } from './word-cloud-echarts.component'

@NgModule({
  imports: [NgxEchartsModule.forRoot({ echarts: () => import('echarts') })],
  declarations: [
    BarEChartsComponent,
    ChordEChartsComponent,
    NetworkGraphEChartsComponent,
    PieEChartsComponent,
    PolarEChartsComponent,
    TreeMapEChartsComponent,
    VolumeTimelineEChartsComponent,
    WordCloudEChartsComponent,
  ],
  providers: [],
  exports: [
    BarEChartsComponent,
    ChordEChartsComponent,
    NetworkGraphEChartsComponent,
    PieEChartsComponent,
    PolarEChartsComponent,
    TreeMapEChartsComponent,
    VolumeTimelineEChartsComponent,
    WordCloudEChartsComponent,
  ],
})
export class EChartsModule {
  // empty constructor
}
