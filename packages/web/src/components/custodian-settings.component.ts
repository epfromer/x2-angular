import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Custodian, selectCustodians } from 'src/store'

@Component({
  selector: 'custodian-settings',
  template: `
    <table mat-table [dataSource]="custodians" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Custodian</th>
        <td mat-cell *matCellDef="let custodian">{{ custodian.name }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: [``],
})
export class CustodianSettingsComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store) { }

  displayedColumns: string[] = ['name']
  custodians: Custodian[] = []

  ngOnInit(): void {
    this.store
      .pipe(select(selectCustodians))
      .subscribe((custodians: Custodian[]) => {
        this.custodians = custodians
      })
  }
}
