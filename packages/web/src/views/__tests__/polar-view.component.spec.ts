import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { PolarChartJSComponent } from 'src/components/ChartJS/polar-chartjs.component'
import { PolarEChartsComponent } from 'src/components/ECharts/polar-echarts.component'
import { PolarHighchartsComponent } from 'src/components/Highcharts/polar-highcharts.component'
import { PolarViewComponent } from '../polar-view.component'
import { SearchViewComponent } from '../search-view.component'

describe('PolarViewComponent', () => {
  let component: PolarViewComponent
  let fixture: ComponentFixture<PolarViewComponent>
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
        PolarViewComponent,
        PolarChartJSComponent,
        PolarEChartsComponent,
        PolarHighchartsComponent,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarViewComponent)
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
