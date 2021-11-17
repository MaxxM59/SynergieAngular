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
  affiche() {
    console.log(this.onglets);
  }
  onglets: Onglet[] = [];
  dossiers: any = [];
  dropdowns: any = [];
  solo: any = [];

  // TRI DES ONGLETS
  tri(tab: Onglet[]) {
    // ONGLETS SOLOS
    var pushSolo = tab.filter((onglet) => onglet.type === 'Normal');
    this.solo.push(pushSolo);

    //ONGLETS DOSSIERS
    var pushDossiers = tab.filter((onglet) => onglet.type === 'Dossier');
    this.dossiers.push(pushDossiers);

    // ONGLETS DROPDOWN => ATTENTION A FIX LES NOMS DE DOSSIERS LORS DE LA CREATION !!!
    var pushDropdown = tab.filter((onglet) => onglet.dossier !== '');
    this.dropdowns.push(pushDropdown);
  }

  //

  ngOnInit(): void {
    this.ongletservice.getOnglets().subscribe((o: Onglet[]) => {
      this.onglets = o;
      this.tri(this.onglets);
      console.log(this.tri(this.onglets));
    });
  }
}
