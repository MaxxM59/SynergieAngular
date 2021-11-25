import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../../../models/models';
import { AdminLoginService } from '../admin-login.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(
    private afs: AngularFirestore,
    private admin: AdminLoginService,
    private router: Router
  ) {}

  getArticles(): Observable<Article[]> {
    //POUR A VOIR L'ID
    return this.afs
      .collection<Article>('articles')
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
  // TRI
  active: any;
  items: any;
  description: any;
  triArticles(tab: Article[]) {
    tab = _.sortBy(tab, ['position']);
    this.active = tab[0];
    this.description = tab[1];
    this.items = tab.slice(1, 2);
  }
  //RECUPERE UN ARTICLE
  getArticle(id: string): Observable<Article> {
    return this.afs
      .collection<Article>('articles')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          if (action.payload.exists === false) {
            return new Object() as Article;
          } else {
            const data = action.payload.data() as Article;
            data.id = action.payload.id;
            return data;
          }
        })
      );
  }
  //AJOUTE UN ARTICLE
  addArticle(article: Article): void {
    this.afs.collection<Article>('articles').add(article);
  }
  // MODIFIE L'ARTICLE
  updateArticle(article: Article, articleId: string): void {
    this.afs.collection<Article>('articles').doc(articleId).update(article);
  }
  // SUPPRIME L'ARTICLE
  deleteArticle(articleId: string): void {
    if (confirm('Voulez-vous vraiment supprimer cet article?')) {
      this.afs.collection<Article>('articles').doc(articleId).delete();
      this.admin.showNotification('Article supprimé !');
      this.router.navigate(['dashboard/articles']);
    } else {
      this.router.navigate(['articles-form/{{o.id}}']);
    }
  }
}
