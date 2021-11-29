import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFormComponent } from './components/dashboard/admin-form/admin-form.component';
import { DashboardAcceuilComponent } from './components/dashboard/dashboard-acceuil/dashboard-acceuil.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { ArticleFormComponent } from './components/dashboard/Editing/articles/article-form/article-form.component';
import { ArticlesComponent } from './components/dashboard/Editing/articles/articles.component';
import { DossierFormComponent } from './components/dashboard/Editing/onglets/dossier-form/dossier-form.component';
import { OngletsFormComponent } from './components/dashboard/Editing/onglets/onglets-form/onglets-form.component';
import { OngletsComponent } from './components/dashboard/Editing/onglets/onglets.component';
import { PagesFormComponent } from './components/dashboard/Editing/pages/pages-form/pages-form.component';
import { PagesComponent } from './components/dashboard/Editing/pages/pages.component';
import { HomeComponent } from './components/home/home.component';
import { PageComponent } from './components/page/page.component';
import { AuthGuardService } from './services/AuthGuard/auth-guard.service';
const routes: Routes = [
  // PARTIE UTILISATEUR
  {
    path: 'page/:id',
    component: PageComponent,
  },

  {
    path: '',
    component: HomeComponent,
  },
  // PARTIE ADMIN
  {
    path: 'admin',
    component: AdminFormComponent,
  },
  {
    path: 'dashboard',
    redirectTo: 'dashboard/dashboard-acceuil',
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard-acceuil',
        component: DashboardAcceuilComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'onglets',
        component: OngletsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'onglets-form/:id',
        component: OngletsFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'dossier-form/new',
        component: DossierFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'dossier-form/:id',
        component: DossierFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'onglets-form/new',
        component: OngletsFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'articles-form/:id',
        component: ArticleFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'articles',
        component: ArticlesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'articles-form/new',
        component: ArticleFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'pages',
        component: PagesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'pages-form/:id',
        component: PagesFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'pages-form/new',
        component: PagesFormComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
