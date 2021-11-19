export interface Article {
  payload: any;
  id: string;
  titre: string;
  contenu: string;
}
export interface Onglet {
  id: string;
  titre: string;
  dossier: string;
  type: string;
}
export interface Page {
  id: string;
  titre: string;
  contenu: string;
  image: string;
}
export interface Admin {
  mail: string;
  password: string;
}
