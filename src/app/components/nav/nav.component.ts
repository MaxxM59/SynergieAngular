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
    private admin: AdminLoginService
  ) {}

  onglets: Onglet[] = [];
  dossiers: any;
  dropdowns: any;
  solo: any;
  check = 'dd.dossier=== d.titre';
  auth = this.admin.auth;
  // TRI DES ONGLETS
  tri(tab: Onglet[]) {
    // ONGLETS SOLOS
    this.solo = tab.filter(
      (onglet) => onglet.type === 'Normal' || onglet.dossier === 'Aucun'
    );

    //ONGLETS DOSSIERS
    this.dossiers = tab.filter((onglet) => onglet.type === 'Dossier');

    // ONGLETS DROPDOWN => ATTENTION A FIX LES NOMS DE DOSSIERS LORS DE LA CREATION !!!
    this.dropdowns = tab.filter(
      (onglet) => onglet.dossier !== 'Aucun' && onglet.dossier !== ''
    );
  }

  ngOnInit(): void {
    this.ongletservice.getOnglets().subscribe((o: Onglet[]) => {
      this.onglets = o;
      this.tri(this.onglets);
    });
  }
}
