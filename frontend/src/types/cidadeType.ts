import type { Pais } from "./paisTypes";

export interface CreateCidadeDTO {
  nome: string;
  populacao: number;
  latitude: number;
  longitude: number;
  id_pais: number;
}

export interface Cidade {
  id: number;
  nome: string;
  populacao: number;
  pais: Pais;
  latitude: number;
  longitude: number;
}

export interface PaginatedCidades {
  data: Cidade[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}