import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { ArticleService } from 'src/app/services/Admin/Editing/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  constructor(
    public articleservice: ArticleService,
    private admin: AdminLoginService,
    private router: Router
  ) {}

  article: Article = {
    id: '',
    titre: '',
    contenu: '',
    image: '',
    position: 0,
    payload: undefined,
  };

  articles: Article[] = [];

  ngOnInit(): void {
    this.articleservice.getArticles().subscribe((a: Article[]) => {
      this.articles = a;
    });
    this.articleservice.triArticles(this.articles);
  }

  delete($id: string) {
    this.articleservice.deleteArticle($id);
    this.admin.showNotification('Article supprimé !');
  }
}
