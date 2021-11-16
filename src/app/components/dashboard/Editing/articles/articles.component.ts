import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Article } from 'src/app/models/models';
import { ArticleService } from 'src/app/services/Admin/Editing/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  id: string = '';

  article: Article = {
    id: '',
    contenu: '',
    payload: undefined,
    titre: '',
    image: ''
  };

  constructor(
    private _articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private _flashmessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this._articleService
        .getArticle(this.id)
        .subscribe((a) => (this.article = a));
  }

  save(articleForm: NgForm) {
    if (articleForm.valid) {
      if (this.id) {
        this._articleService.updateArticle(articleForm.value, this.id);
        this._flashmessage.show('Article Mis à jour', {
          cssClass:'alert alert-primary',
          setTimeout: 4000,
        });
      } else {
        this._articleService.addArticle(articleForm.value);
        this._flashmessage.show('Nouvel article créé', {
          cssClass: 'alert alert-primary',
          setTimeout: 4000,
        });
      }
      this.router.navigate(['/']);
    } else {
      this._flashmessage.show('Il y a des erreurs !', {
        cssClass: 'alert alert-danger',
        setTimeout: 4000,
      });
    }
  }
  delete(){
    if (confirm('Etes vous certain de vouloir suprrimer ?')) {
      this._articleService.deleteArticle(this.id);
      this._flashmessage.show('Article supprimer', {
        cssClass: 'alert alert-danger',
        setTimeout: 4000,
      });
      this.router.navigate(['/']);
    }
  }
}

