import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { EChartOption } from 'echarts'
import * as Highcharts from 'highcharts'
import HighchartTimeline from 'highcharts/modules/timeline'
import { Custodian, selectCustodians, selectDarkMode } from '../store'

HighchartTimeline(Highcharts)

@Component({
  template: ` <div id="container"></div> `,
  styles: [``],
})
export class EventTimelineViewComponent {
  @Input() title: string

  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private store: Store) { }

  darkMode = false
  options: EChartOption = {}
  custodians: Custodian[] = []
  chart = undefined

  getCustodianColor(name: string): string {
    const found = this.custodians?.find((c: Custodian) => c.name === name)
    return found ? found.color : ''
  }

  createChart(): void {
    if (!this.custodians.length) return
    if (this.chart) this.chart.destroy()

    const options: unknown = {
      chart: {
        type: 'timeline',
        inverted: true,
        height: '90%',
        zoomType: 'x',
        backgroundColor: this.darkMode ? '#303030' : '#FAFAFA',
      },
      title: {
        text: '',
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          // events: {
          //   click: (e: any) =>
          //     handleClick(e.point.options.queryKey, e.point.options.queryValue),
          // },
        },
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },
      tooltip: {
        style: {
          width: 300,
        },
      },
      series: [
        {
          dataLabels: {
            allowOverlap: false,
            format: '{point.x:%d %b %Y}<br/>{point.label}',
          },
          marker: {
            symbol: 'circle',
          },
          data: [
            {
              x: new Date('2000-09-19').getTime(),
              label: 'Chewco',
              description: 'Chewco partnership discussions',
              queryKey: 'allText',
              queryValue: 'chewco',
              color: 'brown',
            },
            {
              x: new Date('2001-04-01').getTime(),
              label: 'Raptor',
              description: 'Raptor swaps discussions',
              queryKey: 'allText',
              queryValue: 'raptor',
              color: 'brown',
            },
            {
              x: new Date('2001-08-22').getTime(),
              label: 'Watkins meeting',
              description: 'Watkins meets with Lay',
              queryKey: 'from',
              queryValue: '(Watkins, Sherron)',
              color: this.getCustodianColor('Watkins, Sherron'),
            },
            {
              x: new Date('2001-10-12').getTime(),
              label: 'Anderson shreds documents',
              description: 'Andersen destroys 1 ton of Enron documents',
              queryKey: 'allText',
              queryValue: 'anderson',
              color: 'black',
            },
            {
              x: new Date('2001-12-02').getTime(),
              label: 'Enron bankruptcy',
              description:
                'Enron files for bankruptcy, thousands of workers laid off',
              queryKey: 'allText',
              queryValue: 'bankruptcy',
              color: 'black',
            },
            {
              x: new Date('2002-01-09').getTime(),
              label: 'Criminal investigation',
              description:
                'Justice Department launches a criminal investigation.',
              queryKey: 'allText',
              queryValue: 'investigation',
              color: 'black',
            },
            {
              x: new Date('2002-01-25').getTime(),
              label: 'Baxter suicide',
              description: 'Baxter found dead of self-inflicted gunshot wound',
              queryKey: 'to',
              queryValue: 'baxter',
              color: 'black',
            },
            {
              x: new Date('2002-03-14').getTime(),
              label: 'Anderson indicted',
              description:
                'Andersen indicted on charges of destroying documents',
              queryKey: 'allText',
              queryValue: 'anderson',
              color: 'black',
            },
            {
              x: new Date('2002-06-15').getTime(),
              label: 'Anderson convicted',
              description:
                'Andersen convicted on charges of destroying documents',
              queryKey: 'allText',
              queryValue: 'anderson',
              color: 'black',
            },
            {
              x: new Date('2002-08-31').getTime(),
              label: 'Anderson defunct',
              description: 'Andersen ceases auditing practice',
              queryKey: 'allText',
              queryValue: 'anderson',
              color: 'black',
            },
            {
              x: new Date('2002-10-31').getTime(),
              label: 'Fastow indicted',
              description:
                'Fastow indicted on charges of conspiracy, fraud, money laundering and other counts.',
              queryKey: 'from',
              queryValue: '(Fastow, Andrew)',
              color: this.getCustodianColor('Fastow, Andrew'),
            },
            {
              x: new Date('2004-01-14').getTime(),
              label: 'Fastow pleads guilty',
              description:
                'Fastow pleads guilty to two counts of conspiracy and agrees to serve 10 years in prison.',
              queryKey: 'from',
              queryValue: '(Fastow, Andrew)',
              color: this.getCustodianColor('Fastow, Andrew'),
            },
            {
              x: new Date('2004-01-22').getTime(),
              label: 'Causey indicted',
              description: 'Causey indicted for wire fraud and conspiracy',
              queryKey: 'from',
              queryValue: '(Causey, Richard)',
              color: this.getCustodianColor('Causey, Richard'),
            },
            {
              x: new Date('2004-02-19').getTime(),
              label: 'Skilling indicted',
              description:
                'Skilling added to Causey indictment, pleads innocent to more than 30 counts.',
              queryKey: 'from',
              queryValue: '(Skilling, Jeff)',
              color: this.getCustodianColor('Skilling, Jeff'),
            },
            {
              x: new Date('2004-07-08').getTime(),
              label: 'Lay indicted',
              description:
                'Lay surrenders after being indicted. He pleads innocent.',
              queryKey: 'from',
              queryValue: '(Lay, Kenneth)',
              color: this.getCustodianColor('Lay, Kenneth'),
            },
            {
              x: new Date('2005-12-28').getTime(),
              label: 'Causey pleads guilty',
              description:
                'Causey pleads guilty, agrees to testify against Lay and Skilling',
              queryKey: 'from',
              queryValue: '(Causey, Richard)',
              color: this.getCustodianColor('Causey, Richard'),
            },
            {
              x: new Date('2006-07-05').getTime(),
              label: 'Lay dies',
              description:
                'Lay dies of heart attack while vacationing in Aspen',
              queryKey: 'from',
              queryValue: '(Lay, Kenneth)',
              color: this.getCustodianColor('Lay, Kenneth'),
            },
            {
              x: new Date('2006-10-23').getTime(),
              label: 'Skilling sentenced',
              description: 'Skilling sentenced to 24 years in prison',
              queryKey: 'from',
              queryValue: '(Skilling, Jeff)',
              color: this.getCustodianColor('Skilling, Jeff'),
            },
          ],
        },
      ],
    }

    this.chart = Highcharts.chart('container', options)
  }

  ngOnChanges(): void {
    this.createChart()
  }

  ngOnInit(): void {
    this.store
      .pipe(select(selectCustodians))
      .subscribe((custodians: Custodian[]) => {
        this.custodians = custodians
        this.createChart()
      })
    this.store.pipe(select(selectDarkMode)).subscribe((darkMode: boolean) => {
      this.darkMode = darkMode
      this.createChart()
    })
  }

  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy()
  }
}
