import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { ArticleService } from 'src/app/services/Admin/Editing/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public article: ArticleService) {}

  articles: Article[] = [];

  ngOnInit(): void {
    this.article.getArticles().subscribe((a: Article[]) => {
      this.articles = a;
    });
    console.log(this.articles);
  }
}
