import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { PieChartJSComponent } from 'src/components/ChartJS/pie-chartjs.component'
import { PieEChartsComponent } from 'src/components/ECharts/pie-echarts.component'
import { PieHighchartsComponent } from 'src/components/Highcharts/pie-highcharts.component'
import { PieViewComponent } from '../pie-view.component'
import { SearchViewComponent } from '../search-view.component'

describe('PieViewComponent', () => {
  let component: PieViewComponent
  let fixture: ComponentFixture<PieViewComponent>
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
        PieViewComponent,
        PieChartJSComponent,
        PieEChartsComponent,
        PieHighchartsComponent,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PieViewComponent)
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
