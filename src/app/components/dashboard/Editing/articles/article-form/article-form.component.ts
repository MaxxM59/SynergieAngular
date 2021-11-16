import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { ArticleService } from 'src/app/services/Admin/Editing/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  id:string ='';

  article: Article = {
    id: '',
    titre: '',
    image: '',
    contenu: '',
    payload: undefined
  }

  constructor(
    public articleservice: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminLoginService
  ) {}

  save(articleForm: NgForm) {
    if(articleForm.valid) {
      if (this.id) {
        this.articleservice.updateArticle(articleForm.value, this.id);
        this.admin.showNotification('Article modifié !');
      } else {
        this.articleservice.addArticle(articleForm.value);
        this.admin.showNotification("L'article à été créé")
      }
    }
  }

  ngOnInit(): void {
  }

}
