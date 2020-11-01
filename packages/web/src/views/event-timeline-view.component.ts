import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  template: ` <p>event-timeline-view works!</p> `,
  styles: [``],
})
export class EventTimelineViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
