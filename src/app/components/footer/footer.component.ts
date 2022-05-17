import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GotoLinkServiceService } from 'src/app/services/Admin/goto-link-service.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    // VARIABLES

    contact: string = '';

    constructor(public admin: GotoLinkServiceService, private router: Router) {}

    ngOnInit(): void {
        if (
            this.router.url.startsWith('localhost:4200/page/') ||
            this.router.url.startsWith('localhost:4200/contactform') ||
            this.router.url.startsWith(
                'https://synergieangular.firebaseapp.com/page'
            ) ||
            this.router.url.startsWith(
                'https://synergieangular.firebaseapp.com/contactform'
            )
        ) {
            this.contact = '../contactform';
        } else {
            this.contact = '/contactform';
        }
    }
}
