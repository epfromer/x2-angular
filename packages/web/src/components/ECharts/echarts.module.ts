import { NgModule } from '@angular/core'
import { BarEChartsComponent } from './bar-echarts.component'
import { ChordEChartsComponent } from './chord-echarts.component'
import { NetworkGraphEChartsComponent } from './network-graph-echarts.component'
import { PieEChartsComponent } from './pie-echarts.component'
import { TreeMapEChartsComponent } from './tree-map-echarts.component'
import { VolumeTimelineEChartsComponent } from './volume-timeline-echarts.component'
import { WordCloudEChartsComponent } from './word-cloud-echarts.component'
import { NgxEchartsModule } from 'ngx-echarts'

@NgModule({
  imports: [NgxEchartsModule.forRoot({ echarts: () => import('echarts') })],
  declarations: [
    BarEChartsComponent,
    ChordEChartsComponent,
    NetworkGraphEChartsComponent,
    PieEChartsComponent,
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
    TreeMapEChartsComponent,
    VolumeTimelineEChartsComponent,
    WordCloudEChartsComponent,
  ],
})
// eslint-disable-next-line prettier/prettier
export class EChartsModule { }
