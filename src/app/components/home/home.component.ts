import { NgSwitchDefault } from '@angular/common';
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
  constructor(
    public articleService: ArticleService,
    private admin: AdminLoginService,
    private router: Router
  ) {}

  articles: Article[] = [];
<<<<<<< HEAD

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((a: Article[]) => {
      this.articles = a;
      this.articleService.triArticles(this.articles);
=======
  active: any;
  items: any;
  ngOnInit(): void {
    this.articleService.getArticles().subscribe((a: Article[]) => {
      this.articles = a;
      this.active = this.articles[0];
      this.items = this.articles.slice(1);
>>>>>>> parent of 85165b0b (8h56 25/11/2021)
    });

    console.log(this.articles);
  }
}
