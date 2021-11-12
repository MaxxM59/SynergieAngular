import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFormComponent } from './Admin/admin-form/admin-form.component';
import { AccueilComponent } from './Admin/Dashboard/accueil/accueil.component';
import { ArticlesComponent } from './Admin/Dashboard/articles/articles.component';
import { OngletsComponent } from './Admin/Dashboard/onglets/onglets.component';
import { PagesComponent } from './Admin/Dashboard/pages/pages.component';

const routes: Routes = [
  { path: 'admin', component: AdminFormComponent },
  { path: 'admin/dashboard', component: AccueilComponent },
  { path: 'admin/articles', component: ArticlesComponent },
  { path: 'admin/pages', component: PagesComponent },
  { path: 'admin/onglets', component: OngletsComponent },
  //{ path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
