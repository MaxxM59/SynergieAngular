import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  Validators,
  FormGroup,
  FormControl,
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/models';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { NotificationService } from 'src/app/services/Admin/notification.service';
@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  isHide = true;
  formValid = false;
  admins: Admin[] = [];

  constructor(
    private router: Router,
    private admin: AdminLoginService,
    private notif: NotificationService
  ) {}

  // FORM DE LOGIN ADMIN
  loginForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  // RECUPERE MAIL
  get email(): AbstractControl | null {
    return this.loginForm.get('mail');
  }
  // RECUPERE PASSWORD
  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  // FONCTION CONNEXION
  Connexion() {
    if (this.loginForm.valid) {
      this.formValid = true;

      for (let i = 0; i < this.admins.length; i++) {
        if (this.loginForm.value.mail === this.admins[i].mail) {
          this.admin.auth = true;
          this.router.navigate(['dashboard']);
        } else {
          this.formValid = false;
          this.notif.showNotification(
            `Une erreur s'est produite, il y a une erreur dans l'email ou le mot de passe.`
          );
        }
      }
    }
  }
  ngOnInit(): void {
    this.admin.getAdmins().subscribe((a: Admin[]) => {
      this.admins = a;
    });
  }
}
