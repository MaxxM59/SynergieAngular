import { Component, OnInit } from '@angular/core';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';
import { Onglet } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-onglets',
  templateUrl: './onglets.component.html',
  styleUrls: ['./onglets.component.scss'],
})
export class OngletsComponent implements OnInit {
  constructor(
    public ongletservice: OngletsService,
    private admin: AdminLoginService,
    private router: Router
  ) {}
  onglet: Onglet = {
    id: '',
    titre: '',
    dossier: '',
    type: '',
    lien: '0',
    position: 0,
  };
  onglets: Onglet[] = [];

  delete($id: string) {
    this.ongletservice.deleteOnglet($id);
  }
  ngOnInit(): void {
    this.ongletservice.getOnglets().subscribe((o: Onglet[]) => {
      this.onglets = o;
    });
  }
}
