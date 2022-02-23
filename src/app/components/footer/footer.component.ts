import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  // VARIABLES
  auth = this.admin.auth;
  contact: string = '';

  constructor(public admin: AdminLoginService, private router: Router) {}

  ngOnInit(): void {
    if (
      this.router.url.startsWith('localhost:4200/page/') ||
      this.router.url.startsWith('localhost:4200/contactform')
    ) {
      this.contact = '../contactform';
    } else {
      this.contact = '/contactform';
    }
  }
}
