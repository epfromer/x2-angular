import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'

@Component({
  template: ` <p>search-view works!</p> `,
  styles: [``],
})
export class SearchViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }
}
