export interface CountryData {
  name: string | null;
  cca2: string | null;
  currencySymbol: string | null;
  subregion: string | null;
  language: string | null;
  population: number | null;
  flagUrl: string | null;
  gdpPerCapita: number | null;
  inflation: number | null;
}

export interface Currency {
  symbol?: string;
  name?: string;
}


export interface ContinenteInfo {
  id: number;
  nome: string;
  descricao: string;
}


export interface Pais {
  id: number;
  nome: string;
  populacao: number;
  idioma_oficial: string;
  moeda: string;
  id_continente: number;
  url_bandeira?: string | null;
  pib_per_capita?: number | null;
  inflacao?: number | null;
  continente: ContinenteInfo;
}


export interface PaisesResponse {
  data: Pais[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}