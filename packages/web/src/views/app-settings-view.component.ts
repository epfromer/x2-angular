import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  template: ` <div>
    <theme-picker></theme-picker>
    <custodian-settings></custodian-settings>
  </div>`,
  styles: [``],
})
export class AppSettingsViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
