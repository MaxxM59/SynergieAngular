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
  articles: any;
  checktitre: boolean = false;
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

  // FONCTION LANCEE QUAND ON CLIQUE SUR ENREGISTRER
  save(articleForm: NgForm) {
    if (articleForm.valid) {
      // VERIFICATION SI LE TITRE EXISTE DEJA
      this.articleservice.getArticles().subscribe((a: Article[]) => {
        this.articles = a;
        if (this.articles.includes(articleForm.value.titre) === true) {
          this.checktitre = false;
        } else {
          this.checktitre = true;
        }
      });
      if (this.checktitre === true) {
        if (this.article.id) {
          // SI L'ONGLET EXISTE DEJA
          this.articleservice.updateArticle(articleForm.value, this.id);
          this.admin.showNotification('Article modifié !');
          this.router.navigate(['dashboard/articles']);
        } else {
          // SI C'EST UN NOUVEL ONGLET
          this.articleservice.addArticle(articleForm.value);
          this.admin.showNotification("L'article' a été créé");
          this.router.navigate(['dashboard/articles']);
        }
      } else {
        this.admin.showNotification("Ce titre d'article' est déja utilisé !");
      }
    } // SI ERREUR DANS LE FORM
    else {
      this.admin.showNotification('Il y a des erreurs dans le formulaire!');
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
