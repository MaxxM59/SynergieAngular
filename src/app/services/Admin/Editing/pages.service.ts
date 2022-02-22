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
  page: Page = {
    id: '',
    titre: '',
    pres: '',
    st1: null,
    pa1: '',
    st2: null,
    st3: null,
    st4: null,
    st5: null,
    pa2: null,
    pa3: null,
    pa4: null,
    pa5: null,
    image1: null,
    image2: null,
    image3: null,
    lien: null,
    nomlien: null,
  };

  // RECUPERE TOUTES LES PAGES
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

  //RECUPERE UNE PAGE
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

  // REMPLACE LES CHAMPS UNDEFINED PAR NULL
  setNulls(page: any) {
    for (let [key, value] of Object.entries(page)) {
      if (value === undefined || String(value).length === 0) {
        page[key] = null;
      }
    }
  }

  //AJOUTE UNE PAGE
  addPage(page: Page): void {
    this.setNulls(page);
    this.afs.collection<Page>('pages').add(page);
  }
  // MODIFIE LA PAGE
  updatePage(page: Page, pageId: string): void {
    this.afs.collection<Page>('pages').doc(pageId).update(page);
  }
  // SUPPRIME LA PAGE
  deletePage(pageId: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette page?')) {
      this.afs.collection<Page>('pages').doc(pageId).delete();
      this.admin.showNotification('Page supprimée !');
      this.router.navigate(['dashboard/pages']);
    }
  }
}
