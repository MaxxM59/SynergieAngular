export interface Article {
  id: string;
  titre: string;
  contenu: string;
  image: string;
}
export interface Onglet {
  id: string;
  titre: string;
  type: string;
  lien: string;
}
export interface Page {
  id: string;
  titre: string;
  contenu: string;
  chemin: string;
}
