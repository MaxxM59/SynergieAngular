import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Onglet } from 'src/app/models/models';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';
import { NotificationService } from 'src/app/services/Admin/notification.service';

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
    linked: null,
    position: 0,
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
  save(ongletForm: NgForm) {
    if (ongletForm.valid) {
      if (this.onglet.id) {
        // SI L'ONGLET EXISTE DEJA
        this.ongletservice.updateOnglet(ongletForm.value, this.id);
        this.notif.showNotification('Onglet modifié !');
        this.router.navigate(['dashboard/onglets']);
      } else {
        // VERIFICATION SI LE TITRE EXISTE DEJA
        for (var i = 0; i < Object.keys(this.onglets).length; i++) {
          if (this.onglets[i].titre === ongletForm.value.titre) {
            this.checktitre = false;
          }
        }
        if (this.checktitre === true) {
          // SI C'EST UN NOUVEL ONGLET
          this.ongletservice.addOnglet('Normal', ongletForm.value);
          this.notif.showNotification("L'onglet a été créé");
          this.router.navigate(['dashboard/onglets']);
        } else {
          this.notif.showNotification("Ce titre d'onglet est déja utilisé !");
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
      this.notif.showNotification('Onglet supprimé !');
      this.router.navigate(['dashboard/onglets']);
    }
  }
  ngOnInit(): void {
    // REMPLIS LE FORMULAIRE AVEC LES DONNES DE L'ONGLET S'IL EXISTE
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
