import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/Admin/notification.service';
import { Contact } from '../../models/models';
import { ContactFormService } from '../../services/contactForm/contact-form.service';

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
    public notif: NotificationService
  ) {}

  // SAUVEGARDE LES DONNEES SI LE FORMULAIRE EST VALIDE
  save(contactForm: NgForm) {
    if (contactForm.valid) {
      // SI C'EST UNE NOUVELLE PAGE
      this.contactform.addContact(contactForm.value);
      this.notif.showNotification('Message envoyé !');

      // REDIRECTION VERS L'ACCEUIL
      this.router.navigate(['']);
    } else {
      // SI LE FORMULAIRE N'EST PAS VALIDE
      this.notif.showNotification('Il y a des erreurs dans le formulaire!');
    }
  }
  ngOnInit(): void {}
}
