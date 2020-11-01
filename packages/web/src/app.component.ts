import { Component, HostBinding, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import {
  getCustodiansAsync,
  getInitialDataAsync,
  selectDarkMode,
} from './store'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
