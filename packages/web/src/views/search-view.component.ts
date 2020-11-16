import { Component, ElementRef, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import {
  Email,
  getEmail,
  getEmailAsync,
  getEmailListPage,
  getEmailLoading,
  setEmailListPage,
  setOrder,
  setSort,
} from 'src/store'
import { Sort } from '@angular/material/sort'

@Component({
  template: `
    <div class="mat-elevation-z8" #tableWrapper>
      <email-table-head></email-table-head>
      <mat-table
        [dataSource]="email"
        matSort
        (matSortChange)="sortData($event)"
      >
        <ng-container matColumnDef="sentShort">
          <mat-header-cell *matHeaderCellDef mat-sort-header>
            Sent
          </mat-header-cell>
          <mat-cell *matCellDef="let email">
            {{ email.sentShort }}
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="from">
          <mat-header-cell *matHeaderCellDef mat-sort-header>
            From
          </mat-header-cell>
          <mat-cell *matCellDef="let email">{{ email.from }}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="to">
          <mat-header-cell *matHeaderCellDef mat-sort-header>
            To
          </mat-header-cell>
          <mat-cell *matCellDef="let email">{{ email.to }}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="subject">
          <mat-header-cell *matHeaderCellDef mat-sort-header>
            Subject
          </mat-header-cell>
          <mat-cell *matCellDef="let email">{{ email.subject }}</mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row
          *matRowDef="let row; columns: displayedColumns; let i = index"
          (click)="onClick(row)"
          inViewport
          [inViewportOptions]="{ threshold: [0] }"
          (inViewportAction)="onIntersection($event, i)"
        ></mat-row>
      </mat-table>
    </div>
  `,
  styles: [
    `
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

  totalEmails = 0
  emailLoading = false
  emailListPage = 0
  searchColumns: string[] = ['allTextFilter']
  displayedColumns: string[] = ['sentShort', 'from', 'to', 'subject']
  email: Email[]

  @ViewChild('tableWrapper', { read: ElementRef }) rootElement: ElementRef

  onClick(row: { id: string }): void {
    this.router.navigate(['EmailDetailView', { id: row.id }])
  }

  ngOnInit(): void {
    this.store.pipe(select(getEmail)).subscribe((email: Email[]) => {
      this.email = email
      if (email) {
        this.totalEmails = email.length
      }
    })
    this.store
      .pipe(select(getEmailLoading))
      .subscribe((emailLoading: boolean) => (this.emailLoading = emailLoading))
    this.store
      .pipe(select(getEmailListPage))
      .subscribe(
        (emailListPage: number) => (this.emailListPage = emailListPage)
      )
  }

  onIntersection({ visible }: { visible: boolean }, i: number): void {
    if (visible && i >= this.email.length - 1 && !this.emailLoading) {
      this.store.dispatch(setEmailListPage(this.emailListPage + 1))
      getEmailAsync(this.store, true)
    }
  }

  sortData(sort: Sort): void {
    this.store.dispatch(setEmailListPage(0))
    this.store.dispatch(
      setSort(sort.active === 'sentShort' ? 'sent' : sort.active)
    )
    this.store.dispatch(setOrder(sort.direction === 'desc' ? -1 : 1))
    getEmailAsync(this.store)
  }
}
