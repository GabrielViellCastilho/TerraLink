import { z } from "zod";

export const CreateContinenteSchema = z.object({
  nome: z.string(),
  descricao: z.string(),
  paises: z.array(z.number()),
});

export type CreateContinente = z.infer<typeof CreateContinenteSchema>;
