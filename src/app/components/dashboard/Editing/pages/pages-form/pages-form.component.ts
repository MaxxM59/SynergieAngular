import { Component, OnDestroy, OnInit } from '@angular/core';
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
    emplacementpa1: '',
    emplacementpa2: '',
    emplacementpa3: '',
    emplacementpa4: '',
    emplacementpa5: '',
  };

  constructor(
    public pagesservice: PagesService,
    private router: Router,
    private route: ActivatedRoute,
    public admin: AdminLoginService
  ) {}
  save(pageForm: NgForm) {
    if (pageForm.valid) {
      if (this.page.id) {
        this.pagesservice.updatePage(pageForm.value, this.id);
        this.admin.showNotification('Page modifiée !');
      } else {
        this.pagesservice.addPage(pageForm.value);
        this.admin.showNotification('La page a été créé');
      }

      this.router.navigate(['dashboard/pages']);
    } else {
      this.admin.showNotification('Il y a des erreurs dans le formulaire!');
    }
  }

  delete() {
    this.pagesservice.deletePage(this.id);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this.pagesservice.getPage(this.id).subscribe((p) => (this.page = p));
  }
}
