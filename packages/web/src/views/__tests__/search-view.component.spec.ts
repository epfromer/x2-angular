import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { SearchViewComponent } from '../search-view.component'

describe('SearchViewComponent', () => {
  let component: SearchViewComponent
  let fixture: ComponentFixture<SearchViewComponent>
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
      declarations: [SearchViewComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // it('should onSearchHistory', () => {
  //   component.onSearchHistory(
  //     JSON.stringify({
  //       allText: 'foo',
  //       sort: 'foo',
  //       order: 1,
  //       from: 'foo',
  //       to: 'foo',
  //       subject: 'foo',
  //       body: 'foo',
  //     })
  //   )
  //   expect(component).toBeTruthy()
  // })
})
