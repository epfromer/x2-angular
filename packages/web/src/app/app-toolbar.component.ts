import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
})
export class AppToolbarComponent {
  constructor(private _router: Router) { }

  onDrawer(): void {
    console.log('drawer')
  }
  onDark(): void {
    console.log('dark')
  }
  onSettings(): void {
    console.log('settings')
  }
  onSearch(): void {
    this._router.navigateByUrl('/SearchView')
    console.log('search')
  }
  onHome(): void {
    console.log('home')
  }
}
