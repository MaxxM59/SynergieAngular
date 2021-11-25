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
    emplacementpa1: '',
    emplacementpa2: '',
    emplacementpa3: '',
    emplacementpa4: '',
    emplacementpa5: '',
    lien: '',
    nomlien: '',
  };
  constructor(
    private pagesservice: PagesService,
    private route: ActivatedRoute,
    public admin: AdminLoginService,
    private title: Title,
    private router: Router
  ) {
    // FORCE LE ngOnInit POUR POUVOIR NAVIGUER
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  // OUVRE LIEN BAS DE PAGE DANS UN NOUVEL ONGLET
  openCityInNewWindow(lien: string) {
    // Converts the route into a string that can be used
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`${lien}`])
    );

    window.open(url, '_blank');
  }

  ngOnInit(): void {
    this.page.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.page.id) {
      this.pagesservice.getPage(this.page.id).subscribe((p) => {
        this.page = p;
      });
    }
    console.log(this.page.lien);
  }
  ngOndestroy(): void {}
}
