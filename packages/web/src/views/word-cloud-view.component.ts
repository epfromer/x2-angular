import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import {
  clearSearch,
  getEmailAsync,
  getWordCloud,
  getWordCloudLoading,
  setAllText,
  WordCloudTag,
} from 'src/store'

@Component({
  template: `
    <div *ngIf="wordCloudLoading">
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </div>
    <div *ngIf="!wordCloudLoading">
      <div class="mat-headline">Highcharts</div>
      <div fxLayout="row" fxLayoutAlign="center">
        <word-cloud-highcharts
          id="highcharts-word-cloud"
          title="Enron Project Names"
          [data]="wordCloud"
          (handleClick)="handleClick($event)"
        >
        </word-cloud-highcharts>
      </div>
    </div>
  `,
  styles: [``],
})
export class WordCloudViewComponent {
  constructor(private router: Router, private store: Store) {
    // empty constructor
  }

  wordCloudLoading = false
  wordCloud: WordCloudTag[]

  handleClick(word: string): void {
    this.store.dispatch(clearSearch())
    this.store.dispatch(setAllText(word))
    getEmailAsync(this.store)
    this.router.navigateByUrl('/SearchView')
  }

  ngOnInit(): void {
    this.store
      .pipe(select(getWordCloud))
      .subscribe((wordCloud: WordCloudTag[]) => {
        this.wordCloud = wordCloud
      })
    this.store
      .pipe(select(getWordCloudLoading))
      .subscribe(
        (wordCloudLoading: boolean) =>
          (this.wordCloudLoading = wordCloudLoading)
      )
  }
}
