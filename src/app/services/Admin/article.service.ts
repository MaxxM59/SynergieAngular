import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private afs: AngularFirestore) {}

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

  addArticle(article: Article): void {
    this.afs.collection<Article>('articles').add(article);
  }
  updateArticle(article: Article, articleId: string): void {
    this.afs.collection<Article>('articles').doc(articleId).update(article);
  }
  deletePlayer(articleId: string): void {
    this.afs.collection<Article>('articles').doc(articleId).delete();
  }
}
