import { Component, OnInit } from '@angular/core';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';
import { Onglet } from 'src/app/models/models';

@Component({
  selector: 'app-dash-onglets',
  templateUrl: './onglets.component.html',
  styleUrls: ['./onglets.component.scss'],
})
export class OngletsComponent implements OnInit {
  constructor(public ongletservice: OngletsService) {}

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
    this.ongletservice.deleteOnglet($id);
  }
  ngOnInit(): void {
    this.ongletservice.getOnglets().subscribe((o: Onglet[]) => {
      this.onglets = o;
    });

    this.ongletservice.tri(this.onglets);
    console.log(this.onglets);
  }
}
