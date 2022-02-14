export interface Article {
  id: string;
  titre: string;
  contenu: string;
  image: string;
}
export interface Onglet {
  id: string;
  titre: string;
  dossier: null;
  type: string;
  lien: string;
  position: number;
}
export interface Page {
  // CHAMPS OBLIGATOIRES
  id: string;
  titre: string;
  pres: string;
  pa1: string;
  // SOUS TITRES
  st1: null;
  st2: null;
  st3: null;
  st4: null;
  st5: null;
  // PARAGRAPHES

  pa2: null;
  pa3: null;
  pa4: null;
  pa5: null;
  //IMAGES
  image1: null;
  image2: null;
  image3: null;
  // LIEN BAS DE PAGE
  lien: null;
  nomlien: null;
}
export interface Admin {
  mail: string;
  password: string;
}
export interface Contact {
  id: string;
  name: string;
  surname: string;
  mail: string;
  phone: string;
  content: string;
  subject: string;
}
