import { Component, ElementRef, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import {
  defaultLimit,
  Email,
  getEmail,
  getEmailAsync,
  getEmailListPage,
  getEmailLoading,
  getEmailTotal,
  setEmailListPage,
  setOrder,
  setSort,
} from 'src/store'
import { Sort } from '@angular/material/sort'
import { animate, state, style, transition, trigger } from '@angular/animations'

@Component({
  template: `
    <div class="mat-elevation-z8" #tableWrapper>
      <email-table-head></email-table-head>
      <table
        mat-table
        [dataSource]="email"
        multiTemplateDataRows
        matSort
        (matSortChange)="sortData($event)"
      >
        <!-- column to hold expand icon -->
        <ng-container matColumnDef="expand">
          <th mat-header-cell *matHeaderCellDef></th>
          <td
            mat-cell
            *matCellDef="let email"
            (click)="expandedEmail = expandedEmail === email ? null : email"
          >
            <div>foo</div>
          </td>
        </ng-container>

        <ng-container matColumnDef="sentShort">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Sent</th>
          <td mat-cell *matCellDef="let email" (click)="onClick(email)">
            {{ email.sentShort }}
          </td>
        </ng-container>

        <ng-container matColumnDef="from">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>From</th>
          <td mat-cell *matCellDef="let email" (click)="onClick(email)">
            {{ email.from }}
          </td>
        </ng-container>

        <ng-container matColumnDef="to">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>To</th>
          <td mat-cell *matCellDef="let email" (click)="onClick(email)">
            {{ email.to }}
          </td>
        </ng-container>

        <ng-container matColumnDef="subject">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Subject</th>
          <td mat-cell *matCellDef="let email" (click)="onClick(email)">
            {{ email.subject }}
          </td>
        </ng-container>

        <!-- expanded detail row -->
        <ng-container matColumnDef="expandedDetail">
          <td
            mat-cell
            *matCellDef="let email"
            [attr.colspan]="displayedColumns.length"
          >
            <div
              class="example-element-detail"
              [@detailExpand]="
                email == expandedEmail ? 'expanded' : 'collapsed'
              "
            >
              <div class="example-element-diagram">
                {{ email.subject }}
              </div>
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr
          mat-row
          *matRowDef="let email; columns: displayedColumns; let i = index"
          class="example-element-row"
          [class.example-expanded-row]="expandedEmail === email"
          inViewport
          [inViewportOptions]="{ threshold: [0] }"
          (inViewportAction)="onIntersection($event, i)"
        ></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: ['expandedDetail']"
          class="example-detail-row"
        ></tr>
      </table>
    </div>
  `,
  styles: [
    `
      .mat-header-cell {
        font-size: 15px;
        padding-right: 10px;
      }
      .mat-cell {
        padding-right: 10px;
      }
      .mat-column-sentShort {
        word-wrap: break-word !important;
        white-space: unset !important;
        flex: 0 0 80px !important;
        width: 80px !important;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        hyphens: auto;
      }
      tr.example-detail-row {
        height: 0;
      }
      .example-element-row td {
        border-bottom-width: 0;
      }
      .example-element-detail {
        overflow: hidden;
        display: flex;
      }
      .example-element-diagram {
        min-width: 80px;
        border: 2px solid black;
        padding: 8px;
        font-weight: lighter;
        margin: 8px 0;
        height: 104px;
      }
      .example-element-symbol {
        font-weight: bold;
        font-size: 40px;
        line-height: normal;
      }
      .example-element-description {
        padding: 16px;
      }
      .example-element-description-attribution {
        opacity: 0.5;
      }
    `,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SearchViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  emailTotal = 0
  emailLoading = false
  emailListPage = 0
  searchColumns: string[] = ['allTextFilter']
  displayedColumns: string[] = ['expand', 'sentShort', 'from', 'to', 'subject']
  email: Email[]
  expandedEmail: Email | null

  @ViewChild('tableWrapper', { read: ElementRef }) rootElement: ElementRef

  onClick(email: { id: string }): void {
    this.router.navigate(['EmailDetailView', { id: email.id }])
  }

  ngOnInit(): void {
    this.store
      .pipe(select(getEmail))
      .subscribe((email: Email[]) => (this.email = email))
    this.store
      .pipe(select(getEmailTotal))
      .subscribe((emailTotal: number) => (this.emailTotal = emailTotal))
    this.store
      .pipe(select(getEmailLoading))
      .subscribe((emailLoading: boolean) => (this.emailLoading = emailLoading))
    this.store
      .pipe(select(getEmailListPage))
      .subscribe(
        (emailListPage: number) => (this.emailListPage = emailListPage)
      )
  }

  hasMore = (): boolean =>
    (this.emailListPage + 1) * defaultLimit < this.emailTotal

  onIntersection({ visible }: { visible: boolean }, i: number): void {
    if (
      visible &&
      i >= this.email.length - 1 &&
      !this.emailLoading &&
      this.hasMore()
    ) {
      this.store.dispatch(setEmailListPage(this.emailListPage + 1))
      getEmailAsync(this.store, true)
    }
  }

  sortData(sort: Sort): void {
    this.store.dispatch(setEmailListPage(0))
    this.store.dispatch(
      setSort(sort.active === 'sentShort' ? 'sent' : sort.active)
    )
    this.store.dispatch(setOrder(sort.direction === 'desc' ? -1 : 1))
    getEmailAsync(this.store)
  }
}
