export interface Article {
  payload: any;
  id: string;
  titre: string;
  contenu: string;
  image: string;
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
  emplacementpa1: string;
  emplacementpa2: string;
  emplacementpa3: string;
  emplacementpa4: string;
  emplacementpa5: string;
}
export interface Admin {
  mail: string;
  password: string;
}
