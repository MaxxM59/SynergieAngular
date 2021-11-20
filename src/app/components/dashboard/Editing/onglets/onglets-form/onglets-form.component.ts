import { Component, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
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
  id: string = '';

  onglet: Onglet = {
    id: '',
    titre: '',
    dossier: 'Aucun',
    type: 'normal',
    lien: '0',
    position: 0,
  };

  constructor(
    public ongletservice: OngletsService,
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminLoginService
  ) {}
  save(ongletForm: NgForm) {
    if (ongletForm.valid) {
      if (this.onglet.id) {
        this.ongletservice.updateOnglet(ongletForm.value, this.id);
        this.admin.showNotification('Onglet modifié !');
      } else {
        this.ongletservice.addOnglet('Normal', ongletForm.value);
        this.admin.showNotification("L'onglet a été créé");
      }

      this.router.navigate(['dashboard/onglets']);
    } else {
      this.admin.showNotification('Il y a des erreurs dans le formulaire!');
    }
  }

  delete() {
    this.ongletservice.deleteOnglet(this.id);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this.ongletservice.getOnglet(this.id).subscribe((o) => (this.onglet = o));
  }
}
