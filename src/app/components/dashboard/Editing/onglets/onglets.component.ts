import { Component, Inject, inject, OnInit } from '@angular/core';
import { OngletsService } from 'src/app/services/Admin/Editing/onglets.service';
import { Onglet } from 'src/app/models/models';

@Component({
  selector: 'app-dash-onglets',
  templateUrl: './onglets.component.html',
  styleUrls: ['./onglets.component.scss'],
})
export class OngletsComponent implements OnInit {
  constructor(public onglet: OngletsService) {}
  onglets: Onglet[] = [];

  ngOnInit(): void {
    this.onglet.getOnglets().subscribe((o: Onglet[]) => {
      this.onglets = o;
    });
    console.log(this.onglets);
  }
}
