import { Component } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'

// https://angular.io/guide/animations
// https://stackoverflow.com/questions/44330983/angular-animation-rotation-180-click-image

@Component({
  selector: 'expand-more-component',
  template: `
    <button
      mat-icon-button
      aria-label="Open / Close"
      matTooltip="Open / Close"
      (click)="rotate()"
      [@rotatedState]="state"
    >
      <mat-icon>expand_more</mat-icon>
    </button>
  `,
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('rotated => default', animate('300ms ease-out')),
      transition('default => rotated', animate('300ms ease-in')),
    ]),
  ],
})
export class ExpandMoreButton {
  state = 'default'

  rotate(): void {
    this.state = this.state === 'default' ? 'rotated' : 'default'
  }
}
