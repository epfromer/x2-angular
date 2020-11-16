import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'

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
        <input matInput />
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
        width: 100%;
      }
    `,
  ],
})
export class EmailTableHead {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  searchHistory(): void {
    console.log('search history')
  }

  dateRange(): void {
    console.log('dateRange')
  }
}
