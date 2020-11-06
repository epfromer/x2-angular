import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  template: ` <div>
    <p>foo</p>
    <theme-picker></theme-picker>
  </div>`,
  styles: [``],
})
export class AppSettingsViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
