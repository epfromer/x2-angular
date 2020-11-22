import { Component } from '@angular/core'
import { gql, request } from 'graphql-request'
import { interval } from 'rxjs'
import { importLoc } from 'src/constants'
import { LogEntry } from 'src/store'
import { environment } from '../environments/environment'

@Component({
  selector: 'import-log',
  template: `
    <div>
      <button mat-raised-button color="accent" (click)="startImport()">
        Import Email
      </button>
    </div>
    <mat-table [dataSource]="importLog" class="mat-elevation-z8 container">
      <ng-container matColumnDef="entry">
        <mat-cell *matCellDef="let r">{{ r.entry }} </mat-cell>
      </ng-container>
      <mat-row
        *matRowDef="let row; columns: displayedColumns; let i = index"
        inViewport
        [inViewportOptions]="{ threshold: [0] }"
        (inViewportAction)="onIntersection($event, i)"
      ></mat-row>
    </mat-table>
  `,
  styles: [
    `
      button {
        margin-bottom: 10px;
      }
      table {
        width: 100%;
      }
      .last-row {
        margin: 100px;
      }
      .container {
        overflow: auto;
        max-height: 400px;
      }
      .mat-cell {
        padding-right: 10px;
      }
    `,
  ],
})
export class ImportLogComponent {
  constructor() {
    // empty constructor
  }

  displayedColumns: string[] = ['entry']
  importLog: Array<LogEntry> = [{ id: 'foo', entry: 'No log entries' }]
  resultsLength = 1
  sub = undefined

  ngOnInit(): void {
    this.sub = interval(2000).subscribe(() => {
      const server = environment.x2Server
      const query = gql`
        {
          getImportStatus {
            id
            timestamp
            entry
          }
        }
      `
      request(`${server}/graphql/`, query)
        .then((data) => {
          const log = data.getImportStatus.map((e) => ({
            id: e.id,
            entry: e.timestamp + ' ' + e.entry,
          }))
          if (log.length) {
            this.importLog = log
            this.resultsLength = this.importLog.length
          }
        })
        .catch((e) => console.error(e))
    })
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe()
  }

  startImport(): void {
    const server = environment.x2Server
    const mutation = gql`
      mutation importPST($loc: String) {
        importPST(loc: $loc)
      }
    `
    request(`${server}/graphql/`, mutation, { loc: importLoc })
  }

  onIntersection(
    { target, visible }: { target: Element; visible: boolean },
    i: number
  ): void {
    if (!visible && i === this.importLog.length - 1) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
