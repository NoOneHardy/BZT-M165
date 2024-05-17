import { Routes } from '@angular/router';
import {ProductOverviewComponent} from "./product-overview/product-overview.component";
import {NewProductComponent} from './new-product/new-product.component'
import {authGuard} from "./shared/auth.guard";
import {EditOverviewComponent} from './edit-overview/edit-overview.component'
import {EditComponent} from './edit-overview/edit/edit.component'
import {ProductDetailsComponent} from './product-overview/product-details/product-details.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'view'
  },
  {
    path: 'view',
    component: ProductOverviewComponent
  },
  {
    path: 'create',
    component: NewProductComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'edit',
    component: EditOverviewComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'detail/:id',
    component: ProductDetailsComponent
  }
];
