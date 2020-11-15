import { Component, HostBinding, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import {
  defaultThemeName,
  getEmailAsync,
  getInitialDataAsync,
  loadAppSettingsAsync,
  getDarkMode,
  getThemeName,
  setDarkModeAsync,
  setThemeNameAsync,
} from './store'

@Component({
  selector: 'app-root',
  template: `
    <div class="container mat-app-background" role="main">
      <app-toolbar></app-toolbar>
      <div class="content mat-app-background">
        <router-outlet></router-outlet>
      </div>
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
        margin-left: auto;
        margin-right: auto;
      }
      .content {
        padding: 20px;
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
    getEmailAsync(this.store)
    this.store.pipe(select(getDarkMode)).subscribe((darkMode: boolean) => {
      setDarkModeAsync(this.store, darkMode)
      this.darkMode = darkMode
      this.setThemeClass()
    })
    this.store.pipe(select(getThemeName)).subscribe((themeName: string) => {
      setThemeNameAsync(this.store, themeName)
      this.themeName = themeName
      this.setThemeClass()
    })
  }
}
