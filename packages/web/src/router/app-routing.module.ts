import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppSettingsViewComponent } from '../views/app-settings-view.component'
import { BarViewComponent } from '../views/bar-view.component'
import { ChordViewComponent } from '../views/chord-view.component'
import { EmailDetailViewComponent } from '../views/email-detail-view.component'
import { EventTimelineViewComponent } from '../views/event-timeline-view.component'
import { HomeViewComponent } from '../views/home-view.component'
import { NetworkGraphViewComponent } from '../views/network-graph-view.component'
import { PieViewComponent } from '../views/pie-view.component'
import { SearchHistoryViewComponent } from '../views/search-history-view.component'
import { SearchViewComponent } from '../views/search-view.component'
import { TreeMapViewComponent } from '../views/tree-map-view.component'
import { VolumeTimelineViewComponent } from '../views/volume-timeline-view.component'
import { WordCloudViewComponent } from '../views/word-cloud-view.component'

const routes: Routes = [
  { path: 'AppSettingsView', component: AppSettingsViewComponent },
  { path: 'BarView', component: BarViewComponent },
  { path: 'ChordView', component: ChordViewComponent },
  { path: 'EmailDetailView', component: EmailDetailViewComponent },
  { path: 'EventTimelineView', component: EventTimelineViewComponent },
  { path: 'HomeView', component: HomeViewComponent },
  { path: 'NetworkGraphView', component: NetworkGraphViewComponent },
  { path: 'PieView', component: PieViewComponent },
  { path: 'SearchHistoryView', component: SearchHistoryViewComponent },
  { path: 'SearchView', component: SearchViewComponent },
  { path: 'TreeMapView', component: TreeMapViewComponent },
  { path: 'VolumeTimelineView', component: VolumeTimelineViewComponent },
  { path: 'WordCloudView', component: WordCloudViewComponent },
  { path: '', redirectTo: '/HomeView', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  // empty constructor
}
