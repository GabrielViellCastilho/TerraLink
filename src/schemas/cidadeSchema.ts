import { z } from "zod";

export const CreateCidadeSchema = z.object({
  nome: z.string("O nome da cidade é obrigatório" ),
  populacao: z.number("A população é obrigatória" ).int().positive(),
  latitude: z.number("A latitude é obrigatória" ),
  longitude: z.number("A longitude é obrigatória" ),
  id_pais: z.number("O ID do país é obrigatório" ).int().positive(),
});

export const UpdateCidadeSchema = z.object({
  nome: z.string("O nome da cidade é obrigatório" ),
  populacao: z.number("A população é obrigatória" ).int().positive(),
  latitude: z.number("A latitude é obrigatória" ),
  longitude: z.number("A longitude é obrigatória" ),
  id_pais: z.number("O ID do país é obrigatório" ).int().positive(),
});

export type CreateCidadeSchema = z.infer<typeof CreateCidadeSchema>;
export type UpdateCidadeSchema = z.infer<typeof UpdateCidadeSchema>;
