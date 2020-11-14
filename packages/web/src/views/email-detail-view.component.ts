import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  template: ` <p>email detail-view works!</p> `,
  styles: [``],
})
export class EmailDetailViewComponent {
  // eslint-disable-next-line prettier/prettier
  constructor(private router: Router, private route: ActivatedRoute) { }

  id = ''

  ngOnInit(): void {
    console.log('on init')
    this.route.params.subscribe((params) => {
      this.id = params['id']
      console.log(this.id)
    })
  }
}
