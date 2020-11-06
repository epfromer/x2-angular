import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'theme-picker',
  template: ` <div><p>theme picker</p></div> `,
  styles: [],
})
export class ThemePickerComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }
}
