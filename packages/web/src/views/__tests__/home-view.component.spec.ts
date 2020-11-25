import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthModule } from '@auth0/auth0-angular'
import { provideMockStore } from '@ngrx/store/testing'
import { HomeCardComponent } from 'src/components/home-card.component'
import { environment } from 'src/environments/environment'
import { AppRoutingModule } from 'src/router/app-routing.module'
import { HomeViewComponent } from '../home-view.component'

describe('HomeViewComponent', () => {
  let component: HomeViewComponent
  let fixture: ComponentFixture<HomeViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        MatCardModule,
        RouterTestingModule,
      ],
      declarations: [HomeViewComponent, HomeCardComponent],
      providers: [provideMockStore()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
