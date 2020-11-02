import { Component, HostBinding, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import {
  getCustodiansAsync,
  getInitialDataAsync,
  selectDarkMode,
} from './store'

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <div class="container mat-app-background" role="main">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        width: 100%;
        display: block;
        box-sizing: border-box;
        padding: 20px;
        margin-left: auto;
        margin-right: auto;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store) { }

  @HostBinding('class') className = ''

  ngOnInit(): void {
    getInitialDataAsync(this.store)
    getCustodiansAsync(this.store)
    this.store.pipe(select(selectDarkMode)).subscribe((darkMode: boolean) => {
      this.className = darkMode ? 'darkMode' : ''
    })
  }
}
