import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { TreeMapEChartsComponent } from 'src/components/ECharts/tree-map-echarts.component'
import { TreeMapHighchartsComponent } from 'src/components/Highcharts/tree-map-highcharts.component'
import { SearchViewComponent } from '../search-view.component'
import { TreeMapViewComponent } from '../tree-map-view.component'

describe('TreeMapViewComponent', () => {
  let component: TreeMapViewComponent
  let fixture: ComponentFixture<TreeMapViewComponent>
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
        TreeMapEChartsComponent,
        TreeMapHighchartsComponent,
        TreeMapViewComponent,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeMapViewComponent)
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
