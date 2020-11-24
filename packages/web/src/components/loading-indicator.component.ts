import { Component } from '@angular/core'

@Component({
  selector: 'loading-indicator',
  template: `
    <div class="overlay">
      <div class="center">
        <mat-spinner style="margin:0 auto;"></mat-spinner>
      </div>
    </div>
  `,
  styles: [
    `
      .overlay {
        height: 100vh;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.286);
        z-index: 10;
        top: 0;
        left: 0;
        position: fixed;
      }
      .center {
        position: absolute;
        top: 50%;
        left: 50%;
        -moz-transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }
    `,
  ],
})
export class LoadingIndicatorComponent {
  constructor() {
    // empty constructor
  }
}
