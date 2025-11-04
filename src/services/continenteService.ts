import { prisma } from "../config/prisma"
import { CreateContinente } from "../schemas/continenteSchema";

export class ContinenteService{

    async addContinente(continente: CreateContinente){
        var response = await prisma.continente.create({
        data: {
            nome: continente.nome,
            descricao: continente.descricao,
            paises: {
            connect: continente.paises?.map((id) => ({ id })),
            }
        }
        });

        return response

    };
}

