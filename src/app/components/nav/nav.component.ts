import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Onglet, Page } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';
import { PagesService } from 'src/app/services/Admin/Editing/pages.service';
import { DossierFormComponent } from '../dashboard/Editing/onglets/dossier-form/dossier-form.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  pages: Page[] = [];
  page: Page = {
    id: '',
    titre: '',
    contenu: '',
    image: '',
  };
  constructor(
    public ongletservice: OngletsService,
    private admin: AdminLoginService,
    private pagesservice: PagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // VARIABLES
  onglets: Onglet[] = [];
  auth = this.admin.auth;

  //LINK DES PAGES AUX LIENS

  link() {
    this.onglets.forEach((o) =>
      this.pages.forEach((p) => {
        if (o.titre === p.titre) {
          o.lien = p.id;
        }
      })
    );
  }

  ngOnInit(): void {
    //RECUPERE TOUTES LES PAGES
    this.pagesservice.getPages().subscribe((p: Page[]) => {
      this.pages = p;
    });
    //RECUPERE TOUS LES ONGLETS
    this.ongletservice.getOnglets().subscribe((o: Onglet[]) => {
      this.onglets = o;
      //LINK ONGLETS<--->PAGES
      this.link();
      //TRI DES ONGLETS PAR POSITION POUR AFFICHAGE NAV
      this.ongletservice.tri(this.onglets);
    });
  }
}
