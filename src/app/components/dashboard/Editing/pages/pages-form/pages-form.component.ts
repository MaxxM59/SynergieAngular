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
    image1: '',
    image2: '',
    image3: '',
    pres: '',
    st1: '',
    st2: '',
    st3: '',
    st4: '',
    st5: '',
    pa1: '',
    pa2: '',
    pa3: '',
    pa4: '',
    pa5: '',
    lien: '',
    nomlien: '',
  };

  constructor(
    public pagesservice: PagesService,
    private router: Router,
    private route: ActivatedRoute,
    public admin: AdminLoginService
  ) {}
  // SAUVEGARDE LES DONNEES SI LE FORMULAIRE EST VALIDE
  save(pageForm: NgForm) {
    if (pageForm.valid) {
      if (this.page.id) {
        // SI LA PAGE EXISTE
        this.pagesservice.updatePage(pageForm.value, this.id);
        this.admin.showNotification('Page modifiée !');
      } else {
        // SI C'EST UNE NOUVELLE PAGE
        this.pagesservice.addPage(pageForm.value);
        this.admin.showNotification('La page a été créé');
      }
      // REDIRECTION VERS L'ACCEUIL
      this.router.navigate(['dashboard/pages']);
    } else {
      // SI LE FORMULAIRE N'EST PAS VALIDE
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
