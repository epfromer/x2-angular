import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  template: ` <p>app settings-view works!</p> `,
  styles: [``],
})
export class AppSettingsViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
