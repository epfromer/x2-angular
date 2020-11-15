import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import request, { gql } from 'graphql-request'
import { take } from 'rxjs/internal/operators/take'
import { environment } from 'src/environments/environment'
import { Email, getEmailById, QueryState, getQuery } from 'src/store'

// TODO setLoading across the app

@Component({
  template: `
    <div class="card mat-elevation-z8">
      <email-card-actions [id]="id"></email-card-actions>
      <div class="mat-h1" [innerHTML]="subject()"></div>
      <div>Sent: {{ email?.sent }}</div>
      <div>From: {{ from() }}</div>
      <div>To: {{ to() }}</div>
      <div>CC: {{ email?.cc }}</div>
      <div>BCC: {{ email?.bcc }}</div>
      <div [innerHTML]="body()"></div>
      <email-card-actions [id]="id"></email-card-actions>
    </div>
  `,
  styles: [
    `
      div {
        padding: 5px;
      }
    `,
  ],
})
export class EmailDetailViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private route: ActivatedRoute, private store: Store) { }

  id = ''
  email: Email = undefined
  highlightedTerms = []

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.id = params['id']
      const email = await this.store
        .pipe(select(getEmailById, { id: this.id }), take(1))
        .toPromise()
      if (email) {
        this.email = email
      } else {
        const server = environment.x2Server
        // TODO setLoading(true)
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
          .then((data) => (this.email = data.getEmail.emails[0]))
          .catch((e) => console.error(e))
      }
      this.store.pipe(select(getQuery)).subscribe((query: QueryState) => {
        this.highlightedTerms.length = 0
        if (query.allText) this.highlightedTerms.push(query.allText)
        if (query.to) this.highlightedTerms.push(query.to)
        if (query.from) this.highlightedTerms.push(query.from)
        if (query.subject) this.highlightedTerms.push(query.subject)
        if (query.body) this.highlightedTerms.push(query.body)
      })
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

  subject(): string {
    return 'Subject: ' + this.highlight(this.email?.subject)
  }

  body(): string {
    return this.highlight(this.crlf2br(this.email?.body))
  }

  crlf2br(str: string): string {
    return str?.replace(/\n/g, '<br />')
  }

  backToList(): void {
    this.router.navigate(['SearchView'])
  }

  highlight(str: string): string {
    let s = str
    if (!s) return ''
    this.highlightedTerms.forEach((term) => {
      s = s.replace(
        new RegExp(`(${term})`, 'gi'),
        `<span class="highlight">$1</span>`
      )
    })
    return s
  }
}
