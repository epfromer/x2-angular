import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  templateUrl: './bar-view.component.html',
})
export class BarViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
