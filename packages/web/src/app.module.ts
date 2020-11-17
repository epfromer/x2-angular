import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSliderModule } from '@angular/material/slider'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { InViewportModule } from 'ng-in-viewport'
import { ColorPickerModule } from 'ngx-color-picker'
import { AppComponent } from './app.component'
import { AppToolbarComponent } from './components/app/app-toolbar.component'
import { ChartJSModule } from './components/ChartJS/chartjs.module'
import { ColorPickerDlgComponent } from './components/color-picker-dlg.component'
import { CustodianSettingsComponent } from './components/custodian-settings.component'
import { EChartsModule } from './components/ECharts/echarts.module'
import { EmailCardActionsComponent } from './components/emaillist/email-card-actions.component'
import { EmailTableHead } from './components/emaillist/email-table-head.component'
import { FilterDateDlgComponent } from './components/emaillist/filter-date-dlg.component'
import { HighchartsModule } from './components/Highcharts/highcharts.module'
import { HomeCardComponent } from './components/home-card.component'
import { ImportLogComponent } from './components/import-log.component'
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
    ColorPickerModule,
    CommonModule,
    EChartsModule,
    FlexLayoutModule,
    FormsModule,
    HighchartsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSliderModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    InViewportModule,
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
    EmailCardActionsComponent,
    EmailDetailViewComponent,
    EmailTableHead,
    EventTimelineViewComponent,
    FilterDateDlgComponent,
    HomeCardComponent,
    HomeViewComponent,
    ImportLogComponent,
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
