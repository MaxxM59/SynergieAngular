import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { MiseenPage } from 'src/app/models/models';
import { AdminLoginService } from '../admin-login.service';

@Injectable({
  providedIn: 'root',
})
export class MiseEnPageService {
  constructor(private afs: AngularFirestore) {}
  // REMPLACE LES CHAMPS UNDEFINED PAR NULL
  setNulls(miseenpage: any) {
    for (let [key, value] of Object.entries(miseenpage)) {
      if (
        value === undefined ||
        String(value).length === 0 ||
        value === 'Couleur' ||
        value === 'Police'
      ) {
        miseenpage[key] = null;
      }
    }
  }
  //RECUPERE UNE PAGE
  getMiseenPage(id: string): Observable<MiseenPage> {
    return this.afs
      .collection<MiseenPage>('miseenpage')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          if (action.payload.exists === false) {
            return new Object() as MiseenPage;
          } else {
            const data = action.payload.data() as MiseenPage;
            data.id = action.payload.id;
            return data;
          }
        })
      );
  }
  // MODIFIE LA PAGE
  updateMiseEnPage(miseenpage: MiseenPage, pageId: string): void {
    this.setNulls(miseenpage);
    this.afs
      .collection<MiseenPage>('miseenpage')
      .doc(pageId)
      .update(miseenpage);
  }
}
