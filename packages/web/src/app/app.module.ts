import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatSliderModule } from '@angular/material/slider'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { HomeCardComponent } from '../components/home-card.component'
import { AppRoutingModule } from '../router/app-routing.module'
import { reducer } from '../store/customer.reducer'
import { AppSettingsViewComponent } from '../views/app-settings-view.component'
import { BarViewComponent } from '../views/bar-view.component'
import { ChordViewComponent } from '../views/chord-view.component'
import { EmailDetailViewComponent } from '../views/email-detail-view.component'
import { EmailTimelineViewComponent } from '../views/email-timeline-view.component'
import { EventTimelineViewComponent } from '../views/event-timeline-view.component'
import { HomeViewComponent } from '../views/home-view.component'
import { NetworkGraphViewComponent } from '../views/network-graph-view.component'
import { PieViewComponent } from '../views/pie-view.component'
import { PolarViewComponent } from '../views/polar-view.component'
import { SearchHistoryViewComponent } from '../views/search-history-view.component'
import { SearchViewComponent } from '../views/search-view.component'
import { TreeMapViewComponent } from '../views/tree-map-view.component'
import { VolumeTimelineViewComponent } from '../views/volume-timeline-view.component'
import { WordCloudViewComponent } from '../views/word-cloud-view.component'
import { AppToolbarComponent } from './app-toolbar.component'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent,
    AppSettingsViewComponent,
    AppToolbarComponent,
    BarViewComponent,
    ChordViewComponent,
    EmailDetailViewComponent,
    EmailTimelineViewComponent,
    EventTimelineViewComponent,
    HomeCardComponent,
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
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSliderModule,
    MatTableModule,
    MatToolbarModule,
    StoreDevtoolsModule.instrument(),
    StoreModule.forRoot({ customers: reducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
