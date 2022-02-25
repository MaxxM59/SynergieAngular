import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminLoginService } from 'src/app/services/Admin/admin-login.service';
import { GotoLinkServiceService } from 'src/app/services/Admin/goto-link-service.service';

@Input()
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    public admin: AdminLoginService,
    public gotolink: GotoLinkServiceService,
    private breakpointObserver: BreakpointObserver
  ) {}
}
