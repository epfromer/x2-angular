import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'home-card',
  template: `
    <mat-card class="card" (click)="navTo(link)">
      <img mat-card-image class="image" src="{{ image }}" />
      <mat-card-title>{{ title }}</mat-card-title>
      <mat-card-content>{{ description }}</mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .card {
        margin: 10px;
      }
      .image {
        height: 250px;
      }
    `,
  ],
})
export class HomeCardComponent {
  @Input() image: string
  @Input() title: string
  @Input() description: string
  @Input() link: string

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }

  navTo(url: string): void {
    this._router.navigateByUrl('/' + url)
  }
}
