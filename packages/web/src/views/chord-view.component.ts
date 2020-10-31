import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Custodian, getEmailSentByCustodian, selectCustodians } from '../store'

@Component({
  templateUrl: './chord-view.component.html',
})
export class ChordViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  data = []
  nodes = []

  ngOnInit(): void {
    this.store
      .pipe(select(selectCustodians))
      .subscribe((custodians: Custodian[]) => {
        const emailSent = getEmailSentByCustodian(custodians)
        this.data = emailSent.data
        this.nodes = emailSent.nodes
      })
  }
}
