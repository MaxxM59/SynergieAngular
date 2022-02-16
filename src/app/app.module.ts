import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminFormComponent } from './components/dashboard/admin-form/admin-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule, MatRipple } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthGuardService } from './services/AuthGuard/auth-guard.service';
import { AdminLoginService } from './services/Admin/admin-login.service';
import { DashboardAcceuilComponent } from './components/dashboard/dashboard-acceuil/dashboard-acceuil.component';
import { MatDialogModule } from '@angular/material/dialog';
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
  ],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTreeModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatRippleModule,
    MatCommonModule,
    MatCardModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
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
  providers: [AuthGuardService, AdminLoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
