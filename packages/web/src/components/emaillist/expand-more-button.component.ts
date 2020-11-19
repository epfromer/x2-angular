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
      (click)="closed = !closed"
    >
      <div [@expand]="closed ? 'closed' : 'opened'">
        <mat-icon>expand_more</mat-icon>
      </div>
    </button>
  `,
  styles: [
    `
      .close: {
        transition: 300ms transform;
      }
      .open: {
        animation: spin 300ms;
        transform: rotate(180deg);
      }
      @keyframes spin: {
        0%: {
          transform: rotate(0deg);
        }
        100%: {
          transform: rotate(180deg);
        }
      }
    `,
  ],
  animations: [
    trigger('expand', [
      state('opened', style({ backgroundColor: 'yellow' })),
      state('closed', style({ backgroundColor: 'green' })),
      transition(
        'opened <=> closed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ExpandMoreButton {
  // eslint-disable-next-line prettier/prettier
  constructor() { }

  closed = true
}
