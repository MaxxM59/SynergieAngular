import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Page } from '../../../models/models';
import { AdminLoginService } from '../admin-login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor(
    private afs: AngularFirestore,
    private admin: AdminLoginService,
    private router: Router
  ) {}

  getPages(): Observable<Page[]> {
    //POUR A VOIR L'ID
    return this.afs
      .collection<Page>('pages')
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
  getPage(id: string): Observable<Page> {
    return this.afs
      .collection<Page>('pages')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          if (action.payload.exists === false) {
            return new Object() as Page;
          } else {
            const data = action.payload.data() as Page;
            data.id = action.payload.id;
            return data;
          }
        })
      );
  }
  // RECUPERE UN ARTICLE POUR AFFICHAGE
  getDisplayPage(titre: string): Observable<Page> {
    return this.afs
      .collection<Page>('pages')
      .doc(titre)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          if (action.payload.exists === false) {
            return new Object() as Page;
          } else {
            const data = action.payload.data() as Page;

            data.titre = action.payload.titre;

            return data;
          }
        })
      );
  }

  //AJOUTE UN ARTICLE
  addPage(page: Page): void {
    this.afs.collection<Page>('pages').add(page);
  }
  // MODIFIE L'ARTICLE
  updatePage(page: Page, pageId: string): void {
    this.afs.collection<Page>('pages').doc(pageId).update(page);
  }
  // SUPPRIME L'ARTICLE
  deletePage(pageId: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette page?')) {
      this.afs.collection<Page>('pages').doc(pageId).delete();
      this.admin.showNotification('Page supprimée !');
      this.router.navigate(['dashboard/pages']);
    } else {
      this.router.navigate(['pages-form/{{o.id}}']);
    }
  }
}
