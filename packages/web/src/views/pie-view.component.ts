import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
// import { Custodian } from '../store/types'

@Component({
  templateUrl: './pie-view.component.html',
})
export class PieViewComponent {
  count$: Observable<number>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(
    private _router: Router,
    private store: Store<{ count: number }>
  ) {
    this.count$ = store.select('count')
  }

  // ngOnInit(): void {
  //   console.log(this.store.select('custodians'))
  // }
}
