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
import { AppComponent } from './app.component'
import { AppToolbarComponent } from './components/app/app-toolbar.component'
import { ChartJSModule } from './components/ChartJS/chartjs.module'
import { EChartsModule } from './components/ECharts/echarts.module'
import { HighchartsModule } from './components/Highcharts/highcharts.module'
import { HomeCardComponent } from './components/home-card.component'
import { AppRoutingModule } from './router/app-routing.module'
import { reducers } from './store'
import { ViewsModule } from './views/views.module'

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
    MatIconModule,
    MatSliderModule,
    MatTableModule,
    MatToolbarModule,
    StoreDevtoolsModule.instrument(),
    StoreModule.forRoot(reducers),
    ViewsModule,
  ],
  declarations: [AppComponent, AppToolbarComponent, HomeCardComponent],
  providers: [],
  bootstrap: [AppComponent],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
