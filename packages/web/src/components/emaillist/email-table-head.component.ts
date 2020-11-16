import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'

@Component({
  selector: 'email-table-head',
  template: `
    <form class="form">
      <div class="full-width">
        <mat-form-field class="full-width">
          <mat-label>Filter (all text fields)</mat-label>
          <input matInput />
        </mat-form-field>
      </div>
      <div fxLayout="row" fxLayoutAlign="space-around">
        <mat-form-field>
          <mat-label>Filter Sent</mat-label>
          <input matInput />
        </mat-form-field>
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
    </form>
  `,
  styles: [
    `
      .form {
        margin-left: 10px;
        margin-right: 10px;
      }
      .full-width {
        width: 100%;
      }
    `,
  ],
})
export class EmailTableHead {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }
}
