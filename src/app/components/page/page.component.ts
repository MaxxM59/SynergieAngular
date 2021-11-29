import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
