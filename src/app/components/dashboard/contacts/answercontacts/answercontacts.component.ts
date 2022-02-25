import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/models';

import { ContactFormService } from 'src/app/services/contactForm/contact-form.service';

@Component({
  selector: 'app-answercontacts',
  templateUrl: './answercontacts.component.html',
  styleUrls: ['./answercontacts.component.scss'],
})
export class AnswercontactsComponent implements OnInit {
  // VARIABLES
  id: string = '';
  mailurl: string = '';
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
    private route: ActivatedRoute
  ) {}

  // DELETE
  delete() {
    this.contactervice.deleteContact(this.id);
  }
  mailto(emailAddress: string, emailSubject: any) {
    return (
      'mailto:' +
      emailAddress +
      '?subject=RE: ' +
      emailSubject +
      ' - Association Synergie '
    );
  }
  sendmail() {
    this.mailurl = this.mailto(this.contact.mail, this.contact.subject);
    window.location.href = this.mailurl;
  }
  ngOnInit(): void {
    // REMPLIS LE FORMULAIRE AVEC LES DONNEES DE L'ARTICLE
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this.contactervice
        .getContact(this.id)
        .subscribe((c) => (this.contact = c));
  }
}
