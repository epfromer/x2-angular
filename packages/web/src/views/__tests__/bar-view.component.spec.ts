import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { BarChartJSComponent } from 'src/components/ChartJS/bar-chartjs.component'
import { BarEChartsComponent } from 'src/components/ECharts/bar-echarts.component'
import { BarHighchartsComponent } from 'src/components/Highcharts/bar-highcharts.component'
import { BarViewComponent } from '../bar-view.component'
import { SearchViewComponent } from '../search-view.component'

describe('BarViewComponent', () => {
  let component: BarViewComponent
  let fixture: ComponentFixture<BarViewComponent>
  const initialState = {
    appSettings: { darkMode: true },
    custodians: { custodians: [] },
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
        BarViewComponent,
        BarChartJSComponent,
        BarEChartsComponent,
        BarHighchartsComponent,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BarViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should handleClick', () => {
    component.handleClick({ search: 'allText', value: 'Causey, Foo' })
    expect(component).toBeTruthy()
  })
})
