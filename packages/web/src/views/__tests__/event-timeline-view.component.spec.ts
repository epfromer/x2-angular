import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { EventTimelineViewComponent } from '../event-timeline-view.component'
import { SearchViewComponent } from '../search-view.component'

describe('EventTimelineViewComponent', () => {
  let component: EventTimelineViewComponent
  let fixture: ComponentFixture<EventTimelineViewComponent>
  const initialState = {
    appSettings: { darkMode: true },
    custodians: { custodians: [] },
    query: { allText: 'foo' },
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
      providers: [provideMockStore({ initialState })],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTimelineViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should handleClick', () => {
    component.handleClick('allText', 'Causey, Foo')
    expect(component).toBeTruthy()
  })
})
