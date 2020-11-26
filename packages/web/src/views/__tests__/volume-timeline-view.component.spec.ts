import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { VolumeTimelineChartJSComponent } from 'src/components/ChartJS/volume-timeline-chartjs.component'
import { VolumeTimelineEChartsComponent } from 'src/components/ECharts/volume-timeline-echarts.component'
import { VolumeTimelineHighchartsComponent } from 'src/components/Highcharts/volume-timeline-highcharts.component'
import { SearchViewComponent } from '../search-view.component'
import { VolumeTimelineViewComponent } from '../volume-timeline-view.component'

describe('VolumeTimelineViewComponent', () => {
  let component: VolumeTimelineViewComponent
  let fixture: ComponentFixture<VolumeTimelineViewComponent>
  const initialState = {
    appSettings: { darkMode: true },
    emailSentByDay: { emailSentByDay: [] },
    query: { allText: '' },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        MatCardModule,
        RouterTestingModule.withRoutes([
          { path: 'SearchView', component: SearchViewComponent },
        ]),
      ],
      declarations: [
        VolumeTimelineViewComponent,
        VolumeTimelineChartJSComponent,
        VolumeTimelineEChartsComponent,
        VolumeTimelineHighchartsComponent,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeTimelineViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should handleClick', () => {
    component.handleClick('foo')
    expect(component).toBeTruthy()
  })
})
