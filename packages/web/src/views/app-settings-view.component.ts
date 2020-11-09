import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  template: `
    <div fxLayout="row">
      <div fxFlex="20">
        <h2 class="mat-h2">Theme</h2>
        <theme-picker></theme-picker>
      </div>
      <div fxFlex>
        <h2 class="mat-h2">Custodian Colors</h2>
        <custodian-settings></custodian-settings>
      </div>
    </div>
  `,
  styles: [
    `
      .header {
        font-size: 20;
      }
    `,
  ],
})
export class AppSettingsViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
