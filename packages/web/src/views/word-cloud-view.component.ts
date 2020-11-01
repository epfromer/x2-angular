import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { selectWordCloud, WordCloudState, WordCloudTag } from 'src/store'

@Component({
  templateUrl: './word-cloud-view.component.html',
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
