import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import debounce from 'lodash/debounce'
import {
  getEmailAsync,
  getQuery,
  QueryState,
  setAllText,
  setEmailListPage,
  setFrom,
  setSent,
  setSubject,
  setTo,
} from 'src/store'
import { getDateFromStr, getDateStr } from 'src/utils/dates'

const DEBOUNCE_MS = 1000

@Component({
  selector: 'email-table-head',
  template: `
    <div fxLayout="row">
      <div fxLayout="column" fxLayoutAlign="center">
        <button
          mat-icon-button
          aria-label="Search history"
          matTooltip="Search history"
          (click)="searchHistory()"
        >
          <mat-icon>history</mat-icon>
        </button>
      </div>
      <mat-form-field class="full-width" appearance="fill">
        <mat-label>Filter (all text fields)</mat-label>
        <input
          matInput
          [(ngModel)]="allText"
          (input)="debouncedSearch('allText', $event.target.value)"
        />
        <button
          mat-button
          *ngIf="allText"
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="clearSearch('allText')"
        >
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>
    </div>
    <div fxLayout="row wrap" fxLayoutAlign="space-around">
      <mat-form-field class="filter-sent" appearance="fill">
        <mat-label>Filter Sent</mat-label>
        <input
          matInput
          [matDatepicker]="picker"
          [min]="minDate"
          [max]="maxDate"
          [(ngModel)]="sent"
          (dateInput)="doSearch('sent', dateString($event.value))"
        />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Filter From</mat-label>
        <input
          matInput
          [(ngModel)]="from"
          (input)="debouncedSearch('from', $event.target.value)"
        />
        <button
          mat-button
          *ngIf="from"
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="clearSearch('from')"
        >
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Filter To</mat-label>
        <input
          matInput
          [(ngModel)]="to"
          (input)="debouncedSearch('to', $event.target.value)"
        />
        <button
          mat-button
          *ngIf="to"
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="clearSearch('to')"
        >
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Filter Subject</mat-label>
        <input
          matInput
          [(ngModel)]="subject"
          (input)="debouncedSearch('subject', $event.target.value)"
        />
        <button
          mat-button
          *ngIf="subject"
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="clearSearch('subject')"
        >
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>
    </div>
  `,
  styles: [
    `
      .history-button {
        padding-top: 10px;
      }
      .form {
        padding-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
      }
      .full-width {
        margin-left: 10px;
        padding-right: 10px;
        width: 100%;
      }
      .filter-sent {
        width: 160px;
      }
    `,
  ],
})
export class EmailTableHead {
  constructor(
    private router: Router,
    private store: Store,
    public dialog: MatDialog
  ) {
    this.minDate = new Date(1999, 6, 2)
    this.maxDate = new Date(2002, 0, 30)
  }

  allText = ''
  to = ''
  from = ''
  subject = ''
  sent = new Date(2002, 0, 30)
  minDate: Date // 1999-07-02
  maxDate: Date // 2002-01-30

  ngOnInit(): void {
    this.store.pipe(select(getQuery)).subscribe((query: QueryState) => {
      this.allText = query.allText
      this.to = query.to
      this.from = query.from
      this.subject = query.subject
      this.sent = getDateFromStr(query.sent)
    })
  }

  searchHistory(): void {
    this.router.navigate(['SearchHistoryView'])
  }

  doSearch(field: string, term: string): void {
    this.store.dispatch(setEmailListPage(0))
    switch (field) {
      case 'sent':
        this.store.dispatch(setSent(term))
        break
      case 'allText':
        this.store.dispatch(setAllText(term))
        break
      case 'from':
        this.store.dispatch(setFrom(term))
        break
      case 'to':
        this.store.dispatch(setTo(term))
        break
      case 'subject':
        this.store.dispatch(setSubject(term))
        break
    }
    getEmailAsync(this.store)
  }

  dateString = (date: Date): string => getDateStr(date)

  clearSearch = (field: string): void => this.doSearch(field, '')

  debouncedSearch = debounce(
    (field: string, term: string) => this.doSearch(field, term),
    DEBOUNCE_MS
  )
}
