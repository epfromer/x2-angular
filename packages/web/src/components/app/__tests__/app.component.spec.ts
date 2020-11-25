import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { AppComponent } from 'src/app.component'

// https://ngrx.io/guide/store/testing

describe('AppComponent', () => {
  let store: MockStore
  const initialState = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [provideMockStore(initialState)],
    }).compileComponents()

    store = TestBed.inject(MockStore)
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'x2 Angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('x2 Angular')
  })
})
