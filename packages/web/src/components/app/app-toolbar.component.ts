import { Component,  } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
})
export class AppToolbarComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }


  onDrawer(): void {
    console.log('drawer')
  }
  onDark(): void {
    console.log('dark')
  }
  onSettings(): void {
    this._router.navigateByUrl('/CustomerView')
    // this._router.navigateByUrl('/AppSettingsView')
  }
  onSearch(): void {
    this._router.navigateByUrl('/CustomerAdd')
    // this._router.navigateByUrl('/SearchView')
  }
  onHome(): void {
    this._router.navigateByUrl('/HomeView')
  }
}
