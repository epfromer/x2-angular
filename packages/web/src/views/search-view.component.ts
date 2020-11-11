import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Email, selectEmail } from 'src/store'

@Component({
  template: ` <div>{{ foo() }}</div> `,
  styles: [``],
})
export class SearchViewComponent {
  email: Email[]

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(selectEmail)).subscribe((email: Email[]) => {
      this.email = email
    })
  }

  foo(): string {
    return JSON.stringify(this.email)
  }
}
