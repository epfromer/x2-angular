import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { HomeCardComponent } from '../components/home-card.component'

@Component({
  templateUrl: './home-view.component.html',
})
export class HomeViewComponent {
  @Input() homeCard: HomeCardComponent

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
