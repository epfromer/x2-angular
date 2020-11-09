import { Component, HostBinding, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import {
  defaultThemeName,
  getInitialDataAsync,
  selectDarkMode,
  selectThemeName,
  setDarkModeAsync,
  setThemeNameAsync,
  loadAppSettingsAsync,
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
        height: 100%;
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
  darkMode = false
  themeName = defaultThemeName

  setThemeClass(): void {
    this.className =
      'theme' + this.themeName + (this.darkMode ? 'Dark' : 'Light')
  }

  ngOnInit(): void {
    loadAppSettingsAsync(this.store)
    getInitialDataAsync(this.store)
    this.store.pipe(select(selectDarkMode)).subscribe((darkMode: boolean) => {
      setDarkModeAsync(this.store, darkMode)
      this.darkMode = darkMode
      this.setThemeClass()
    })
    this.store.pipe(select(selectThemeName)).subscribe((themeName: string) => {
      setThemeNameAsync(this.store, themeName)
      this.themeName = themeName
      this.setThemeClass()
    })
  }
}
