import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import request, { gql } from 'graphql-request'
import { take } from 'rxjs/internal/operators/take'
import { environment } from 'src/environments/environment'
import {
  Email,
  getEmail,
  getEmailById,
  getEmailIndex,
  getNextEmailId,
  getPreviousEmailId,
  selectDarkMode,
} from 'src/store'

// TODO setLoading across the app

@Component({
  template: `
    <div class="card mat-elevation-z8">
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
      <div class="mat-h1">{{ email?.subject }}</div>
      <div>Sent: {{ email?.sent }}</div>
      <div>From: {{ from() }}</div>
      <div>To: {{ to() }}</div>
      <div>CC: {{ email?.cc }}</div>
      <div>BCC: {{ email?.bcc }}</div>
      <div [innerHTML]="highlight(crlf2br(email?.body))"></div>
    </div>
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
export class EmailDetailViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private route: ActivatedRoute, private store: Store) { }

  id = ''
  previousEmailId = ''
  nextEmailId = ''
  darkMode = false
  email: Email = undefined
  highlightedTerms = []
  emailIndex = 0
  totalEmails = 0

  ngOnInit(): void {
    // TODO - 'select' to get
    this.store.pipe(select(selectDarkMode)).subscribe((darkMode: boolean) => {
      this.darkMode = darkMode
    })
    this.store.pipe(select(getEmail)).subscribe((email: Email[]) => {
      if (email) {
        this.totalEmails = email.length
      }
    })
    this.route.params.subscribe(async (params) => {
      this.id = params['id']
      const email = await this.store
        .pipe(select(getEmailById, { id: this.id }), take(1))
        .toPromise()
      if (email) {
        this.email = email
        this.setEmailIndex()
      } else {
        const server = environment.x2Server
        // setLoading(true)
        const query = gql`
          query getEmail($id: ID) {
            getEmail(id: $id) {
              emails {
                id
                sent
                sentShort
                from
                fromCustodian
                to
                toCustodians
                cc
                bcc
                subject
                body
              }
              total
            }
          }
        `
        request(`${server}/graphql/`, query, { id: this.id })
          .then(async (data) => {
            // prevents update if component destroyed before request/fetch completes
            // if (isSubscribed) {
            this.email = data.getEmail.emails[0]
            this.setEmailIndex()
            // setLoading(false)
            // }
          })
          .catch((e) => console.error(e))
      }
    })
  }

  from(): string {
    let s = this.email?.from
    if (this.email?.fromCustodian)
      s += ` (custodian: ${this.email.fromCustodian})`
    return s
  }

  to(): string {
    let s = this.email?.to
    if (this.email?.toCustodians?.length)
      s += ` (custodians: ${this.email.toCustodians.join(', ')})`
    return s
  }

  crlf2br(str: string): string {
    return str?.replace(/\n/g, '<br />')
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

  async previousEmail(): void {
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

  highlight(str: string): string {
    let s = str
    if (!s) return ''
    this.highlightedTerms.forEach((term) => {
      s = s.replace(
        new RegExp(`(${term})`, 'gi'),
        `<span style="background-color:yellow; color:black">$1</span>`
      )
    })
    return s
  }
}
