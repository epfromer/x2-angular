import { Component, OnInit, HostBinding } from '@angular/core'
import { getCustodiansAsync } from './store/custodians'
import { selectDarkMode } from './store'
import { select, Store } from '@ngrx/store'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store) { }

  @HostBinding('class') className = ''

  ngOnInit(): void {
    getCustodiansAsync(this.store)
    this.store.pipe(select(selectDarkMode)).subscribe((darkMode: boolean) => {
      this.className = darkMode ? 'darkMode' : ''
    })
  }
}
