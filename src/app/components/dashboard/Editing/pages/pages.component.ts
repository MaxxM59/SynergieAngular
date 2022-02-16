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
    public admin: AdminLoginService
  ) {}
  page: Page = {
    id: '',
    titre: '',
    pres: '',
    st1: null,
    pa1: '',
    image1: null,
    image2: null,
    image3: null,
    st2: null,
    st3: null,
    st4: null,
    st5: null,
    pa2: null,
    pa3: null,
    pa4: null,
    pa5: null,
    lien: null,
    nomlien: null,
  };

  pages: Page[] = [];
  // DELETE
  delete($id: string) {
    this.pageservice.deletePage($id);
  }
  ngOnInit(): void {
    // RECUPERE TOUTES LES PAGES
    this.pageservice.getPages().subscribe((p: Page[]) => {
      this.pages = p;
    });
  }
}
