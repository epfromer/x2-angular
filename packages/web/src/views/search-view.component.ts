import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Email, selectEmail } from 'src/store'

@Component({
  template: `
    <table mat-table [dataSource]="email" class="mat-elevation-z8">
      <ng-container matColumnDef="sentShort">
        <th mat-header-cell *matHeaderCellDef>Sent</th>
        <td mat-cell *matCellDef="let email">
          {{ email.sentShort }}
        </td>
      </ng-container>

      <ng-container matColumnDef="from">
        <th mat-header-cell *matHeaderCellDef>From</th>
        <td mat-cell *matCellDef="let email">{{ email.from }}</td>
      </ng-container>

      <ng-container matColumnDef="to">
        <th mat-header-cell *matHeaderCellDef>To</th>
        <td mat-cell *matCellDef="let email">{{ email.to }}</td>
      </ng-container>

      <ng-container matColumnDef="subject">
        <th mat-header-cell *matHeaderCellDef>Subject</th>
        <td mat-cell *matCellDef="let email">{{ email.subject }}</td>
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
        padding-right: 10px;
      }
      .mat-cell {
        padding-right: 10px;
      }
      .mat-column-sentShort {
        word-wrap: break-word !important;
        white-space: unset !important;
        flex: 0 0 80px !important;
        min-width: 80px !important;
        width: 80px !important;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        -ms-hyphens: auto;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
      }
    `,
  ],
})
export class SearchViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  displayedColumns: string[] = ['sentShort', 'from', 'to', 'subject']
  email: Email[]

  ngOnInit(): void {
    this.store.pipe(select(selectEmail)).subscribe((email: Email[]) => {
      this.email = email
    })
  }
}
