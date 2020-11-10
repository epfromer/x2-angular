/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core'

@Component({
  template: `
    <div fxLayout="row" class="row">
      <div fxFlex="20">
        <h2 class="mat-h2">Theme</h2>
        <theme-picker></theme-picker>
      </div>
      <div fxFlex>
        <h2 class="mat-h2">Custodians</h2>
        <custodian-settings></custodian-settings>
      </div>
    </div>
    <h2 class="mat-h2">Import Log</h2>
    <import-log></import-log>
  `,
  styles: [
    `
      .row {
        margin-bottom: 20px;
      }
    `,
  ],
})
export class AppSettingsViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor() { }
}
