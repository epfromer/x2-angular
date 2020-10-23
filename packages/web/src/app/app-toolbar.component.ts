import { Component } from '@angular/core'

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
})
export class AppToolbarComponent {
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
    console.log('search')
  }
  onHome(): void {
    console.log('home')
  }
}
