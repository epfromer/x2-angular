import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { EmailXferedDatum } from '../../store/types'

@Component({
  selector: 'pie-chartjs',
  templateUrl: './pie-chartjs.component.html',
})
export class PieChartJSComponent {
  @Input() title: string
  @Input() search: string
  @Input() data: Array<EmailXferedDatum>
  @Input() handleClick: (search: string, name: string) => void

  // eslint-disable-next-line prettier/prettier
  constructor(private _router: Router) { }

  // https://www.npmjs.com/package/ng2-charts

}
