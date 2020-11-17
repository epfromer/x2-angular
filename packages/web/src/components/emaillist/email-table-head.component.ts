import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import debounce from 'lodash/debounce'
import { getAllText, getEmailAsync, setAllText, setEmailListPage } from 'src/store'

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
      <mat-form-field class="full-width">
        <mat-label>Filter (all text fields)</mat-label>
        <input
          matInput
          type="text"
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
      <div>
        <button
          mat-icon-button
          aria-label="Select date range"
          matTooltip="Select date range"
          (click)="dateRange()"
        >
          <mat-icon>date_range</mat-icon>
        </button>
        <mat-form-field>
          <mat-label>Filter Sent</mat-label>
          <input matInput />
        </mat-form-field>
      </div>
      <mat-form-field>
        <mat-label>Filter From</mat-label>
        <input matInput />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Filter To</mat-label>
        <input matInput />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Filter Subject</mat-label>
        <input matInput />
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
  constructor(private store: Store) { }

  allText = ''

  ngOnInit(): void {
    this.store.pipe(select(getAllText)).subscribe((allText: string) => {
      this.allText = allText
    })
  }

  searchHistory(): void {
    console.log('search history')
  }

  dateRange(): void {
    console.log('dateRange')
  }

  clearSearch(field: string): void {
    this.store.dispatch(setEmailListPage(0))
    switch (field) {
      case 'allText':
        this.store.dispatch(setAllText(''))
        break
    }
    getEmailAsync(this.store)
  }

  debouncedSearch = debounce((field: string, term: string) => {
    this.store.dispatch(setEmailListPage(0))
    switch (field) {
      case 'allText':
        this.store.dispatch(setAllText(term))
        break
    }
    getEmailAsync(this.store)
  }, DEBOUNCE_MS)
}
