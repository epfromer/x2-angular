import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatSliderModule } from '@angular/material/slider'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppComponent } from './app.component'
import { AppToolbarComponent } from './components/app/app-toolbar.component'
import { ChartJSModule } from './components/ChartJS/chartjs.module'
import { ColorPickerDlgComponent } from './components/color-picker-dlg.component'
import { CustodianSettingsComponent } from './components/custodian-settings.component'
import { EChartsModule } from './components/ECharts/echarts.module'
import { HighchartsModule } from './components/Highcharts/highcharts.module'
import { HomeCardComponent } from './components/home-card.component'
import { ThemePickerComponent } from './components/theme-picker.component'
import { AppRoutingModule } from './router/app-routing.module'
import { reducers } from './store'
import { AppSettingsViewComponent } from './views/app-settings-view.component'
import { BarViewComponent } from './views/bar-view.component'
import { ChordViewComponent } from './views/chord-view.component'
import { EmailDetailViewComponent } from './views/email-detail-view.component'
import { EventTimelineViewComponent } from './views/event-timeline-view.component'
import { HomeViewComponent } from './views/home-view.component'
import { NetworkGraphViewComponent } from './views/network-graph-view.component'
import { PieViewComponent } from './views/pie-view.component'
import { PolarViewComponent } from './views/polar-view.component'
import { SearchHistoryViewComponent } from './views/search-history-view.component'
import { SearchViewComponent } from './views/search-view.component'
import { TreeMapViewComponent } from './views/tree-map-view.component'
import { VolumeTimelineViewComponent } from './views/volume-timeline-view.component'
import { WordCloudViewComponent } from './views/word-cloud-view.component'

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ChartJSModule,
    CommonModule,
    EChartsModule,
    FlexLayoutModule,
    HighchartsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatSliderModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    StoreDevtoolsModule.instrument(),
    StoreModule.forRoot(reducers),
  ],
  declarations: [
    AppComponent,
    AppSettingsViewComponent,
    AppToolbarComponent,
    BarViewComponent,
    ChordViewComponent,
    ColorPickerDlgComponent,
    CustodianSettingsComponent,
    EmailDetailViewComponent,
    EventTimelineViewComponent,
    HomeCardComponent,
    HomeViewComponent,
    NetworkGraphViewComponent,
    PieViewComponent,
    PolarViewComponent,
    SearchHistoryViewComponent,
    SearchViewComponent,
    ThemePickerComponent,
    TreeMapViewComponent,
    VolumeTimelineViewComponent,
    WordCloudViewComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
