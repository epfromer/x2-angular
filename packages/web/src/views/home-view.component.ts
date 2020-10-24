import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  templateUrl: './home-view.component.html',
})
export class HomeViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
