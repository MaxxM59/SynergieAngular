import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  // VARIABLES
  auth = this.admin.auth;
  // OUVRE lA PAGE DANS UNE NOUVELLE FENETRE
  goToLink(url: string) {
    window.open(url, '_blank');
  }
  constructor(private admin: AdminLoginService) {}

  ngOnInit(): void {}
}
