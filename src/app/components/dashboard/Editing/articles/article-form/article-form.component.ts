import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { ArticleService } from 'src/app/services/Admin/Editing/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  // VARIABLES
  id: string = '';
  article: Article = {
    id: '',
    titre: '',
    contenu: '',
    image: '',
  };

  constructor(
    public articleservice: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminLoginService
  ) {}
  // OUVRE l'HEBERGEUR D'IMAGE DANS UNE NOUVELLE FENETRE
  goToLink(url: string) {
    window.open(url, '_blank');
  }
  // SAUVEGARDE DES DONNES SI LE FORMULAIRE EST VALIDE
  save(articleForm: NgForm) {
    if (articleForm.valid) {
      if (this.article.id) {
        this.articleservice.updateArticle(articleForm.value, this.id);
        this.admin.showNotification('Article modifié !');
      } else {
        this.articleservice.addArticle(articleForm.value);
        this.admin.showNotification("L'article à été créé");
      }
      this.router.navigate(['dashboard/articles']);
    } else {
      this.admin.showNotification(
        "Il y a des erreurs dans le formulaire de l'article !"
      );
    }
  }
  // DELETE
  delete() {
    this.articleservice.deleteArticle(this.id);
  }

  ngOnInit(): void {
    // RMPLIS LE FORMULAIRE AVEC LES DONNEES DE L'ARTICLE
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this.articleservice
        .getArticle(this.id)
        .subscribe((a) => (this.article = a));
  }
}
