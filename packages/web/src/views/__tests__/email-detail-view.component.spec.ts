import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { EmailCardActionsComponent } from 'src/components/emaillist/email-card-actions.component'
import { WordCloudHighchartsComponent } from 'src/components/Highcharts/word-cloud-highcharts.component'
import { EmailDetailViewComponent } from '../email-detail-view.component'
import { SearchViewComponent } from '../search-view.component'

describe('EmailDetailViewComponent', () => {
  let component: EmailDetailViewComponent
  let fixture: ComponentFixture<EmailDetailViewComponent>
  const initialState = {
    appSettings: { darkMode: true },
    query: { allText: 'foo' },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        RouterTestingModule.withRoutes([
          { path: 'SearchView', component: SearchViewComponent },
        ]),
      ],
      declarations: [
        EmailDetailViewComponent,
        WordCloudHighchartsComponent,
        EmailCardActionsComponent,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailDetailViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // it('should handleClick', () => {
  //   component.handleClick('foo')
  //   expect(component).toBeTruthy()
  // })
})
