import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Onglet } from '../../../models/models';
import { Router } from '@angular/router';
import { AdminLoginService } from '../admin-login.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class OngletsService {
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private admin: AdminLoginService
  ) {}
  // VARIABLES
  onglet: any;
  dossiers: any;
  dropdowns: any;
  solo: any;
  trionglets: any;
  onglets: any;
  checktitre: boolean | undefined; //TRI DES ONGLETS

  tri(tab: Onglet[]) {
    //ONGLETS DOSSIERS
    this.dossiers = tab.filter((onglet) => onglet.type === 'Dossier');
    // ONGLETS DROPDOWN
    this.dropdowns = tab.filter(
      (onglet) =>
        onglet.dossier !== '' &&
        onglet.dossier !== null &&
        onglet.type === 'Normal'
    );
    // ONGLETS SIMPLES
    this.solo = tab.filter(
      (onglet) =>
        onglet.type === 'Normal' &&
        (onglet.dossier === '' || onglet.dossier === null)
    );
    // TRI EN FONCTION DE LA PROPRIETE 'POSITION'
    this.dropdowns = _.sortBy(this.dropdowns, ['position']);
    this.solo = _.sortBy(this.solo, ['position']);
    this.dossiers = _.sortBy(this.dossiers, ['position']);
  }

  //RECUPERE TOUS LES ONGLETS
  getOnglets(): Observable<Onglet[]> {
    return this.afs
      .collection<Onglet>('onglets')
      .snapshotChanges()
      .pipe(
        map((changes: any) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      );
  }
  //RECUPERE UN ONGLET
  getOnglet(id: string): Observable<Onglet> {
    return this.afs
      .collection<Onglet>('onglets')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          if (action.payload.exists === false) {
            return new Object() as Onglet;
          } else {
            const data = action.payload.data() as Onglet;
            data.id = action.payload.id;
            return data;
          }
        })
      );
  }
  //AJOUTE UN ONGLET
  addOnglet(type: string, onglet: Onglet): void {
    onglet.type = type;
    if (onglet.dossier === '' || onglet.dossier === undefined) {
      onglet.dossier = null;
    }
    this.afs.collection<Onglet>('onglets').add(onglet);
  }
  // MODIFIE UN ONGLET
  updateOnglet(onglet: Onglet, ongletId: string): void {
    this.afs.collection<Onglet>('onglets').doc(ongletId).update(onglet);
  }
  // SUPPRIME UN ONGLET
  deleteOnglet(ongletId: string): void {
    this.afs.collection<Onglet>('onglets').doc(ongletId).delete();
  }
}
