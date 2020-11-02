import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { EmailSentByDay, selectEmailSentByDay } from 'src/store'

@Component({
  template: `
    <div class="mat-headline">Highcharts</div>
    <div fxLayout="row" fxLayoutAlign="center">
      <chord-highcharts
        id="highcharts-volume-timeline"
        title="Senders / Receivers"
        [data]="data"
      >
      </chord-highcharts>
    </div>
  `,
  styles: [``],
})
export class VolumeTimelineViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store) { }

  data = []

  ngOnInit(): void {
    this.store
      .pipe(select(selectEmailSentByDay))
      .subscribe((emailSentByDay: Array<EmailSentByDay>) => {
        this.data = emailSentByDay
      })
  }
}
