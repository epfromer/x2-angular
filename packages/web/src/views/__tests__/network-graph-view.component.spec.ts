import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { NetworkGraphEChartsComponent } from 'src/components/ECharts/network-graph-echarts.component'
import { NetworkGraphHighchartsComponent } from 'src/components/Highcharts/network-graph-highcharts.component'
import { NetworkGraphViewComponent } from '../network-graph-view.component'
import { SearchViewComponent } from '../search-view.component'

describe('NetworkGraphViewComponent', () => {
  let component: NetworkGraphViewComponent
  let fixture: ComponentFixture<NetworkGraphViewComponent>
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
        NetworkGraphViewComponent,
        NetworkGraphEChartsComponent,
        NetworkGraphHighchartsComponent,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkGraphViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should handleClick', () => {
    component.handleClick({ from: 'Lay, K', to: 'Causey, Foo' })
    expect(component).toBeTruthy()
  })
})
