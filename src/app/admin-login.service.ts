import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auth } from 'firebaseui';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
  LOGIN_URL = 'admin';
  LOGOUT_URL = 'admin';

  constructor(private httpClient: HttpClient) {}
  /* FONCTION LOGIN
  login(pmail: any, ppassword: any) {
    const loginData = {
      mail: pmail,
      password: ppassword,
    };
    return new Observable<boolean>((Observer:Subscriber<boolean>));
  }*/

  /*FONCTION LOGOUT
  logOut() {
    auth.signOut().then(() => {});
  }*/
}
