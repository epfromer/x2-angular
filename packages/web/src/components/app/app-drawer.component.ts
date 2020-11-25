import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-drawer',
  template: `<div>foo</div> `,
  styles: [``],
})
export class AppDrawerComponent {
  @Input() opened: boolean

  constructor(private router: Router) {
    // empty constructor
  }

  navTo(loc: string): void {
    this.router.navigateByUrl(loc)
  }
}
