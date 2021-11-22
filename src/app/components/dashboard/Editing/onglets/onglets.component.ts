import { Component, OnInit } from '@angular/core';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';
import { Onglet } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';

@Component({
  selector: 'app-dash-onglets',
  templateUrl: './onglets.component.html',
  styleUrls: ['./onglets.component.scss'],
})
export class OngletsComponent implements OnInit {
  constructor(
    public ongletservice: OngletsService,
    private admin: AdminLoginService
  ) {}

  // VARIABLES
  onglet: Onglet = {
    id: '',
    titre: '',
    dossier: '',
    type: '',
    lien: '0',
    position: 0,
  };
  onglets: Onglet[] = [];
  // DELETE A PARTIR D LA PAGE DE PRESENTATION
  delete($id: string) {
    this.ongletservice.deleteOnglet($id);
    if (this.onglet.type === 'Normal') {
      this.admin.showNotification('Onglet supprimé !');
    } else {
      this.admin.showNotification('Dossier supprimé !');
    }
  }
  ngOnInit(): void {
    //RECUPERE TOUS LES ONGLETS
    this.ongletservice.getOnglets().subscribe((o: Onglet[]) => {
      this.onglets = o;
      //TRI DES ONGLETS PAR POSITION POUR AFFICHAGE NAV
      this.ongletservice.tri(this.onglets);
    });
  }
}
