import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  template: ` <p>search-history-view works!</p> `,
  styles: [``],
})
export class SearchHistoryViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router) { }
}
