import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { selectWordCloud, WordCloudState, WordCloudTag } from 'src/store'

@Component({
  template: `
    <div class="mat-headline">Highcharts</div>
    <div fxLayout="row" fxLayoutAlign="center">
      <word-cloud-highcharts
        id="highcharts-word-cloud"
        title="Enron Project Names"
        [data]="wordCloud"
      >
      </word-cloud-highcharts>
    </div>
  `,
  styles: [``],
})
export class WordCloudViewComponent {
  wordCloud: WordCloudTag[]

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router, private store: Store<WordCloudState>) { }

  ngOnInit(): void {
    this.store
      .pipe(select(selectWordCloud))
      .subscribe((wordCloud: WordCloudTag[]) => {
        this.wordCloud = wordCloud
      })
  }
}
