import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { ChordEChartsComponent } from 'src/components/ECharts/chord-echarts.component'
import { ChordHighchartsComponent } from 'src/components/Highcharts/chord-highcharts.component'
import { ChordViewComponent } from '../chord-view.component'
import { SearchViewComponent } from '../search-view.component'

describe('ChordViewComponent', () => {
  let component: ChordViewComponent
  let fixture: ComponentFixture<ChordViewComponent>
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
        ChordViewComponent,
        ChordEChartsComponent,
        ChordHighchartsComponent,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordViewComponent)
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
