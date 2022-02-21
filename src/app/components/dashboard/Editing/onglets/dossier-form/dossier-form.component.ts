import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Onglet } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';

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
    position: 1,
  };
  onglets: any;
  checktitre: boolean | undefined;
  constructor(
    public ongletservice: OngletsService,
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminLoginService
  ) {}

  // FONCTION LANCEE QUAND ON CLIQUE SUR ENREGISTRER
  save(dossierForm: NgForm) {
    if (dossierForm.valid) {
      // VERIFICATION SI LE TITRE EXISTE DEJA
      for (var i = 0; i < Object.keys(this.onglets).length; i++) {
        if (this.onglets[i].titre === dossierForm.value.titre) {
          this.checktitre = false;
        }
      }

      if (this.checktitre === true) {
        if (this.onglet.id) {
          // SI L'ONGLET EXISTE DEJA
          this.ongletservice.updateOnglet(dossierForm.value, this.id);
          this.admin.showNotification('Dossier modifié !');
          this.router.navigate(['dashboard/onglets']);
        } else {
          // SI C'EST UN NOUVEL ONGLET
          this.ongletservice.addOnglet('Dossier', dossierForm.value);
          this.admin.showNotification('Le dossier a été créé');
          this.router.navigate(['dashboard/onglets']);
        }
      } else {
        this.admin.showNotification('Ce titre de dossier est déja utilisé !');
      }
    } // SI ERREUR DANS LE FORM
    else {
      this.admin.showNotification('Il y a des erreurs dans le formulaire!');
    }
    this.checktitre = true;
  }

  // DELETE A PARTIR DE LA PAGE D'EDIT
  delete() {
    if (confirm('Voulez-vous vraiment supprimer cet élément?')) {
      this.ongletservice.deleteOnglet(this.id);
      this.admin.showNotification('Dossier supprimé !');
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
