import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

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

  //LOGOUT
  logOut(): void {
    this.afAuth.signOut();
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
    private notif: NotificationService
  ) {}
}
