import { z } from "zod";

export const CreateContinenteSchema = z.object({
  nome: z.string("O nome é obrigatório").min(1, "O nome é obrigatório"),
  descricao: z.string("A descrição é obrigatória").min(1, "A descrição é obrigatória"),
  paises: z.array(z.number().int().positive()), 
});

export const UpdateContinenteSchema = z.object({
  nome: z.string("O nome é obrigatório").min(1, "O nome é obrigatório"),
  descricao: z.string("A descrição é obrigatória").min(1, "A descrição é obrigatória"),
});

export const AddPaisAoContinente = z.object({
  continenteId: z.number("O continenteId é obrigatório").int().positive({ message: "ID do continente inválido" }).min(1,"O continenteId é obrigatório"),
  paisId: z.number("O paisId é obrigatório").int().positive({ message: "ID do país inválido" }).min(1,"O paisId é obrigatório"),
});

export type CreateContinente = z.infer<typeof CreateContinenteSchema>;
export type UpdateContinenteSchema = z.infer<typeof UpdateContinenteSchema>;
export type AddPaisAoContinente = z.infer<typeof AddPaisAoContinente>;
