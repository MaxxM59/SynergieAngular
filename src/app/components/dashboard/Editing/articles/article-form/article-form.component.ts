import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { Article } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { ArticleService } from 'src/app/services/Admin/Editing/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  id: string = '';
  editor!: Editor;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];
  html!: '';

  article: Article = {
    id: '',
    titre: '',
    contenu: '',
    image: '',
    payload: undefined,
  };

  constructor(
    public articleservice: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminLoginService
  ) {}

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
  
  delete() {
    this.articleservice.deleteArticle(this.id);
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this.articleservice
        .getArticle(this.id)
        .subscribe((a) => (this.article = a));
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
