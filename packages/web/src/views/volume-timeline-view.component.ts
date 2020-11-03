import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { EmailSentByDay, selectEmailSentByDay } from 'src/store'

@Component({
  template: `
    <div class="mat-headline">Highcharts</div>
    <div fxLayout="row" fxLayoutAlign="center">
      <volume-timeline-highcharts
        id="highcharts-volume-timeline"
        title="Email Volume per Day"
        [data]="data"
      >
      </volume-timeline-highcharts>
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
