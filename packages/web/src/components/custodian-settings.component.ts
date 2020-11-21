import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { select, Store } from '@ngrx/store'
import { gql, request } from 'graphql-request'
import { Custodian, getCustodians, setCustodians } from 'src/store'
import { environment } from '../environments/environment'
import { ColorPickerDlgComponent } from './color-picker-dlg.component'

@Component({
  selector: 'custodian-settings',
  template: `
    <table mat-table [dataSource]="custodians" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Custodian</th>
        <td mat-cell *matCellDef="let custodian">
          {{ custodian.name }}
        </td>
      </ng-container>

      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Title</th>
        <td mat-cell *matCellDef="let custodian">{{ custodian.title }}</td>
      </ng-container>

      <ng-container matColumnDef="sent">
        <th mat-header-cell *matHeaderCellDef class="align-right">Sent</th>
        <td mat-cell *matCellDef="let custodian" class="align-right">
          {{ custodian.senderTotal }}
        </td>
      </ng-container>

      <ng-container matColumnDef="received">
        <th mat-header-cell *matHeaderCellDef class="align-right">Received</th>
        <td mat-cell *matCellDef="let custodian" class="align-right">
          {{ custodian.receiverTotal }}
        </td>
      </ng-container>

      <ng-container matColumnDef="color">
        <th mat-header-cell *matHeaderCellDef class="align-center">Color</th>
        <td mat-cell *matCellDef="let custodian" class="align-center">
          <button
            mat-raised-button
            [ngStyle]="{ 'background-color': custodian.color }"
            (click)="setCustodianColor(custodian.id, custodian.color)"
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
      th.mat-header-cell {
        font-size: 15px;
        min-width: 150px;
      }
      .align-right {
        padding-right: 20px;
        text-align: right;
      }
      .align-center {
        text-align: center;
      }
    `,
  ],
})
export class CustodianSettingsComponent {
  constructor(private store: Store, public dialog: MatDialog) {
    // empty constructor
  }

  displayedColumns: string[] = ['name', 'title', 'sent', 'received', 'color']
  custodians: Custodian[] = []
  defaultColor = ''

  ngOnInit(): void {
    this.store
      .pipe(select(getCustodians))
      .subscribe((custodians: Custodian[]) => (this.custodians = custodians))
  }

  setCustodianColor(id: string, color: string): void {
    this.defaultColor = color

    const dialogRef = this.dialog.open(ColorPickerDlgComponent, {
      width: '280px',
      data: { defaultColor: color },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.defaultColor = result
        const server = environment.x2Server
        const mutation = gql`
          mutation setCustodianColor($id: ID, $color: String) {
            setCustodianColor(id: $id, color: $color) {
              id
              name
              title
              color
              senderTotal
              receiverTotal
              toCustodians {
                custodianId
                total
              }
            }
          }
        `
        request(`${server}/graphql/`, mutation, { id, color: result })
          .then((data) =>
            this.store.dispatch(setCustodians(data.setCustodianColor))
          )
          .catch((e) => console.error(e))
      }
    })
  }
}
