import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { PagesService } from 'src/app/services/Admin/Editing/pages.service';
@Component({
  selector: 'app-pages-form',
  templateUrl: './pages-form.component.html',
  styleUrls: ['./pages-form.component.scss'],
})
export class PagesFormComponent implements OnInit {
  // VARIABLES
  id: string = '';
  page: Page = {
    id: '',
    titre: '',
    pres: '',
    st1: null,
    pa1: '',
    image1: null,
    image2: null,
    image3: null,
    st2: null,
    st3: null,
    st4: null,
    st5: null,
    pa2: null,
    pa3: null,
    pa4: null,
    pa5: null,
    lien: null,
    nomlien: null,
  };
  pages: any;
  checktitre: boolean = false;
  constructor(
    public pagesservice: PagesService,
    private router: Router,
    private route: ActivatedRoute,
    public admin: AdminLoginService
  ) {}

  // FONCTION LANCEE QUAND ON CLIQUE SUR ENREGISTRER
  save(pageForm: NgForm) {
    if (pageForm.valid) {
      // VERIFICATION SI LE TITRE EXISTE DEJA
      this.pagesservice.getPages().subscribe((p: Page[]) => {
        this.pages = p;
        if (this.pages.includes(pageForm.value.titre) === true) {
          this.checktitre = false;
        } else {
          this.checktitre = true;
        }
      });
      if (this.checktitre === true) {
        if (this.page.id) {
          // SI L'ONGLET EXISTE DEJA
          this.pagesservice.updatePage(pageForm.value, this.id);
          this.admin.showNotification('Dossier modifié !');
          this.router.navigate(['dashboard/pages']);
        } else {
          // SI C'EST UN NOUVEL ONGLET
          this.pagesservice.addPage(pageForm.value);
          this.admin.showNotification('Le dossier a été créé');
          this.router.navigate(['dashboard/pages']);
        }
      } else {
        this.admin.showNotification('Ce titre de dossier est déja utilisé !');
      }
    } // SI ERREUR DANS LE FORM
    else {
      this.admin.showNotification('Il y a des erreurs dans le formulaire!');
    }
  }

  // DELETE
  delete() {
    this.pagesservice.deletePage(this.id);
  }
  ngOnInit(): void {
    // REMPLIS LE FORMULAIRE AVEC LES DONNEES DE LA PAGE SI ELLE EXISTE
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this.pagesservice.getPage(this.id).subscribe((p) => (this.page = p));
  }
}
