import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  template: ` <p>email detail-view works!</p> `,
  styles: [``],
})
export class EmailDetailViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
