import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomerViewComponent } from '../views/customer-view.component'
import { CustomerAddComponent } from '../views/customer-add.component'
import { StoreModule } from '@ngrx/store'
import { customerFeatureKey, reducer } from '../store/customer.reducer'

@NgModule({
  declarations: [CustomerViewComponent, CustomerAddComponent],
  imports: [CommonModule, StoreModule.forFeature(customerFeatureKey, reducer)],
  exports: [CustomerViewComponent, CustomerAddComponent],
})
export class CustomerModule { }
