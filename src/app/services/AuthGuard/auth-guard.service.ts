import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/';
import { Injectable } from '@angular/core';
import { AdminLoginService } from '../Admin/admin-login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    public adminloginservice: AdminLoginService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.adminloginservice.auth) {
      return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
    }
  }
}
