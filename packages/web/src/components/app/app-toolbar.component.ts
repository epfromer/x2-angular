import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { selectDarkMode, setDarkMode } from '../../store'

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
})
export class AppToolbarComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  darkMode = false

  ngOnInit(): void {
    this.store.pipe(select(selectDarkMode)).subscribe((darkMode: boolean) => {
      this.darkMode = darkMode
    })
  }

  onDrawer(): void {
    console.log('drawer')
  }
  onDark(): void {
    this.store.dispatch(setDarkMode(!this.darkMode))
  }
  onSettings(): void {
    this._router.navigateByUrl('/AppSettingsView')
  }
  onSearch(): void {
    this._router.navigateByUrl('/SearchView')
  }
  onHome(): void {
    this._router.navigateByUrl('/HomeView')
  }
}
