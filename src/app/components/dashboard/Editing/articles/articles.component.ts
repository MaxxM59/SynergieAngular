import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/models';
import { ArticleService } from 'src/app/services/Admin/Editing/article.service';



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent  implements OnInit {
  constructor(public article: ArticleService) {}
  articles: Article[] = [];

  ngOnInit(): void {
    this.article.getArticles().subscribe((a: Article[]) => {
      this.articles = a;
    });
    console.log(this.article);
  }
}

