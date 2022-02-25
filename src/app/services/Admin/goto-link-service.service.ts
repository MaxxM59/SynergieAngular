import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GotoLinkServiceService {
  // OUVRE lA PAGE DANS UNE NOUVELLE FENETRE
  goToLink(url: string) {
    window.open(url, '_blank');
  }
  constructor() {}
}
