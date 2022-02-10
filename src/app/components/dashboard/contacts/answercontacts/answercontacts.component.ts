import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { ContactFormService } from 'src/app/services/contactForm/contact-form.service';

@Component({
  selector: 'app-answercontacts',
  templateUrl: './answercontacts.component.html',
  styleUrls: ['./answercontacts.component.scss'],
})
export class AnswercontactsComponent implements OnInit {
  // VARIABLES
  id: string = '';
  mailurl!: string;
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
    public contactervice: ContactFormService,
    private router: Router,
    private route: ActivatedRoute,
    public admin: AdminLoginService
  ) {}

  // gmailurl = `https://mail.google.com/mail/u/0/?fs=1&to=${this.contact.mail}&su=RE:${this.contact.subject}&tf=cm`;

  // DELETE
  delete() {
    this.contactervice.deleteContact(this.id);
  }
  // OUVRE l'HEBERGEUR D'IMAGE DANS UNE NOUVELLE FENETRE
  goToLink(url: string) {
    window.open(url, '_blank');
  }
  mailto(emailAddress: string, emailSubject: any) {
    return 'mailto:' + emailAddress + '?subject=RE:' + emailSubject;
  }
  ngOnInit(): void {
    // RMPLIS LE FORMULAIRE AVEC LES DONNEES DE L'ARTICLE
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this.contactervice
        .getContact(this.id)
        .subscribe((c) => (this.contact = c));
    //this.mailurl = `mailto:${this.contact.mail}?Subject=RE:${this.contact.subject}`;
    //console.log(this.mailurl);
  }
}
