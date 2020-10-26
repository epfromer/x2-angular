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
import { HomeCardComponent } from '../components/home-card.component'
import { AppRoutingModule } from '../router/app-routing.module'
import { custodiansReducer } from '../store/custodians.reducer'
import { HomeViewComponent } from '../views/home-view.component'
import { PieViewComponent } from '../views/pie-view.component'
import { AppToolbarComponent } from './app-toolbar.component'
import { AppComponent } from './app.component'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    AppToolbarComponent,
    HomeCardComponent,
    HomeViewComponent,
    PieViewComponent,
    // TODO - add all components
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
    StoreModule.forRoot({ count: custodiansReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
