import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { HomeCardComponent } from 'src/components/home-card.component'
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
