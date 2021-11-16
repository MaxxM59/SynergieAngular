import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Onglet } from 'src/app/models/models';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';
import { FlashMessagesService } from 'flash-messages-angular';
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
    lien: '',
    type: '',
  };
  constructor(
    public ongletservice: OngletsService,
    private router: Router,
    private route: ActivatedRoute,
    private flash: FlashMessagesService
  ) {}
  save(playerForm: NgForm) {
    if (playerForm.valid) {
      if (this.id) {
        this.ongletservice.updateOnglet(playerForm.value, this.id);
        this.flash.show('Onglet modifié !', {
          cssClass: 'alert alert-primary',
          setTimeout: 4000,
        });
      } else {
        this.ongletservice.addOnglet(playerForm.value);
        this.flash.show("L'onglet a été créé", {
          cssClass: 'alert alert-success',
          setTimeout: 4000,
        });
      }

      this.router.navigate(['/']);
    } else {
      this.flash.show('Il y a des erreurs dans le formulaire!', {
        cssClass: 'alert alert-danger',
        setTimeout: 4000,
      });
    }
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this.ongletservice.getOnglet(this.id).subscribe((o) => (this.onglet = o));
  }
}
