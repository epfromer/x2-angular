import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Custodian, selectCustodians } from 'src/store'

@Component({
  selector: 'custodian-settings',
  template: `
    <table mat-table [dataSource]="custodians" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Custodian</th>
        <td mat-cell *matCellDef="let custodian" class="custodian">
          {{ custodian.name }}
        </td>
      </ng-container>

      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Title</th>
        <td mat-cell *matCellDef="let custodian">{{ custodian.title }}</td>
      </ng-container>

      <ng-container matColumnDef="color">
        <th mat-header-cell *matHeaderCellDef>Color</th>
        <td mat-cell *matCellDef="let custodian">
          <button
            mat-raised-button
            [ngStyle]="{ 'background-color': custodian.color }"
            (click)="setCustodianColor(custodian.name)"
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
        width: 100%;
      }
      th.mat-header-cell {
        font-size: 15px;
      }
      .mat-cell {
        padding-right: 10px;
      }
    `,
  ],
})
export class CustodianSettingsComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store) { }

  displayedColumns: string[] = ['name', 'title', 'color']
  custodians: Custodian[] = []

  ngOnInit(): void {
    this.store
      .pipe(select(selectCustodians))
      .subscribe((custodians: Custodian[]) => {
        this.custodians = custodians
      })
  }

  setCustodianColor(name: string, color: string): void {
    console.log(name, color)
    // this.store.dispatch(setThemeName(name))
  }
}
