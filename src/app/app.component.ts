import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const app = initializeApp(environment.firebaseConfig);

    initializeFirestore(app, {
      ignoreUndefinedProperties: true,
    });
    /*admin.initializeApp();
    admin.firestore().settings({ ignoreUndefinedProperties: true });*/
  }
}
