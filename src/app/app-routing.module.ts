import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFormComponent } from './Admin/admin-form/admin-form.component';

const routes: Routes = [
  { path: 'admin', component: AdminFormComponent },

  //{ path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
