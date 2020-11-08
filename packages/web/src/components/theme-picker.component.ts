import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { appThemes } from '../utils/appThemes'

// https://material.angular.io/components/table/overview
// https://material.angular.io/components/button/overview

@Component({
  selector: 'theme-picker',
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Theme</th>
        <td mat-cell *matCellDef="let theme">{{ theme.name }}</td>
      </ng-container>

      <ng-container matColumnDef="primary">
        <th mat-header-cell *matHeaderCellDef>Color</th>
        <td mat-cell *matCellDef="let theme">
          <button mat-raised-button color="{{ theme.name }}">
            {{ theme.primary }}
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
        width: 20%;
      }
      th.mat-header-cell {
        font-size: 15px;
        text-align: center !important;
      }
      .mat-raised-button.mat-Red,
      .mat-flat-button.mat-Red {
        margin-left: 10px;
        background-color: #b71c1c;
        color: white;
      }
      .mat-raised-button.mat-Orange,
      .mat-flat-button.mat-Orange {
        margin-left: 10px;
        background-color: #e65100;
        color: white;
      }
      .mat-raised-button.mat-Yellow,
      .mat-flat-button.mat-Yellow {
        margin-left: 10px;
        background-color: #fdd835;
        color: black;
      }
      .mat-raised-button.mat-Green,
      .mat-flat-button.mat-Green {
        margin-left: 10px;
        background-color: #2e7d32;
        color: white;
      }
      .mat-raised-button.mat-Blue,
      .mat-flat-button.mat-Blue {
        margin-left: 10px;
        background-color: #1565c0;
        color: white;
      }
      .mat-raised-button.mat-Purple,
      .mat-flat-button.mat-Purple {
        margin-left: 10px;
        background-color: #6a1b9a;
        color: white;
      }
      .mat-raised-button.mat-Brown,
      .mat-flat-button.mat-Brown {
        margin-left: 10px;
        background-color: #4e342e;
        color: white;
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
