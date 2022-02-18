import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Onglet } from 'src/app/models/models';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';

@Component({
  selector: 'app-onglets-form',
  templateUrl: './onglets-form.component.html',
  styleUrls: ['./onglets-form.component.scss'],
})
export class OngletsFormComponent implements OnInit {
  // VARIABLES
  id: string = '';
  onglet: Onglet = {
    id: '',
    titre: '',
    dossier: null,
    type: '',
    lien: '',
    position: 0,
  };
  onglets: any;
  checktitre: boolean = false;
  constructor(
    public ongletservice: OngletsService,
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminLoginService
  ) {}
  // FONCTION LANCEE QUAND ON CLIQUE SUR ENREGISTRER
  save(ongletForm: NgForm) {
    if (ongletForm.valid) {
      if (this.onglet.id) {
        // SI L'ONGLET EXISTE DEJA
        this.ongletservice.updateOnglet(ongletForm.value, this.id);
        this.admin.showNotification('Onglet modifié !');
        this.router.navigate(['dashboard/onglets']);
      } // SI C'EST UN NOUVEL ONGLET
      else {
        // VERIFICATION SI LE TITRE EXISTE DEJA
        this.ongletservice.getOnglets().subscribe((o: Onglet[]) => {
          this.onglets = o;
          for (var i = 0; i < Object.keys(this.onglets).length; i++) {
            if (this.onglets.includes(String(this.onglet.titre))) {
              this.checktitre = false;
            }
          }
          if (this.checktitre === true) {
            this.ongletservice.addOnglet('Normal', ongletForm.value);
            this.admin.showNotification("L'onglet a été créé");
            this.router.navigate(['dashboard/onglets']);
          } else {
            this.admin.showNotification("Ce titre d'onglet est déja utilisé !");
          }
        });
      }
    } // SI ERREUR DANS LE FORM
    else {
      this.admin.showNotification('Il y a des erreurs dans le formulaire!');
    }
  }

  // DELETE A PARTIR DE LA PAGE D'EDIT
  delete() {
    if (confirm('Voulez-vous vraiment supprimer cet élément?')) {
      this.ongletservice.deleteOnglet(this.id);
      this.admin.showNotification('Onglet supprimé !');
      this.router.navigate(['dashboard/onglets']);
    }
  }
  ngOnInit(): void {
    // REMPLIS LE FORMULAIRE AVEC LES DONNES DE L'ONGLET S'IL EXISTE
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this.ongletservice.getOnglet(this.id).subscribe((o) => (this.onglet = o));
  }
}
