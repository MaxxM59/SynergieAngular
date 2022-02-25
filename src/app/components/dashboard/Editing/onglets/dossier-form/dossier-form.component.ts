import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Onglet } from 'src/app/models/models';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';
import { NotificationService } from 'src/app/services/Admin/notification.service';

@Component({
  selector: 'app-dossier-form',
  templateUrl: './dossier-form.component.html',
  styleUrls: ['./dossier-form.component.scss'],
})
export class DossierFormComponent implements OnInit {
  // VARIABLES
  id: string = '';
  onglet: Onglet = {
    id: '',
    titre: '',
    dossier: null,
    type: '',
    lien: '',
    linked: null,
    position: 1,
  };
  onglets: any;
  checktitre: boolean = true;
  constructor(
    public ongletservice: OngletsService,
    private router: Router,
    private route: ActivatedRoute,
    private notif: NotificationService
  ) {}

  // FONCTION LANCEE QUAND ON CLIQUE SUR ENREGISTRER
  save(dossierForm: NgForm) {
    if (dossierForm.valid) {
      if (this.onglet.id) {
        // SI L'ONGLET EXISTE DEJA
        this.ongletservice.updateOnglet(dossierForm.value, this.id);
        this.notif.showNotification('Dossier modifié !');
        this.router.navigate(['dashboard/onglets']);
      } else {
        // VERIFICATION SI LE TITRE EXISTE DEJA
        for (var i = 0; i < Object.keys(this.onglets).length; i++) {
          if (this.onglets[i].titre === dossierForm.value.titre) {
            this.checktitre = false;
          }
        }
        if (this.checktitre === true) {
          // SI C'EST UN NOUVEL ONGLET
          this.ongletservice.addOnglet('Dossier', dossierForm.value);
          this.notif.showNotification('Le dossier a été créé');
          this.router.navigate(['dashboard/onglets']);
        } else {
          this.notif.showNotification('Ce titre de dossier est déja utilisé !');
        }
      }
    } // SI ERREUR DANS LE FORM
    else {
      this.notif.showNotification('Il y a des erreurs dans le formulaire!');
    }
    this.checktitre = true;
  }

  // DELETE A PARTIR DE LA PAGE D'EDIT
  delete() {
    if (confirm('Voulez-vous vraiment supprimer cet élément?')) {
      this.ongletservice.deleteOnglet(this.id);
      this.notif.showNotification('Dossier supprimé !');
      this.router.navigate(['dashboard/onglets']);
    }
  }
  ngOnInit(): void {
    // REMPLIS LE FORMULAIRE AVEC LES DONNES DU DOSSIER S'IL EXISTE
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id) {
      this.ongletservice.getOnglet(this.id).subscribe((o) => (this.onglet = o));
    }
    // RECUPERE TOUS LES ONGLETS POUR COMPARER LE TITRE AVEC LA VALUE DU FORM
    this.ongletservice.getOnglets().subscribe((o: Onglet[]) => {
      this.onglets = o;
    });
  }
}
