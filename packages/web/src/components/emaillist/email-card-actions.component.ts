import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { take } from 'rxjs/internal/operators/take'
import {
  Email,
  getEmail,
  getEmailIndex,
  getNextEmailId,
  getPreviousEmailId,
  selectDarkMode,
} from 'src/store'

@Component({
  selector: 'email-card-actions',
  template: `
    <mat-toolbar
      [ngStyle]="{ 'background-color': darkMode ? '#303030' : '#FAFAFA' }"
    >
      <button
        mat-icon-button
        aria-label="Back to list"
        matTooltip="Back to list"
        (click)="backToList()"
      >
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span class="spacer"></span>
      <div class="total">{{ emailIndex }} of {{ totalEmails }}</div>
      <button
        mat-icon-button
        aria-label="Previous email"
        matTooltip="Previous email"
        (click)="previousEmail()"
        [disabled]="emailIndex <= 1"
      >
        <mat-icon>arrow_left</mat-icon>
      </button>
      <button
        mat-icon-button
        aria-label="Next email"
        matTooltip="Next email"
        (click)="nextEmail()"
        [disabled]="emailIndex >= totalEmails"
      >
        <mat-icon>arrow_right</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [
    `
      div {
        padding: 5px;
      }
      .spacer {
        flex: 1 1 auto;
      }
      .total {
        font-size: 15px;
      }
    `,
  ],
})
export class EmailCardActionsComponent {
  @Input() id: string

  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  previousEmailId = ''
  nextEmailId = ''
  darkMode = false
  emailIndex = 0
  totalEmails = 0

  ngOnInit(): void {
    this.store.pipe(select(selectDarkMode)).subscribe((darkMode: boolean) => {
      this.darkMode = darkMode
    })
    this.store.pipe(select(getEmail)).subscribe((email: Email[]) => {
      if (email) {
        this.totalEmails = email.length
        this.setEmailIndex()
      }
    })
    this.setEmailIndex()
  }

  ngOnChanges(): void {
    this.setEmailIndex()
  }

  backToList(): void {
    this.router.navigate(['SearchView'])
  }

  async nextEmail(): Promise<void> {
    const nextEmailId = await this.store
      .pipe(select(getNextEmailId, { id: this.id }), take(1))
      .toPromise()
    this.router.navigate(['EmailDetailView', { id: nextEmailId }])
  }

  async previousEmail(): Promise<void> {
    const previousEmailId = await this.store
      .pipe(select(getPreviousEmailId, { id: this.id }), take(1))
      .toPromise()
    this.router.navigate(['EmailDetailView', { id: previousEmailId }])
  }

  async setEmailIndex(): Promise<void> {
    this.emailIndex = await this.store
      .pipe(select(getEmailIndex, { id: this.id }), take(1))
      .toPromise()
  }
}
