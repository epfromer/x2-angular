/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { gql, request } from 'graphql-request'
import { interval } from 'rxjs'
import { importLoc, ImportLogEntry } from 'src/store'
import { environment } from '../environments/environment'

@Component({
  selector: 'import-log',
  template: `
    <div>
      <button mat-raised-button color="accent">Import Email</button>
    </div>
    <div class="table-container">
      <table
        id="mat-table"
        mat-table
        [dataSource]="importLog"
        class="mat-elevation-z8"
      >
        <ng-container matColumnDef="timestamp">
          <th mat-header-cell *matHeaderCellDef>Timestamp</th>
          <td mat-cell *matCellDef="let logEntry">
            {{ logEntry.timestamp }}
          </td>
        </ng-container>

        <ng-container matColumnDef="entry">
          <th mat-header-cell *matHeaderCellDef>Entry</th>
          <td mat-cell *matCellDef="let logEntry">{{ logEntry.entry }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: displayedColumns; let even = even"
          [ngClass]="{ red: even }"
        ></tr>
      </table>
    </div>
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
      .table-container {
        position: relative;
        max-height: 400px;
        overflow: auto;
      }
      th.mat-header-cell {
        font-size: 15px;
      }
      .mat-cell {
        padding-right: 10px;
      }
    `,
  ],
})
export class ImportLogComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store) { }

  displayedColumns: string[] = ['timestamp', 'entry']
  importLog: Array<ImportLogEntry> = []
  resultsLength = 0
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
          this.importLog = data.getImportStatus
          this.resultsLength = this.importLog.length
          document.querySelector('#mat-table').scrollBy(0, 10000)
        })
        .catch((err) => console.error('ImportLogComponent: ', err))
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
}
