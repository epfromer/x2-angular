import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { appThemes } from '../utils/appThemes'

@Component({
  selector: 'theme-picker',
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let theme">{{ theme.name }}</td>
      </ng-container>

      <ng-container matColumnDef="primary">
        <th mat-header-cell *matHeaderCellDef>Color</th>
        <td mat-cell *matCellDef="let theme">{{ theme.primary }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: [
    `
      table {
        width: 20%;
      }
    `,
  ],
})
export class ThemePickerComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }

  displayedColumns: string[] = ['name', 'primary']
  dataSource = appThemes
}
