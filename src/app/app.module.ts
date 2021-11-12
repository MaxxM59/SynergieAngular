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
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'flash-messages-angular';
import { AdminFormComponent } from './Admin/admin-form/admin-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OngletsComponent } from './Admin/Dashboard/onglets/onglets.component';
import { ArticlesComponent } from './Admin/Dashboard/articles/articles.component';
import { PagesComponent } from './Admin/Dashboard/pages/pages.component';
import { AccueilComponent } from './Admin/Dashboard/accueil/accueil.component';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule, MatRipple } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { MenuComponent } from './Admin/Dashboard/menu/menu.component';
import { MatRippleModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AdminFormComponent,
    OngletsComponent,
    ArticlesComponent,
    PagesComponent,
    AccueilComponent,
    MenuComponent,
  ],
  imports: [
    MatTreeModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatRippleModule,
    MatCommonModule,
    MatCardModule,
    FlashMessagesModule.forRoot(),
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
    BrowserAnimationsModule, // storage
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
