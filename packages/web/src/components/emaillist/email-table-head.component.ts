import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
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
import { getDateStr } from 'src/utils/dates'

const DEBOUNCE_MS = 1000

@Component({
  selector: 'email-table-head',
  template: `
    <div fxLayout="row">
      <button
        mat-icon-button
        aria-label="Search history"
        matTooltip="Search history"
        (click)="searchHistory()"
      >
        <mat-icon>history</mat-icon>
      </button>
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
      <mat-form-field appearance="fill">
        <mat-label>Filter Sent</mat-label>
        <input
          matInput
          [matDatepicker]="picker"
          [min]="minDate"
          [max]="maxDate"
          [(ngModel)]="sent"
          (dateInput)="doSearch('sent', $event.value)"
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
    `,
  ],
})
export class EmailTableHead {
  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store, public dialog: MatDialog) {
    this.minDate = new Date(1999, 6, 2)
    this.maxDate = new Date(2002, 0, 30)
  }

  allText = ''
  to = ''
  from = ''
  subject = ''
  sent = ''
  minDate: Date // 1999-07-02
  maxDate: Date // 2002-01-30

  ngOnInit(): void {
    this.store.pipe(select(getQuery)).subscribe((query: QueryState) => {
      this.allText = query.allText
      this.to = query.to
      this.from = query.from
      this.subject = query.subject
      this.sent = query.sent
    })
  }

  searchHistory(): void {
    console.log('search history')
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

  clearSearch = (field: string): void => this.doSearch(field, '')

  debouncedSearch = debounce(
    (field: string, term: string) => this.doSearch(field, term),
    DEBOUNCE_MS
  )
}
