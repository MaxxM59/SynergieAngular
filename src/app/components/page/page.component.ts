import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { PagesService } from 'src/app/services/Admin/Editing/pages.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  auth = this.admin.auth;

  page: Page = {
    id: '',
    titre: '',
    contenu: '',
  };
  constructor(
    private pagesservice: PagesService,
    private route: ActivatedRoute,
    private admin: AdminLoginService
  ) {}

  ngOnInit(): void {
    this.page.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.page.id) {
      this.pagesservice.getPage(this.page.id).subscribe((p) => {
        this.page = p;
        console.log(this.page);
      });
    }
  }
}