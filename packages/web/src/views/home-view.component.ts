import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { HomeCardComponent } from '../components/home-card.component'

export interface Card {
  image: string
  title: string
  description: string
  link: string
}

@Component({
  template: `
    <div fxLayout="row wrap" fxLayout.xs="column" fxFlexFill>
      <div fxFlex.sm="50" fxFlex="25" *ngFor="let card of cards">
        <home-card
          [image]="card.image"
          [title]="card.title"
          [description]="card.description"
          [link]="card.link"
        >
        </home-card>
      </div>
    </div>
  `,
  styles: [``],
})
export class HomeViewComponent {
  @Input() homeCard: HomeCardComponent

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }

  cards: Card[] = [
    {
      image: 'assets/pie.png',
      title: 'Pie',
      description: 'Pie chart of email volume of Enron custodians.',
      link: 'PieView',
    },
    {
      image: 'assets/barchart.png',
      title: 'Bar',
      description: 'Bar chart of email volume of Enron custodians.',
      link: 'BarView',
    },
    {
      image: 'assets/chord.png',
      title: 'Chord',
      description: 'Chord diagram of Enron custodian communication.',
      link: 'ChordView',
    },
    {
      image: 'assets/wordcloud.png',
      title: 'Word Cloud',
      description: 'Word cloud of mentions of fraudulent project names.',
      link: 'WordCloudView',
    },
    {
      image: 'assets/volumetimeline.png',
      title: 'Volume Timeline',
      description: 'XY timeline of Enron email per day with drill down.',
      link: 'VolumeTimelineView',
    },
    {
      image: 'assets/networkgraph.png',
      title: 'Network Graph',
      description: 'Network graph of Enron custodian communication.',
      link: 'NetworkGraphView',
    },
    {
      image: 'assets/treemap.png',
      title: 'Tree Map',
      description: 'Tree map of email volume of Enron custodians.',
      link: 'TreeMapView',
    },
    {
      image: 'assets/eventTimeline.png',
      title: 'Event Timeline',
      description: 'Event timeline of Enron fraud and litigation.',
      link: 'EventTimelineView',
    },
    {
      image: 'assets/polar.png',
      title: 'Polar',
      description: 'Polar chart of email volume of Enron custodians.',
      link: 'PolarView',
    },
    {
      image: 'assets/search.png',
      title: 'Search',
      description:
        'Full text search with field filtering and hit highlighting.',
      link: 'SearchView',
    },
  ]
}
