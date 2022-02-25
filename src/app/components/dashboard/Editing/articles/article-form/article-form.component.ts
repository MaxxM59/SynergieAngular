import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/models';
import { ArticleService } from 'src/app/services/Admin/Editing/article.service';
import { NotificationService } from 'src/app/services/Admin/notification.service';

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
  checktitre: boolean = true;
  constructor(
    public articleservice: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private notif: NotificationService
  ) {}
  // OUVRE l'HEBERGEUR D'IMAGE DANS UNE NOUVELLE FENETRE
  goToLink(url: string) {
    window.open(url, '_blank');
  }

  // FONCTION LANCEE QUAND ON CLIQUE SUR ENREGISTRER
  save(articleForm: NgForm) {
    if (articleForm.valid) {
      if (this.article.id) {
        // SI L'ONGLET EXISTE DEJA
        this.articleservice.updateArticle(articleForm.value, this.id);
        this.notif.showNotification('Article modifié !');
        this.router.navigate(['dashboard/articles']);
      } else {
        // VERIFICATION SI LE TITRE EXISTE DEJA
        for (var i = 0; i < Object.keys(this.articles).length; i++) {
          if (this.articles[i].titre === articleForm.value.titre) {
            this.checktitre = false;
          }
        }
        if (this.checktitre === true) {
          // SI C'EST UN NOUVEL ONGLET
          this.articleservice.addArticle(articleForm.value);
          this.notif.showNotification("L'article a été créé");
          this.router.navigate(['dashboard/articles']);
        } else {
          this.notif.showNotification("Ce titre d'article est déja utilisé !");
        }
      }
    } // SI ERREUR DANS LE FORM
    else {
      this.notif.showNotification('Il y a des erreurs dans le formulaire!');
    }
    this.checktitre = true;
  }
  // DELETE
  delete() {
    this.articleservice.deleteArticle(this.id);
  }

  ngOnInit(): void {
    // RMPLIS LE FORMULAIRE AVEC LES DONNEES DE L'ARTICLE
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id) {
      this.articleservice
        .getArticle(this.id)
        .subscribe((a) => (this.article = a));
    }

    // RECUPERE TOUS LES ARTICLES
    this.articleservice.getArticles().subscribe((a: Article[]) => {
      this.articles = a;
    });
  }
}
