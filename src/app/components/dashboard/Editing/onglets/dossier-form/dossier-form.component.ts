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
    titre: 0,
    dossier: 0,
    type: '',
    lien: '0',
    position: 1,
  };
  constructor(
    public ongletservice: OngletsService,
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminLoginService
  ) {}
  // FONCTION LANCEE QUAND ON CLIQUE SUR ENREGISTRER
  save(dossierForm: NgForm) {
    if (dossierForm.valid) {
      if (this.onglet.id) {
        // SI LE DOSSIER EXISTE DEJA
        this.ongletservice.updateOnglet(dossierForm.value, this.id);
        this.admin.showNotification('Dossier modifié !');
      } else {
        // SI C'EST UN NOuVEAU DOSSIER
        this.onglet.type = 'Dossier';
        this.ongletservice.addOnglet('Dossier', dossierForm.value);
        this.admin.showNotification('Le dossier a été créé');
      }

      this.router.navigate(['dashboard/onglets']);
    } // SI ERREUR DANS LE FORM
    else {
      this.admin.showNotification('Il y a des erreurs dans le formulaire!');
    }
  }
  // DELETE A PARTIR DE LA PAGE D'EDIT
  delete() {
    if (confirm('Voulez-vous vraiment supprimer cet élément?')) {
      this.ongletservice.deleteOnglet(this.id);
      this.admin.showNotification('Dossier supprimé !');
      this.router.navigate(['dashboard/onglets']);
    } else {
      this.router.navigate(['dossier-form/{{o.id}}']);
    }
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this.ongletservice.getOnglet(this.id).subscribe((o) => (this.onglet = o));
  }
}
