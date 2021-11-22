import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
type UserCredential = Promise<firebase.default.auth.UserCredential>;
@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
  auth: any = true;

  // LOGIN
  login(email: string, password: string): UserCredential {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  //LOGOUT
  logOut(): void {
    this.afAuth.signOut();
    this.auth = false;
    this.router.navigate(['admin']);
    this.showNotification(`Vous êtes déconnecté(e)! Bonne journée !`);
  }

  // NOTIFICATION
  showNotification(
    msg: string,
    btnTxt?: string
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(msg, btnTxt, {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
}
