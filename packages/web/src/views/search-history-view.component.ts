import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  templateUrl: './search-history-view.component.html',
})
export class SearchHistoryViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
