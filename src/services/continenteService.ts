import { prisma } from "../config/prisma"
import { CreateContinente, UpdateContinenteSchema } from "../schemas/continenteSchema";

export class ContinenteService{

    async addContinente(data: CreateContinente){
        var response = await prisma.continente.create({
        data: {
            nome: data.nome,
            descricao: data.descricao,
            paises: {
            connect: data.paises?.map((id) => ({ id })),
            }
        }
        });

        return response

    };


  async addPaisAoContinente(continenteId: number, paisId: number) {
    const response = await prisma.continente.update({
      where: { id: continenteId },
      data: {
        paises: {
          connect: { id: paisId },
        },
      },
      include: { paises: true },
    });

    return response;
  }


  async getAllContinentes(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [continentes, total] = await Promise.all([
      prisma.continente.findMany({
        skip,
        take: limit,
        include: {
          paises: true,
        },
        orderBy: { id: "asc" },
      }),
      prisma.continente.count(),
    ]);

    return {
      data: continentes,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }


  async getContinenteById(id: number) {
    const response = await prisma.continente.findUnique({
      where: { id },
      include: {
        paises: true,
      },
    });

    return response;
  }

  async updateContinente(id: number, data: UpdateContinenteSchema) {
    const response = await prisma.continente.update({
      where: { id },
      data: {
        nome: data.nome,
        descricao: data.descricao,
      },
    });

    return response;
  }

  async deleteContinente(id: number) {
    const response = await prisma.continente.delete({
      where: { id },
    });

    return response;
  }
}


