import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-acceuil',
  templateUrl: './dashboard-acceuil.component.html',
  styleUrls: ['./dashboard-acceuil.component.scss'],
})
export class DashboardAcceuilComponent implements OnInit {
  constructor() {}
  isAdmin: boolean | undefined;
  ngOnInit() {
    if (window.location.href.indexOf('dashboard') > 0) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
