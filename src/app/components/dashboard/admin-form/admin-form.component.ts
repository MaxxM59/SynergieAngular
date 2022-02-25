import { Component } from '@angular/core';
import {
  AbstractControl,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { NotificationService } from 'src/app/services/Admin/notification.service';
@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent {
  isHide = true;
  formValid = false;

  constructor(
    private router: Router,
    private authService: AdminLoginService,
    private notif: NotificationService
  ) {}

  // FORM DE LOGIN ADMIN
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  // RECUPERE MAIL
  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }
  // RECUPERE PASSWORD
  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  // FONCTION CONNEXION
  async Connexion(): Promise<void> {
    if (this.loginForm.valid) {
      this.formValid = true;
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      try {
        //SUCCES
        await this.authService.login(email, password);
        this.authService.auth = true;
        this.router.navigate(['dashboard']);
      } catch (error) {
        //ERREUR
        this.formValid = false;
        this.notif.showNotification(
          `Une erreur s'est produite, il y a une erreur dans l'email ou le mot de passe.`
        );
      }
    }
  }
}
