import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import request, { gql } from 'graphql-request'
import { take } from 'rxjs/internal/operators/take'
import { environment } from 'src/environments/environment'
import { Email, getEmailById } from 'src/store'

// TODO setLoading across the app

@Component({
  template: ` <div>{{ email?.body }}</div> `,
  styles: [``],
})
export class EmailDetailViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private route: ActivatedRoute, private store: Store) { }

  id = ''
  email: Email = undefined

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
          .then((data) => {
            // prevents update if component destroyed before request/fetch completes
            // if (isSubscribed) {
            this.email = data.getEmail.emails[0]
            // setLoading(false)
            // }
          })
          .catch((e) => console.error(e))
      }
    })
  }
}
