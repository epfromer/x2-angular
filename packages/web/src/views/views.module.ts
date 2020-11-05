import { NgModule } from '@angular/core'
import { ChartJSModule } from '../components/ChartJS/chartjs.module'
import { EChartsModule } from '../components/ECharts/echarts.module'
import { HighchartsModule } from '../components/Highcharts/highcharts.module'
import { AppSettingsViewComponent } from './app-settings-view.component'
import { BarViewComponent } from './bar-view.component'
import { ChordViewComponent } from './chord-view.component'
import { EmailDetailViewComponent } from './email-detail-view.component'
import { EventTimelineViewComponent } from './event-timeline-view.component'
import { HomeViewComponent } from './home-view.component'
import { NetworkGraphViewComponent } from './network-graph-view.component'
import { PieViewComponent } from './pie-view.component'
import { PolarViewComponent } from './polar-view.component'
import { SearchHistoryViewComponent } from './search-history-view.component'
import { SearchViewComponent } from './search-view.component'
import { TreeMapViewComponent } from './tree-map-view.component'
import { VolumeTimelineViewComponent } from './volume-timeline-view.component'
import { WordCloudViewComponent } from './word-cloud-view.component'

@NgModule({
  imports: [ChartJSModule, EChartsModule, HighchartsModule],
  declarations: [
    AppSettingsViewComponent,
    BarViewComponent,
    ChordViewComponent,
    EmailDetailViewComponent,
    EventTimelineViewComponent,
    HomeViewComponent,
    NetworkGraphViewComponent,
    PieViewComponent,
    PolarViewComponent,
    SearchHistoryViewComponent,
    SearchViewComponent,
    TreeMapViewComponent,
    VolumeTimelineViewComponent,
    WordCloudViewComponent,
  ],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class ViewsModule { }
