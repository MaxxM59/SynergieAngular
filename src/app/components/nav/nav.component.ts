import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  mobile: boolean = false;
  pages: Page[] = [];
  page: Page = {
    id: '',
    titre: '',
    pres: '',
    st1: '',
    st2: '',
    st3: '',
    st4: '',
    st5: '',
    pa1: '',
    pa2: '',
    pa3: '',
    pa4: '',
    pa5: '',
    image1: '',
    image2: '',
    image3: '',

    lien: '',
    nomlien: '',
  };
  constructor(
    public ongletservice: OngletsService,
    public admin: AdminLoginService,
    private pagesservice: PagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // VARIABLES
  onglets: Onglet[] = [];
  auth = this.admin.auth;
  contact: string | undefined;
  //LIAISON DES PAGES AUX ONGLETS
  link() {
    this.onglets.forEach((o) => {
      this.pages.forEach((p) => {
        if (o.titre === p.titre) {
          if (this.router.url.startsWith('localhost:4200/page/')) {
            o.lien = `/${p.titre}`;
            this.contact = '../contactform';
          } else {
            o.lien = `/page/${p.titre}`;
            this.contact = '/contactform';
          }
        }
      });
    });
  }

  ngOnInit(): void {
    //RECUPERE TOUTES LES PAGES
    this.pagesservice.getPages().subscribe((p: Page[]) => {
      this.pages = p;
    });
    //RECUPERE TOUS LES ONGLETS
    this.ongletservice.getOnglets().subscribe((o: Onglet[]) => {
      this.onglets = o;
      //LIAISON ONGLETS<--->PAGES
      this.link();
      //TRI DES ONGLETS PAR POSITION POUR AFFICHAGE NAV
      this.ongletservice.tri(this.onglets);
    });
  }
}
