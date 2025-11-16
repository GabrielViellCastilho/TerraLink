import { z } from "zod";

export const CreatePaisSchema = z.object({
  nome: z.string("O nome do país é obrigatório"),
  populacao: z
    .number("A população é obrigatória")
    .int("A população deve ser um número inteiro")
    .positive("A população deve ser um número positivo"),
  idioma_oficial: z.string("O idioma oficial é obrigatório"),
  moeda: z.string("A moeda é obrigatória"),
  id_continente: z
    .number("O ID do continente é obrigatório")
    .int("O ID do continente deve ser um número inteiro")
    .positive("O ID do continente deve ser um número positivo"),
  url_bandeira: z.string().optional(),     
  pib_per_capita: z.number().optional(),  
  inflacao: z.number().optional(),         
});

export const UpdatePaisSchema = z.object({
  nome: z.string("O nome do país é obrigatório"),
  populacao: z
    .number("A população é obrigatória")
    .int("A população deve ser um número inteiro")
    .positive("A população deve ser um número positivo"),
  idioma_oficial: z.string("O idioma oficial é obrigatório"),
  moeda: z.string("A moeda é obrigatória"),
  id_continente: z
    .number("O ID do continente é obrigatório")
    .int("O ID do continente deve ser um número inteiro")
    .positive("O ID do continente deve ser um número positivo"),
  url_bandeira: z.string().optional(),
  pib_per_capita: z.number().optional(),
  inflacao: z.number().optional(),
});


export type CreatePaisSchema = z.infer<typeof CreatePaisSchema>;
export type UpdatePaisSchema = z.infer<typeof UpdatePaisSchema>;
