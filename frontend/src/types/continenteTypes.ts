import { z } from "zod";
import { CreateContinenteSchema } from "../schemas/continenteSchema";

export type CreateContinenteDTO = z.infer<typeof CreateContinenteSchema>;

export interface Continente {
  id: number;
  nome: string;
  descricao: string;
  paises: number[];
}

export interface ContinenteResponse {
  data: Continente[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

