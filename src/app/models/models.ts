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
  linked: any;
}
export interface Page {
  id: string;
  titre: string;
  pres: string;
  // SOUS TITRES
  st1: null;
  st2: null;
  st3: null;
  st4: null;
  st5: null;
  // PARAGRAPHES
  pa1: string;
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

export interface MiseenPage {
  id: string;
  titrepolice: null;
  titrecouleur: null;
  titredecoration: null;
  prescouleur: null;
  prespolice: null;
  presdecoration: null;
  // SOUS TITRES

  st1police: null;
  st1couleur: null;
  st1decoration: null;
  st2police: null;
  st2couleur: null;
  st2decoration: null;
  st3police: null;
  st3couleur: null;
  st3decoration: null;
  st4police: null;
  st4couleur: null;
  st4decoration: null;
  st5police: null;
  st5couleur: null;
  st5decoration: null;

  // PARAGRAPHES
  pa1police: null;
  pa1couleur: null;
  pa1decoration: null;
  pa2police: null;
  pa2couleur: null;
  pa2decoration: null;
  pa3police: null;
  pa3couleur: null;
  pa3decoration: null;
  pa4police: null;
  pa4couleur: null;
  pa4decoration: null;
  pa5police: null;
  pa5couleur: null;
  pa5decoration: null;
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
