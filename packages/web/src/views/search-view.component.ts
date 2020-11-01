import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  template: ` <p>search-view works!</p> `,
  styles: [``],
})
export class SearchViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
