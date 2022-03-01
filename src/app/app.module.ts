import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
// LAZY LOADING
import {
  LazyLoadImageModule,
  LAZYLOAD_IMAGE_HOOKS,
  ScrollHooks,
} from 'ng-lazyload-image';
// COMPONENTS
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { AdminFormComponent } from './components/dashboard/admin-form/admin-form.component';
import { DashboardAcceuilComponent } from './components/dashboard/dashboard-acceuil/dashboard-acceuil.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { PagesComponent } from './components/dashboard/Editing/pages/pages.component';
import { OngletsComponent } from './components/dashboard/Editing/onglets/onglets.component';
import { ArticlesComponent } from './components/dashboard/Editing/articles/articles.component';
import { ArticleFormComponent } from './components/dashboard/Editing/articles/article-form/article-form.component';
import { OngletsFormComponent } from './components/dashboard/Editing/onglets/onglets-form/onglets-form.component';
import { PagesFormComponent } from './components/dashboard/Editing/pages/pages-form/pages-form.component';
import { DossierFormComponent } from './components/dashboard/Editing/onglets/dossier-form/dossier-form.component';
import { PageComponent } from './components/page/page.component';
import { HomeComponent } from './components/home/home.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactsComponent } from './components/dashboard/contacts/contacts.component';
import { AnswercontactsComponent } from './components/dashboard/contacts/answercontacts/answercontacts.component';
import { MiseEnPageComponent } from './components/dashboard/Editing/mise-en-page/mise-en-page.component';
// SERVICES
import { AuthGuardService } from './services/AuthGuard/auth-guard.service';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AdminFormComponent,
    DashboardHomeComponent,
    DashboardAcceuilComponent,
    FooterComponent,
    PagesComponent,
    OngletsComponent,
    ArticlesComponent,
    ArticleFormComponent,
    OngletsFormComponent,
    PagesFormComponent,
    DossierFormComponent,
    PageComponent,
    HomeComponent,
    ContactFormComponent,
    ContactsComponent,
    AnswercontactsComponent,
    MiseEnPageComponent,
    ImageComponent,
  ],
  imports: [
    LazyLoadImageModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTreeModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCommonModule,
    MatCardModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
  ],
  providers: [
    AuthGuardService,
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
