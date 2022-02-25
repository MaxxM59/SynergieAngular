import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MiseenPage, Page } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { MiseEnPageService } from 'src/app/services/Admin/Editing/mise-en-page.service';
import { PagesService } from 'src/app/services/Admin/Editing/pages.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  //VARIABLES

  titre: string = '';
  mytitle: string = '';
  page: Page = {
    id: '',
    titre: '',
    pres: '',
    st1: null,
    pa1: '',
    st2: null,
    st3: null,
    st4: null,
    st5: null,

    pa2: null,
    pa3: null,
    pa4: null,
    pa5: null,
    image1: null,
    image2: null,
    image3: null,
    lien: null,
    nomlien: null,
  };
  miseenpage: MiseenPage = {
    id: '',
    titrepolice: null,
    titrecouleur: null,
    prescouleur: null,
    prespolice: null,
    titredecoration: null,
    presdecoration: null,

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
    private pagesservice: PagesService,
    private route: ActivatedRoute,
    private router: Router,
    private miseenpagesservicee: MiseEnPageService
  ) {
    // FORCE LE ngOnInit POUR POUVOIR CHANGER LE CONTENU DE LA PAGE
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    // RECUPERE LA PAGE CORRESPONDANT A l'ID
    this.page.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.page.id) {
      this.pagesservice.getPage(this.page.id).subscribe((p) => {
        this.page = p;
      });
    }
    // RECUPERE LA MISE EN FORME PERSONALISEE
    // ID Firebase du document
    this.miseenpage.id = 'c8LgrnwLYTyCdGr53PzV';
    this.miseenpagesservicee
      .getMiseenPage(this.miseenpage.id)
      .subscribe((m) => (this.miseenpage = m));
  }
}
