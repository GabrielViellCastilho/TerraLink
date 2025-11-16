import { z } from "zod";

export const CreateContinenteSchema = z.object({
  nome: z.string().min(1, "Name is required"),
  descricao: z.string().min(1, "Description is required"),
  paises: z.array(z.number().int().positive()).default([]).optional(),
});
