import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { getCustodiansAsync } from '../store/custodians'
import { CustodiansState } from '../store/slices/custodiansSlice'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'x2 Angular'

  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store<CustodiansState>) { }

  ngOnInit(): void {
    getCustodiansAsync(this.store)
  }
}
