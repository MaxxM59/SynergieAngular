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
  id: string = '';

  onglet: Onglet = {
    id: '',
    titre: '',
    dossier: '',
    type: '',
    lien: '0',
    position: 0,
  };
  constructor(
    public ongletservice: OngletsService,
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminLoginService
  ) {}
  save(dossierForm: NgForm) {
    if (dossierForm.valid) {
      if (this.onglet.id) {
        this.ongletservice.updateOnglet(dossierForm.value, this.id);
        this.admin.showNotification('Dossier modifié !');
      } else {
        this.onglet.type = 'Dossier';
        this.ongletservice.addOnglet('Dossier', dossierForm.value);
        this.admin.showNotification('Le dossier a été créé');
      }

      this.router.navigate(['dashboard/onglets']);
    } else {
      this.admin.showNotification('Il y a des erreurs dans le formulaire!');
    }
  }
  delete() {
    this.ongletservice.deleteOnglet(this.id);
    this.admin.showNotification('Onglet supprimé !');
    this.router.navigate(['dashboard/onglets']);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this.ongletservice.getOnglet(this.id).subscribe((o) => (this.onglet = o));
  }
}
