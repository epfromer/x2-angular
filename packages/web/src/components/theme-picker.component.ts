import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { setThemeName } from '../store'
import { appThemes } from '../utils/appThemes'

// https://material.angular.io/components/table/overview
// https://material.angular.io/components/button/overview

@Component({
  selector: 'theme-picker',
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="primary">
        <th mat-header-cell *matHeaderCellDef>Color</th>
        <td mat-cell *matCellDef="let theme">
          <button
            mat-raised-button
            [ngStyle]="{ 'background-color': theme.primary }"
            (click)="setThemeName(theme.name)"
          >
            &nbsp;
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: [
    `
      table {
      }
      button {
        width: 50px;
      }
      th.mat-header-cell {
        font-size: 15px;
        text-align: center !important;
      }
    `,
  ],
})
export class ThemePickerComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store) { }

  displayedColumns: string[] = ['primary']
  dataSource = appThemes

  setThemeName(name: string): void {
    this.store.dispatch(setThemeName(name))
  }
}
