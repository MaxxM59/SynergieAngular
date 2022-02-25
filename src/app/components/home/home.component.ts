import { NgSwitchDefault } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/models';
import { ArticleService } from 'src/app/services/Admin/Editing/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public articleService: ArticleService) {}
  // VARIABLES
  articles: Article[] = [];
  active: any;
  items: any;

  ngOnInit(): void {
    // RECUPERE TOUS LES ARTICLES
    this.articleService.getArticles().subscribe((a: Article[]) => {
      this.articles = a;
      this.active = this.articles[0];
      this.items = this.articles.slice(1);
    });
  }
}
