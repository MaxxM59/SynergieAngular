import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
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

  //AJOUTE UN MESSAGE VISITEUR
  addContact(contact: Contact): void {
    this.afs.collection<Contact>('contact').add(contact);
  }

  getContacts(): Observable<Contact[]> {
    // POUR AVOIR L'ID
    return this.afs
      .collection<Contact>('contact')
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

  //RECUPERE UN ARTICLE
  getContact(id: string): Observable<Contact> {
    return this.afs
      .collection<Contact>('contact')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          if (action.payload.exists === false) {
            return new Object() as Contact;
          } else {
            const data = action.payload.data() as Contact;
            data.id = action.payload.id;
            return data;
          }
        })
      );
  }

  // SUPPRIME L'ARTICLE
  deleteContact(contactId: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce message ?')) {
      this.afs.collection<Contact>('contact').doc(contactId).delete();
      this.admin.showNotification('Message supprimé !');
      this.router.navigate(['dashboard/contacts']);
    } else {
      this.router.navigate(['answercontacts/{{o.id}}']);
    }
  }
}
