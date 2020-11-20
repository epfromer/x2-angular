import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BarHighchartsComponent } from './bar-highcharts.component'
import { ChordHighchartsComponent } from './chord-highcharts.component'
import { NetworkGraphHighchartsComponent } from './network-graph-highcharts.component'
import { PieHighchartsComponent } from './pie-highcharts.component'
import { PolarHighchartsComponent } from './polar-highcharts.component'
import { TreeMapHighchartsComponent } from './tree-map-highcharts.component'
import { VolumeTimelineHighchartsComponent } from './volume-timeline-highcharts.component'
import { WordCloudHighchartsComponent } from './word-cloud-highcharts.component'

@NgModule({
  imports: [CommonModule],
  declarations: [
    BarHighchartsComponent,
    ChordHighchartsComponent,
    NetworkGraphHighchartsComponent,
    PieHighchartsComponent,
    PolarHighchartsComponent,
    TreeMapHighchartsComponent,
    VolumeTimelineHighchartsComponent,
    WordCloudHighchartsComponent,
  ],
  providers: [],
  exports: [
    BarHighchartsComponent,
    ChordHighchartsComponent,
    NetworkGraphHighchartsComponent,
    PieHighchartsComponent,
    PolarHighchartsComponent,
    TreeMapHighchartsComponent,
    VolumeTimelineHighchartsComponent,
    WordCloudHighchartsComponent,
  ],
})
export class HighchartsModule {
  // empty constructor
}
