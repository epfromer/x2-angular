import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'home-card',
  templateUrl: './home-card.component.html',
})
export class HomeCardComponent {
  @Input() image: string
  @Input() title: string
  @Input() description: string
  @Input() link: string

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }

  navTo(url: string): void {
    console.log(url)
    this._router.navigateByUrl('/' + url)
  }
}
