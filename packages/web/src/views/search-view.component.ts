import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Email, getEmail } from 'src/store'

@Component({
  template: `
    <mat-table [dataSource]="email" class="mat-elevation-z8">
      <ng-container matColumnDef="sentShort">
        <mat-header-cell *matHeaderCellDef>Sent</mat-header-cell>
        <mat-cell *matCellDef="let email">
          {{ email.sentShort }}
        </mat-cell>
      </ng-container>

      <ng-container matColumnDef="from">
        <mat-header-cell *matHeaderCellDef>From</mat-header-cell>
        <mat-cell *matCellDef="let email">{{ email.from }}</mat-cell>
      </ng-container>

      <ng-container matColumnDef="to">
        <mat-header-cell *matHeaderCellDef>To</mat-header-cell>
        <mat-cell *matCellDef="let email">{{ email.to }}</mat-cell>
      </ng-container>

      <ng-container matColumnDef="subject">
        <mat-header-cell *matHeaderCellDef>Subject</mat-header-cell>
        <mat-cell *matCellDef="let email">{{ email.subject }}</mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row
        *matRowDef="let row; columns: displayedColumns"
        (click)="onClick(row)"
      ></mat-row>
    </mat-table>
  `,
  styles: [
    `
      table {
        widmat-header-cell: 100%;
      }
      mat-header-cell.mat-header-cell {
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
        min-widmat-header-cell: 80px !important;
        widmat-header-cell: 80px !important;
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

  onClick(row: any): void {
    this.router.navigate(['EmailDetailView', { id: row.id }])
  }

  ngOnInit(): void {
    this.store.pipe(select(getEmail)).subscribe((email: Email[]) => {
      this.email = email
    })
  }
}
