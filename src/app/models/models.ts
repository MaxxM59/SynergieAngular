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
  st2?: any;
  st3?: any;
  st4?: any;
  st5?: any;
  pa1: string;
  pa2?: any;
  pa3?: any;
  pa4?: any;
  pa5?: any;
  image: string;
}
export interface Admin {
  mail: string;
  password: string;
}
