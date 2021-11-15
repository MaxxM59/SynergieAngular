import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFormComponent } from './components/dashboard/admin-form/admin-form.component';
import { DashboardAcceuilComponent } from './components/dashboard/dashboard-acceuil/dashboard-acceuil.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { AuthGuardService } from './services/AuthGuard/auth-guard.service';
const routes: Routes = [
  {
    path: 'admin',
    component: AdminFormComponent,
  },

  {
    path: 'dashboard',
    redirectTo: 'dashboard/dash-acceuil',
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dash-acceuil',
        component: DashboardAcceuilComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  //{ path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
