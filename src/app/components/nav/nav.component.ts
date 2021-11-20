import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Onglet, Page } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';
import { PagesService } from 'src/app/services/Admin/Editing/pages.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  pages: Page[] = [];
  constructor(
    public ongletservice: OngletsService,
    private admin: AdminLoginService,
    private pagesservice: PagesService
  ) {}

  onglets: Onglet[] = [];
  dossiers: any;
  dropdowns: any;
  solo: any;
  check = 'dd.dossier=== d.titre';
  auth = this.admin.auth;

  // TRI DES ONGLETS
  tri(tab: Onglet[]) {
    // ONGLETS SOLOS
    this.solo = tab.filter(
      (onglet) => onglet.type === 'Normal' || onglet.dossier === 'Aucun'
    );

    //ONGLETS DOSSIERS
    this.dossiers = tab.filter((onglet) => onglet.type === 'Dossier');

    // ONGLETS DROPDOWN => ATTENTION A FIX LES NOMS DE DOSSIERS LORS DE LA CREATION !!!
    this.dropdowns = tab.filter(
      (onglet) => onglet.dossier !== 'Aucun' && onglet.dossier !== ''
    );
  }
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
      //TRI DES ONGLETS POUR AFFICHAGE NAV
      this.tri(this.onglets);
    });
  }
}
