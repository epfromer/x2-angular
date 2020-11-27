import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { SearchHistoryViewComponent } from '../search-history-view.component'
import { SearchViewComponent } from '../search-view.component'

describe('SearchHistoryViewComponent', () => {
  let component: SearchHistoryViewComponent
  let fixture: ComponentFixture<SearchHistoryViewComponent>
  const initialState = {
    appSettings: { darkMode: true },
    email: { email: [] },
    query: { allText: '' },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        MatCardModule,
        MatTableModule,
        RouterTestingModule.withRoutes([
          { path: 'SearchView', component: SearchViewComponent },
        ]),
      ],
      declarations: [SearchHistoryViewComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHistoryViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should onSearchHistory', () => {
    component.onSearchHistory(
      JSON.stringify({ allText: 'foo', sort: 'foo', order: 1 })
    )
    expect(component).toBeTruthy()
  })
})
