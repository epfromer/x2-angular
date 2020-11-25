import { Component, HostBinding, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { defaultThemeName } from './constants'
import {
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
    <mat-drawer-container
      class="container mat-app-background"
      hasBackdrop="true"
      role="main"
    >
      <mat-drawer #drawer mode="over">
        <app-drawer
          (routeClicked)="drawer.toggle(); navTo($event)"
        ></app-drawer>
      </mat-drawer>
      <mat-drawer-content>
        <app-toolbar (openDrawer)="drawer.toggle()"></app-toolbar>
        <div class="content mat-app-background">
          <router-outlet></router-outlet>
        </div>
      </mat-drawer-content>
    </mat-drawer-container>
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
  constructor(private store: Store, private router: Router) {
    // empty constructor
  }

  @HostBinding('class') className = ''
  title = 'x2 Angular'
  darkMode = false
  themeName = defaultThemeName

  setThemeClass(): void {
    this.className =
      'theme' + this.themeName + (this.darkMode ? 'Dark' : 'Light')
  }

  navTo(loc: string): void {
    this.router.navigateByUrl(loc)
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
