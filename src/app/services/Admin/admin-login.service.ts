import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Admin } from 'src/app/models/models';
import { map, Observable } from 'rxjs';

type UserCredential = Promise<firebase.default.auth.UserCredential>;
@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
  // EMPECHE L'ACCESS A LA PARTIE ADMIN SI NON CONNECTE
  auth: any = false;

  // LOGIN
  async login(email: string, password: string): UserCredential {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  // RECUPERE TOUs LES ADMINS
  getAdmins(): Observable<Admin[]> {
    //POUR A VOIR L'ID
    return this.afs
      .collection<Admin>('admins')
      .snapshotChanges()
      .pipe(
        map((changes: any) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      );
  }
  //LOGOUT
  logOut(): void {
    this.auth = false;
    this.router.navigate(['admin']);
    this.notif.showNotification(`Vous êtes déconnecté(e) ! Bonne journée !`);
  }

  escapeHtml(text: string) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private notif: NotificationService,
    private afs: AngularFirestore
  ) {}
}
