import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  Validators,
  FormGroup,
  FormControl,
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
  error: boolean = false;
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
  get mail(): AbstractControl | null {
    return this.loginForm.get('mail');
  }
  // RECUPERE PASSWORD
  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  // FONCTION CONNEXION
  Connexion() {
    if (this.loginForm.valid) {
      for (let i = 0; i < this.admins.length - 1; i++) {
        if (
          this.admins[i].mail.includes(this.loginForm.value.mail) &&
          this.admins[i].password.includes(this.loginForm.value.password)
        ) {
          this.admin.auth = true;
          this.router.navigate(['dashboard']);
        } else {
          this.error = true;
        }
      }
      if (this.error) {
        this.notif.showNotification(
          `Une erreur s'est produite, il y a une erreur dans l'email ou le mot de passe.`
        );
      }
    }
  }
  ngOnInit(): void {
    this.admin.getAdmins().subscribe((a: Admin[]) => {
      this.admins = a;
    });
  }
}
