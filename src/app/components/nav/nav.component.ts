import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Onglet } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(
    public ongletservice: OngletsService,
    private admin: AdminLoginService,
    private router: Router
  ) {}

  onglets: Onglet[] = [];

  ngOnInit(): void {
    this.ongletservice.getOnglets().subscribe((o: Onglet[]) => {
      this.onglets = o;
    });
  }
}
