import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-drawer',
  template: `
    <mat-nav-list>
      <mat-list-item
        *ngFor="let item of mainListItems"
        (click)="routeClicked.emit(item.route)"
      >
        <mat-icon matListIcon>{{ item.icon }}</mat-icon>
        <p matLine>
          <span>{{ item.name }}</span>
        </p>
      </mat-list-item>
      <mat-divider></mat-divider>
      <mat-list-item
        *ngFor="let item of secondaryListItems"
        (click)="routeClicked.emit(item.route)"
      >
        <mat-icon matListIcon>{{ item.icon }}</mat-icon>
        <p matLine>
          <span>{{ item.name }}</span>
        </p>
      </mat-list-item>
    </mat-nav-list>
  `,
  styles: [``],
})
export class AppDrawerComponent {
  @Input() opened: boolean
  @Output() routeClicked = new EventEmitter()

  mainListItems = [
    { icon: 'home', name: 'x2 Home', route: '/' },
    { icon: 'search', name: 'Search', route: '/SearchView' },
  ]

  secondaryListItems = [
    { icon: 'autorenew', name: 'Chord', route: '/ChordView' },
    { icon: 'cloud', name: 'Word Cloud', route: '/WordCloudView' },
    { icon: 'device_hub', name: 'Network Graph', route: '/NetworkGraphView' },
    { icon: 'timeline', name: 'Volume Timeline', route: '/VolumeTimelineView' },
    { icon: 'view_quilt', name: 'Tree Map', route: '/TreeMapView' },
    { icon: 'timeline', name: 'Event Timeline', route: '/EventTimelineView' },
    { icon: 'bar_chart', name: 'Bar', route: '/BarView' },
    { icon: 'pie_chart', name: 'Pie', route: '/PieView' },
  ]
}
