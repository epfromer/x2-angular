import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthModule } from '@auth0/auth0-angular'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { AppComponent } from 'src/app.component'
import { AppDrawerComponent } from 'src/components/app/app-drawer.component'
import { AppToolbarComponent } from 'src/components/app/app-toolbar.component'
import { SettingsButtonComponent } from 'src/components/app/settings-button.component'
import { HomeCardComponent } from 'src/components/home-card.component'
import { environment } from 'src/environments/environment'
import { AppRoutingModule } from 'src/router/app-routing.module'
import { SearchViewComponent } from 'src/views/search-view.component'

// https://ngrx.io/guide/store/testing

describe('AppComponent', () => {
  let store: MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AuthModule.forRoot({
          domain: environment.auth0Domain,
          clientId: environment.auth0ClientId,
        }),
        BrowserAnimationsModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule.withRoutes([
          { path: 'SearchView', component: SearchViewComponent },
        ]),
      ],
      declarations: [
        AppComponent,
        AppDrawerComponent,
        AppToolbarComponent,
        SettingsButtonComponent,
      ],
      providers: [provideMockStore()],
    }).compileComponents()
  })

  it('should create the app', async () => {
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
