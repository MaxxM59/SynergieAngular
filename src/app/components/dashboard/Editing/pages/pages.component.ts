import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Onglet, Page } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { PagesService } from 'src/app/services/Admin/Editing/pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  constructor(
    public pageservice: PagesService,
    private admin: AdminLoginService,
    private router: Router
  ) {}
  page: Page = {
    id: '',
    titre: '',
    image: '',
    contenu: '',
  };
  pages: Page[] = [];

  ngOnInit(): void {
    this.pageservice.getPages().subscribe((p: Page[]) => {
      this.pages = p;
    });
  }

  delete($id: string) {
    this.pageservice.deletePage($id);
    this.admin.showNotification('Page supprimée !');
  }
}
