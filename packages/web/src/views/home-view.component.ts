import { Component, Input } from '@angular/core'
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

  constructor() {
    // empty constructor
  }

  cards: Card[] = [
    {
      image: 'assets/pie.png',
      title: 'Pie',
      description: 'Email volume of Enron custodians.',
      link: 'PieView',
    },
    {
      image: 'assets/barchart.png',
      title: 'Bar',
      description: 'Email volume of Enron custodians.',
      link: 'BarView',
    },
    {
      image: 'assets/chord.png',
      title: 'Chord',
      description: 'Enron custodian communication.',
      link: 'ChordView',
    },
    {
      image: 'assets/wordcloud.png',
      title: 'Word Cloud',
      description: 'Mentions of fraudulent project names.',
      link: 'WordCloudView',
    },
    {
      image: 'assets/volumetimeline.png',
      title: 'Volume Timeline',
      description: 'Enron email per day with drill down.',
      link: 'VolumeTimelineView',
    },
    {
      image: 'assets/networkgraph.png',
      title: 'Network Graph',
      description: 'Enron custodian communication.',
      link: 'NetworkGraphView',
    },
    {
      image: 'assets/treemap.png',
      title: 'Tree Map',
      description: 'Email volume of Enron custodians.',
      link: 'TreeMapView',
    },
    {
      image: 'assets/eventTimeline.png',
      title: 'Event Timeline',
      description: 'Enron fraud and litigation events.',
      link: 'EventTimelineView',
    },
    {
      image: 'assets/polar.png',
      title: 'Polar',
      description: 'Email volume of Enron custodians.',
      link: 'PolarView',
    },
    {
      image: 'assets/search.png',
      title: 'Search',
      description: 'Full text search with hit highlighting.',
      link: 'SearchView',
    },
  ]
}
