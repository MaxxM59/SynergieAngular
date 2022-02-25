import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/models';
import { ArticleService } from 'src/app/services/Admin/Editing/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  constructor(
    public articleservice: ArticleService,

    private router: Router
  ) {}
  // VARIABLES
  article: Article = {
    id: '',
    titre: '',
    contenu: '',
    image: '',
  };
  articles: Article[] = [];
  // DELETE
  delete($id: string) {
    this.articleservice.deleteArticle($id);
  }
  ngOnInit(): void {
    // RECUPERE TOUS LES ARTICLES
    this.articleservice.getArticles().subscribe((a: Article[]) => {
      this.articles = a;
    });
  }
}
