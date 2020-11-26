import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { WordCloudHighchartsComponent } from 'src/components/Highcharts/word-cloud-highcharts.component'
import { SearchViewComponent } from '../search-view.component'
import { WordCloudViewComponent } from '../word-cloud-view.component'

describe('WordCloudViewComponent', () => {
  let component: WordCloudViewComponent
  let fixture: ComponentFixture<WordCloudViewComponent>
  const initialState = {
    appSettings: { darkMode: true },
    wordCloud: { wordCloud: [] },
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
      declarations: [WordCloudViewComponent, WordCloudHighchartsComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCloudViewComponent)
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
