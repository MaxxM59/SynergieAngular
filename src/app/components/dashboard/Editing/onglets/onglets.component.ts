import { Component, Inject, inject, OnInit } from '@angular/core';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';
import { Onglet } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dash-onglets',
  templateUrl: './onglets.component.html',
  styleUrls: ['./onglets.component.scss'],
})
export class OngletsComponent implements OnInit {
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
    console.log(this.onglets);
  }
}
