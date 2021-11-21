import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { ArticleService } from 'src/app/services/Admin/Editing/article.service';



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent  implements OnInit {
  constructor(
    public article: ArticleService,
    private admin: AdminLoginService,
    private router: Router
  ) {}

  articles: Article[] = [];

  ngOnInit(): void {
    this.article.getArticles().subscribe((a: Article[]) => {
      this.articles = a;
    });
    console.log(this.article);
  }

  delete($id: string) {
    this.article.deleteArticle($id);
    this.admin.showNotification('Page supprimée !');
  }
}

