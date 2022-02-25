import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/models';
import { PagesService } from 'src/app/services/Admin/Editing/pages.service';
import { GotoLinkServiceService } from 'src/app/services/Admin/goto-link-service.service';
import { NotificationService } from 'src/app/services/Admin/notification.service';
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
  checktitre: boolean = true;
  constructor(
    public pagesservice: PagesService,
    private router: Router,
    private route: ActivatedRoute,
    public notif: NotificationService,
    public gotolink: GotoLinkServiceService
  ) {}

  // FONCTION LANCEE QUAND ON CLIQUE SUR ENREGISTRER
  save(pageForm: NgForm) {
    if (pageForm.valid) {
      if (this.page.id) {
        // SI L'ONGLET EXISTE DEJA
        this.pagesservice.updatePage(pageForm.value, this.id);
        this.notif.showNotification('Page modifiée !');
        this.router.navigate(['dashboard/pages']);
      } else {
        // VERIFICATION SI LE TITRE EXISTE DEJA
        for (var i = 0; i < Object.keys(this.pages).length; i++) {
          if (this.pages[i].titre === pageForm.value.titre) {
            this.checktitre = false;
          }
        }
        if (this.checktitre === true) {
          // SI C'EST UN NOUVEL ONGLET
          this.pagesservice.addPage(pageForm.value);
          this.notif.showNotification('La page a été créé');
          this.router.navigate(['dashboard/pages']);
        } else {
          this.notif.showNotification('Ce titre de page est déja utilisé !');
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
    this.pagesservice.deletePage(this.id);
  }
  ngOnInit(): void {
    // REMPLIS LE FORMULAIRE AVEC LES DONNEES DE LA PAGE SI ELLE EXISTE
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id) {
      this.pagesservice.getPage(this.id).subscribe((p) => (this.page = p));
    }
    // RECUPERE TOUTES LES PAGES
    this.pagesservice.getPages().subscribe((p: Page[]) => {
      this.pages = p;
    });
  }
}
