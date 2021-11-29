export interface Article {
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
  titre: string;
  pres: string;
  // SOUS TITRES
  st1: string;
  st2: string;
  st3: string;
  st4: string;
  // PARAGRAPHES
  st5: string;
  pa1: string;
  pa2: string;
  pa3: string;
  pa4: string;
  pa5: string;
  //IMAGES
  image1: string;
  image2: string;
  image3: string;
  // LIEN BAS DE PAGE
  lien: string;
  nomlien: string;
}
export interface Admin {
  mail: string;
  password: string;
}
