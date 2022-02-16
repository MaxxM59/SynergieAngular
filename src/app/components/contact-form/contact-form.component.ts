import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../models/models';
import { AdminLoginService } from '../services/Admin/admin-login.service';
import { ContactFormService } from '../services/contactForm/contact-form.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contact: Contact = {
    id: '',
    name: '',
    surname: '',
    mail: '',
    phone: '',
    content: '',
    subject: '',
  };
  constructor(
    public contactform: ContactFormService,
    private router: Router,
    public admin: AdminLoginService
  ) {}
  // SAUVEGARDE LES DONNEES SI LE FORMULAIRE EST VALIDE
  save(contactForm: NgForm) {
    if (contactForm.valid) {
      // SI C'EST UNE NOUVELLE PAGE
      this.contactform.addContact(contactForm.value);
      this.admin.showNotification('Message envoyé !');

      // REDIRECTION VERS L'ACCEUIL
      this.router.navigate(['']);
    } else {
      // SI LE FORMULAIRE N'EST PAS VALIDE
      this.admin.showNotification('Il y a des erreurs dans le formulaire!');
    }
  }
  ngOnInit(): void {}
}
