import { Component, ViewChild } from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { gql, request } from 'graphql-request'
import {
  clearSearch,
  getEmailAsync,
  setAllText,
  setBody,
  setFrom,
  setOrder,
  setSent,
  setSort,
  setSubject,
  setTo,
} from 'src/store'
import { environment } from '../environments/environment'

@Component({
  template: `
    <div>
      <button mat-raised-button color="accent" (click)="clearHistory()">
        Clear History
      </button>
    </div>
    <mat-table [dataSource]="log" matSort class="mat-elevation-z8 container">
      <ng-container matColumnDef="timestamp">
        <mat-header-cell *matHeaderCellDef mat-sort-header>
          Date
        </mat-header-cell>
        <mat-cell *matCellDef="let r">{{ r.timestamp }} </mat-cell>
      </ng-container>

      <ng-container matColumnDef="entry">
        <mat-header-cell *matHeaderCellDef mat-sort-header>
          Search
        </mat-header-cell>
        <mat-cell *matCellDef="let r">{{ r.entry }} </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row
        *matRowDef="let row; columns: displayedColumns"
        (click)="onClick(row.entry)"
      ></mat-row>
    </mat-table>
  `,
  styles: [
    `
      mat-header-cell.mat-header-cell {
        font-size: 15px;
        padding-right: 10px;
      }
      button {
        margin-bottom: 10px;
      }
      table {
        width: 100%;
      }
      .last-row {
        margin: 100px;
      }
      .container {
        overflow: auto;
        max-height: 400px;
      }
      .mat-cell {
        padding-right: 10px;
      }
    `,
  ],
})
export class SearchHistoryViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  displayedColumns: string[] = ['timestamp', 'entry']
  log = new MatTableDataSource([
    { id: 'foo', timestamp: '', entry: 'No log entries' },
  ])
  sub = undefined

  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    const server = environment.x2Server
    const query = gql`
      {
        getSearchHistory {
          id
          timestamp
          entry
        }
      }
    `
    request(`${server}/graphql/`, query)
      .then((data) => {
        const log = data.getSearchHistory
        if (log.length) {
          this.log = new MatTableDataSource(log)
          this.log.sort = this.sort
        }
      })
      .catch((e) => console.error(e))
  }

  onClick(search: string): void {
    const o = JSON.parse(search)
    this.store.dispatch(clearSearch())
    if (o.hasOwnProperty('sort')) this.store.dispatch(setSort(o.sort))
    if (o.hasOwnProperty('order')) this.store.dispatch(setOrder(o.order))
    if (o.hasOwnProperty('sent')) this.store.dispatch(setSent(o.sent))
    if (o.hasOwnProperty('from')) this.store.dispatch(setFrom(o.from))
    if (o.hasOwnProperty('to')) this.store.dispatch(setTo(o.to))
    if (o.hasOwnProperty('subject')) this.store.dispatch(setSubject(o.subject))
    if (o.hasOwnProperty('allText')) this.store.dispatch(setAllText(o.allText))
    if (o.hasOwnProperty('body')) this.store.dispatch(setBody(o.body))
    getEmailAsync(this.store)
    this.router.navigateByUrl('/SearchView')
  }

  clearHistory(): void {
    // this.store.dispatch(setThemeName(name))
  }
}
