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

  //AJOUTE UNE PAGE
  addPage(page: Page): void {
    if (page.st1 === undefined || page.st1 === '') {
      page.st1 = null;
    }
    if (page.st2 === undefined || page.st2 === '') {
      page.st2 = null;
    }
    if (page.st3 === undefined || page.st3 === '') {
      page.st3 = null;
    }
    if (page.st4 === undefined || page.st4 === '') {
      page.st4 = null;
    }
    if (page.st5 === undefined || page.st5 === '') {
      page.st5 = null;
    }
    if (page.pa2 === undefined || page.pa2 === '') {
      page.pa2 = null;
    }
    if (page.pa3 === undefined || page.pa3 === '') {
      page.pa3 = null;
    }
    if (page.pa4 === undefined || page.pa4 === '') {
      page.pa4 = null;
    }
    if (page.pa5 === undefined || page.pa5 === '') {
      page.pa5 = null;
    }
    if (page.image1 === undefined || page.image1 === '') {
      page.image1 = null;
    }
    if (page.image2 === undefined || page.image2 === '') {
      page.image2 = null;
    }
    if (page.image3 === undefined || page.image3 === '') {
      page.image3 = null;
    }
    if (page.lien === undefined || page.lien === '') {
      page.lien = null;
    }
    if (page.nomlien === undefined || page.nomlien === '') {
      page.nomlien = null;
    }
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
    } else {
      this.router.navigate(['pages-form/{{o.id}}']);
    }
  }
}
