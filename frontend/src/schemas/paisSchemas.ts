

export type CreatePaisDTO = {
  nome: string;
  populacao: number;
  idioma_oficial: string;
  moeda: string;
  id_continente: number;
  url_bandeira?: string;
  pib_per_capita?: number;
  inflacao?: number;
};

export type UpdatePaisDTO = {
  nome: string;
  populacao: number;
  idioma_oficial: string;
  moeda: string;
  id_continente: number;
  url_bandeira?: string;
  pib_per_capita?: number;
  inflacao?: number;
};
