import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/models';
@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  constructor() {}
  admin: any = {
    mail: '',
    password: '',
  };
  // LOG ADMIN
  adminlog() {}

  ngOnInit(): void {}
}
