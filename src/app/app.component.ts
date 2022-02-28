import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  auth: boolean = false;
  isAdmin: boolean | undefined;
  constructor(public router: Router) {}
  ngOnInit() {
    if (!this.router.url.includes('dashboard')) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
