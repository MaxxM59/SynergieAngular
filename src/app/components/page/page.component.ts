import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { PagesService } from 'src/app/services/Admin/Editing/pages.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  //VARIABLES
  auth = this.admin.auth;
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
  constructor(
    private pagesservice: PagesService,
    private route: ActivatedRoute,
    public admin: AdminLoginService,
    private router: Router
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
  }
}
