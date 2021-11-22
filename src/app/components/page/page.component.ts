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
    contenu: '',
    image: '',
  };
  constructor(
    private pagesservice: PagesService,
    private route: ActivatedRoute,
    private admin: AdminLoginService,
    private title: Title,
    private router: Router
  ) {
    // POUR POUVOIR NAVIGUER
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.page.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.page.id) {
      this.pagesservice.getPage(this.page.id).subscribe((p) => {
        this.page = p;
      });
      // ESSAI TITRE URL
      this.titre = this.page.titre;
      this.title.setTitle(this.route.snapshot.data['this.titre']);
    }
  }
  ngOndestroy(): void {}
}
