export interface Article {
  payload: any;
  id: string;
  titre: string;
  contenu: string;
  image: any;
}
export interface Onglet {
  id: string;
  titre: string;
  dossier: string;
  type: string;
  lien: string;
  position: number;
}
export interface Page {
  id: string;
  // CONTENU
  titre: string;
  pres: string;
  st1: string;
  st2: string;
  st3: string;
  st4: string;
  st5: string;
  pa1: string;
  pa2: string;
  pa3: string;
  pa4: string;
  pa5: string;
  image1: string;
  image2: string;
  image3: string;

  lien: string;
  nomlien: string;
}
export interface Admin {
  mail: string;
  password: string;
}
