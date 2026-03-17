import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout';
import { LoginComponent } from './features/auth/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { VendorListComponent } from './features/vendors/vendor-list/vendor-list';
import { VendorFormComponent } from './features/vendors/vendor-form/vendor-form';
import { OrderListComponent } from './features/purchase-orders/order-list/order-list';
import { OrderFormComponent } from './features/purchase-orders/order-form/order-form';
import { OrderDetailComponent } from './features/purchase-orders/order-detail/order-detail';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'vendors', component: VendorListComponent },
      { path: 'vendors/new', component: VendorFormComponent },
      { path: 'vendors/edit/:id', component: VendorFormComponent },
      { path: 'purchase-orders', component: OrderListComponent },
      { path: 'purchase-orders/new', component: OrderFormComponent },
      { path: 'purchase-orders/:id', component: OrderDetailComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
