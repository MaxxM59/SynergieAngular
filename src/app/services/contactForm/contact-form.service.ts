import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/models';
import { AdminLoginService } from '../Admin/admin-login.service';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  constructor(
    private afs: AngularFirestore,
    private admin: AdminLoginService,
    private router: Router
  ) {}

  //AJOUTE UN MESSAGE
  addContact(contact: Contact): void {
    this.afs.collection<Contact>('pages').add(contact);
  }
}
