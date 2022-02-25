import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MiseenPage } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { MiseEnPageService } from 'src/app/services/Admin/Editing/mise-en-page.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/services/Admin/notification.service';

@Component({
  selector: 'app-mise-en-page',
  templateUrl: './mise-en-page.component.html',
  styleUrls: ['./mise-en-page.component.scss'],
})
export class MiseEnPageComponent implements OnInit {
  miseenpage: MiseenPage = {
    id: '',
    titrepolice: null,
    titrecouleur: null,
    titredecoration: null,
    presdecoration: null,
    prescouleur: null,
    prespolice: null,

    // SOUS TITRES

    st1police: null,
    st1couleur: null,
    st2police: null,
    st2couleur: null,
    st3police: null,
    st3couleur: null,
    st4police: null,
    st4couleur: null,
    st5police: null,
    st5couleur: null,
    st1decoration: null,
    st5decoration: null,
    st4decoration: null,
    st3decoration: null,
    st2decoration: null,
    // PARAGRAPHES
    pa1decoration: null,
    pa2decoration: null,
    pa3decoration: null,
    pa4decoration: null,
    pa5decoration: null,
    pa1police: null,
    pa1couleur: null,
    pa2police: null,
    pa2couleur: null,
    pa3police: null,
    pa3couleur: null,
    pa4police: null,
    pa4couleur: null,
    pa5police: null,
    pa5couleur: null,
  };

  constructor(
    private router: Router,
    private miseenpagesservice: MiseEnPageService,
    public notif: NotificationService
  ) {}
  // SAUVEGARDE LES DONNEES SI LE FORMULAIRE EST VALIDE
  save(miseenpageForm: NgForm) {
    if (miseenpageForm) {
      this.miseenpagesservice.updateMiseEnPage(
        miseenpageForm.value,
        this.miseenpage.id
      );
      this.notif.showNotification('Mise en page enregistrée !');
    }
  }

  ngOnInit(): void {
    // REMPLIS LE FORMULAIRE AVEC LES DONNES DE MISE EN PAGE EXISTANTES

    // ID Firebase du document
    this.miseenpage.id = 'c8LgrnwLYTyCdGr53PzV';
    this.miseenpagesservice
      .getMiseenPage(this.miseenpage.id)
      .subscribe((m) => (this.miseenpage = m));
  }
}
