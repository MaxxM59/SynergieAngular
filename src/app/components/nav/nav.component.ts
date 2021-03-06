import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Onglet, Page } from 'src/app/models/models';
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
    constructor(
        public ongletservice: OngletsService,

        private pagesservice: PagesService,

        private router: Router
    ) {}

    // VARIABLES
    onglets: Onglet[] = [];
    auth: boolean = false;
    contact: string | undefined;
    admin: string | undefined;

    //LIAISON DES PAGES AUX ONGLETS
    link() {
        this.onglets.forEach((o) => {
            this.pages.forEach((p) => {
                if (o.titre === p.titre) {
                    if (
                        this.router.url.startsWith('localhost:4200/page/') ||
                        this.router.url.startsWith(
                            'https://synergieangular.firebaseapp.com/page'
                        )
                    ) {
                        o.lien = `/page/${p.id}`;
                        this.contact = '../contactform';
                        this.admin = '../../admin';
                    } else {
                        o.lien = `/page/${p.id}`;
                        this.admin = '../admin';
                    }
                    if (
                        this.router.url.startsWith(
                            'localhost:4200/contactform'
                        ) ||
                        this.router.url.startsWith(
                            'https://synergieangular.firebaseapp.com/contactform'
                        )
                    ) {
                        this.contact = 'contactform';
                        o.lien = `../page/${p.id}`;
                        this.admin = '../../admin';
                    } else {
                        this.contact = '../contactform';
                        this.admin = '../admin';
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
