import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/models';
@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  constructor() {}

  mail = '';
  password = '';
  wrongCredentials = false;
  // LOG ADMIN
  adminLog() {}
  loginForm = document.querySelector('#adminlogin');

  ngOnInit(): void {}
}
