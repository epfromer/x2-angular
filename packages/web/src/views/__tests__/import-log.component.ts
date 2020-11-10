/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core'

@Component({
  selector: 'import-log',
  template: `
    <div>
      <button mat-raised-button color="accent">Import Email</button>
    </div>
  `,
  styles: [
    `
      div {
        width: 100%;
      }
    `,
  ],
})
export class ImportLogComponent {
  // eslint-disable-next-line prettier/prettier
  constructor() { }
}
