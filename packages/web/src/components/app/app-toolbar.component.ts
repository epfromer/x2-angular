import { Component, EventEmitter, Output } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { getDarkMode, setDarkMode } from 'src/store'

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar color="primary" role="toolbar" class="toolbar">
      <button
        mat-icon-button
        aria-label="Open drawer"
        matTooltip="Open drawer"
        (click)="openDrawer.emit()"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <span>x2 Angular</span>
      <span class="spacer"></span>
      <button
        mat-icon-button
        aria-label="Toggle light/dark theme"
        matTooltip="Toggle light/dark theme"
        (click)="onDark()"
      >
        <mat-icon *ngIf="darkMode">brightness_high</mat-icon>
        <mat-icon *ngIf="!darkMode">brightness_4</mat-icon>
      </button>
      <settings-button></settings-button>
      <button
        mat-icon-button
        aria-label="Search"
        matTooltip="Search"
        (click)="onSearch()"
      >
        <mat-icon>search</mat-icon>
      </button>
      <button
        mat-icon-button
        aria-label="x2 Home"
        matTooltip="x2 Home"
        (click)="onHome()"
      >
        <mat-icon>home</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
      .toolbar {
        position: sticky;
        /* For macOS/iOS Safari */
        position: -webkit-sticky;
        /* Sets the sticky toolbar to be on top */
        top: 0;
        /* Ensure that your app's content doesn't overlap the toolbar */
        z-index: 1000;
      }
    `,
  ],
})
export class AppToolbarComponent {
  @Output() openDrawer = new EventEmitter()

  constructor(private router: Router, private store: Store) {
    // empty constructor
  }

  darkMode = false
  drawerOpen = false

  ngOnInit(): void {
    this.store.pipe(select(getDarkMode)).subscribe((darkMode: boolean) => {
      this.darkMode = darkMode
    })
  }

  onDrawer(): void {
    console.log('drawer')
  }
  onDark(): void {
    this.store.dispatch(setDarkMode(!this.darkMode))
  }
  onSearch(): void {
    this.router.navigateByUrl('/SearchView')
  }
  onHome(): void {
    this.router.navigateByUrl('/HomeView')
  }
}
