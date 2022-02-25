import { Component, OnInit } from '@angular/core';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';
import { Onglet, Page } from 'src/app/models/models';
import { Router } from '@angular/router';
import { PagesService } from 'src/app/services/Admin/Editing/pages.service';
import { NotificationService } from 'src/app/services/Admin/notification.service';

@Component({
  selector: 'app-dash-onglets',
  templateUrl: './onglets.component.html',
  styleUrls: ['./onglets.component.scss'],
})
export class OngletsComponent implements OnInit {
  constructor(
    public ongletservice: OngletsService,
    public pageservice: PagesService,
    private notif: NotificationService,
    private router: Router
  ) {}

  // VARIABLES
  onglet: Onglet = {
    id: '',
    titre: '',
    dossier: null,
    type: '',
    lien: '',
    position: 0,
    linked: null,
  };
  onglets: Onglet[] = [];
  pages: Page[] = [];
  linked: any;
  solos: any;
  // DELETE A PARTIR D LA PAGE DE PRESENTATION
  delete($id: string) {
    if (confirm('Voulez-vous vraiment supprimer cet élément?')) {
      if (this.onglet.type === 'Normal' || this.onglet.type === '') {
        this.ongletservice.deleteOnglet($id);
        this.notif.showNotification('Onglet supprimé !');
      } else {
        this.ongletservice.deleteOnglet($id);
        this.notif.showNotification('Dossier supprimé !');
      }
      this.router.navigate(['dashboard/onglets']);
    }
  }
  isLinked() {
    for (var o of this.onglets) {
      o.linked = 'Non';
      for (var p of this.pages) {
        if (p.titre.includes(o.titre)) {
          o.linked = 'Oui';
        }
      }
    }
  }
  ngOnInit(): void {
    //RECUPERE TOUS LES ONGLETS
    this.ongletservice.getOnglets().subscribe((o: Onglet[]) => {
      this.onglets = o;
      // RECUPERE TOUTES LES PAGES
      this.pageservice.getPages().subscribe((p: Page[]) => {
        this.pages = p;

        //TRI DES ONGLETS PAR POSITION POUR AFFICHAGE NAV
        this.ongletservice.tri(this.onglets);
        this.isLinked();
      });
    });
  }
}
