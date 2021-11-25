import { Component, OnInit } from '@angular/core';
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
    if (confirm('Voulez-vous vraiment supprimer cet élément?')) {
      if (this.onglet.type === 'Normal' || this.onglet.type === '') {
        this.ongletservice.deleteOnglet($id);
        this.admin.showNotification('Onglet supprimé !');
      } else {
        this.ongletservice.deleteOnglet($id);
        this.admin.showNotification('Dossier supprimé !');
      }
      this.router.navigate(['dashboard/onglets']);
    } else {
      this.router.navigate(['onglets-form/{{o.id}}']);
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
