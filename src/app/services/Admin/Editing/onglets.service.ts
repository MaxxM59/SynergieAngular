import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Onglet } from '../../../models/models';

@Injectable({
  providedIn: 'root',
})
export class OngletsService {
  id(id: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private afs: AngularFirestore) {}

  getOnglets(): Observable<Onglet[]> {
    //POUR A VOIR L'ID
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
  //RECUPERE UN ARTICLE
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
  //AJOUTE UN ARTICLE
  addOnglet(onglet: Onglet): void {
    this.afs.collection<Onglet>('onglets').add(onglet);
  }
  // MODIFIE L'ARTICLE
  updateOnglet(onglet: Onglet, ongletId: string): void {
    this.afs.collection<Onglet>('onglets').doc(ongletId).update(onglet);
  }
  // SUPPRIME L'ARTICLE
  deleteOnglet(ongletId: string): void {
    if (confirm('Voulez-vous vraiment supprimer cet élément?')) {
      this.afs.collection<Onglet>('onglets').doc(ongletId).delete();
    }
  }
}
