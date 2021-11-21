import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from './services/AuthGuard/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {}
}
