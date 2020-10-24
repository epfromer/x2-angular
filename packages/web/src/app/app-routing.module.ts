import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeViewComponent } from '../views/home-view.component'
import { SearchViewComponent } from '../views/search-view.component'

const routes: Routes = [
  { path: 'HomeView', component: HomeViewComponent },
  { path: 'SearchView', component: SearchViewComponent },
  { path: '', redirectTo: '/HomeView', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
// eslint-disable-next-line prettier/prettier
export class AppRoutingModule { }
