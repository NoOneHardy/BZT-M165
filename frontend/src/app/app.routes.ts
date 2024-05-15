import { Routes } from '@angular/router';
import {ProductOverviewComponent} from "./product-overview/product-overview.component";
import {ProductFormComponent} from "./product-form/product-form.component";
import {authGuard} from "./shared/auth.guard";
import {ViewComponent} from './view/view.component'
import {EditOverviewComponent} from './edit-overview/edit-overview.component'
import {EditComponent} from './edit/edit.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductOverviewComponent
  },
  {
    path: 'create',
    component: ProductFormComponent,
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
    path: 'view/:id',
    component: ViewComponent
  }
];
