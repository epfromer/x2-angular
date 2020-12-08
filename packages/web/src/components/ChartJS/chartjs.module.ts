import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ChartsModule } from 'ng2-charts'
import { BarChartJSComponent } from './bar-chartjs.component'
import { PieChartJSComponent } from './pie-chartjs.component'
import { VolumeTimelineChartJSComponent } from './volume-timeline-chartjs.component'

@NgModule({
  imports: [ChartsModule, CommonModule],
  declarations: [
    BarChartJSComponent,
    PieChartJSComponent,
    VolumeTimelineChartJSComponent,
  ],
  providers: [],
  exports: [
    BarChartJSComponent,
    PieChartJSComponent,
    VolumeTimelineChartJSComponent,
  ],
})
export class ChartJSModule {
  // empty constructor
}
