import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  template: ` <p>network-graph-view works!</p> `,
  styles: [``],
})
export class NetworkGraphViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
