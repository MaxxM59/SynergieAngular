import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/models';
import { ContactFormService } from 'src/app/services/contactForm/contact-form.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor(public contactservice: ContactFormService) {}
  contact: Contact = {
    id: '',
    name: '',
    surname: '',
    mail: '',
    phone: '',
    content: '',
    subject: '',
  };
  contacts: Contact[] = [];
  // DELETE
  delete($id: string) {
    this.contactservice.deleteContact($id);
  }
  ngOnInit(): void {
    // RECUPERE TOUTES LES PAGES
    this.contactservice.getContacts().subscribe((c: Contact[]) => {
      this.contacts = c;
    });
  }
}
