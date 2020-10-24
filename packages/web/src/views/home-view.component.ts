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
  templateUrl: './home-view.component.html',
})
export class HomeViewComponent {
  @Input() homeCard: HomeCardComponent

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }

  cards: Card[] = [
    {
      image: 'assets/pie.png',
      title: 'Pie',
      description: 'Pie chart of email volume of Enron key custodians.',
      link: 'PieView',
    },
    {
      image: 'assets/barchart.png',
      title: 'Bar',
      description: 'Bar chart of email volume of Enron key custodians.',
      link: 'PieView',
    },
    {
      image: 'assets/pie.png',
      title: 'Pie',
      description: 'Pie chart of email volume of Enron key custodians.',
      link: 'PieView',
    },
    {
      image: 'assets/pie.png',
      title: 'Pie',
      description: 'Pie chart of email volume of Enron key custodians.',
      link: 'PieView',
    },
    {
      image: 'assets/pie.png',
      title: 'Pie',
      description: 'Pie chart of email volume of Enron key custodians.',
      link: 'PieView',
    },
    {
      image: 'assets/pie.png',
      title: 'Pie',
      description: 'Pie chart of email volume of Enron key custodians.',
      link: 'PieView',
    },
    {
      image: 'assets/pie.png',
      title: 'Pie',
      description: 'Pie chart of email volume of Enron key custodians.',
      link: 'PieView',
    },
  ]
}

/*
      {makeCard(
        chord,
        'Chord',
        'Chord diagram of Enron key custodian communication.',
        '/ChordView'
      )}
      {makeCard(
        wordcloud,
        'Word Cloud',
        'Word cloud of fraudulent project names.',
        '/WordCloudView'
      )}
      {makeCard(
        volumetimeline,
        'Volume Timeline',
        'XY timeline of Enron email per day with drill down.',
        '/VolumeTimelineView'
      )}
      {makeCard(
        networkgraph,
        'Network Graph',
        'Network graph of Enron key custodian communication.',
        '/NetworkGraphView'
      )}
      {makeCard(
        treemap,
        'Tree Map',
        'Tree map of email volume of Enron key custodians.',
        '/TreeMapView'
      )}
      {makeCard(
        eventTimeline,
        'Event Timeline',
        'Event timeline of Enron fraud and litigation.',
        '/EventTimelineView'
      )}
      {makeCard(
        polar,
        'Polar',
        'Polar chart of email volume of Enron key custodians.',
        '/PolarView'
      )}
      {makeCard(
        search,
        'Search',
        'Full text search with field filtering and hit highlighting.',
        '/SearchView'
      )}

*/
