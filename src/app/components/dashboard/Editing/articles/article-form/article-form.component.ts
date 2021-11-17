import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
    contenu: '',
    payload: undefined
  }

  constructor(
    public articleservice: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminLoginService,
  ) {}


  save(articleForm: NgForm) {
    if(articleForm.valid) {
      if (this.id !== null) {
        this.articleservice.updateArticle(articleForm.value, this.id);
        this.admin.showNotification('Article modifié !');
      } else {
        this.articleservice.addArticle(articleForm.value);
        this.admin.showNotification("L'article à été créé")
      }
      this.router.navigate(['/articles']);
    } else {
      this.admin.showNotification("Il y a des erreurs dans le formulaire de l'article !");
    }
  }
  delete() {
    this.articleservice.deleteArticle(this.id);
    this.admin.showNotification('Article supprimé');
    this.router.navigate(['articles']);
  } 
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this.articleservice.getArticle(this.id).subscribe((a) => (this.article = a))
  }
  // IMAGE //
  //url; 
	url: any; //Angular 11, for stricter type
	msg = "";
	
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
	}
}
