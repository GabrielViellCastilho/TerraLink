import { prisma } from "../config/prisma"
import { AppError } from "../errors/AppError";
import { CreateContinente, UpdateContinenteSchema } from "../schemas/continenteSchema";
import { logger } from "../utils/logger";

export class ContinenteService{

  async addContinente(data: CreateContinente) {
    try {
      const response = await prisma.continente.create({
        data: {
          nome: data.nome,
          descricao: data.descricao,
          paises: {
            connect: data.paises?.map((id) => ({ id })),
          },
        },
      });

      logger.info(`Continente criado com sucesso: ${response.nome} (ID: ${response.id})`);
      return response;
    } catch (error: any) {
      logger.error(`[Service] Erro ao criar continente: ${error.message}`);
      throw error;
    }
  }

  async addPaisAoContinente(continenteId: number, paisId: number) {
    try {
      const response = await prisma.continente.update({
        where: { id: continenteId },
        data: {
          paises: {
            connect: { id: paisId },
          },
        },
        include: { paises: true },
      });

      logger.info(`País (ID: ${paisId}) adicionado ao continente (ID: ${continenteId})`);
      return response;
    } catch (error: any) {

    if (error.code === "P2025") {
      logger.warn(`[Service] Não foi possível associar o país (ID: ${paisId}) ao continente (ID: ${continenteId}). Um dos registros não existe.`);
      throw new AppError(`Continente ou país informado não encontrado`, 404);
    }

      logger.error(`[Service] Erro ao adicionar país ${paisId} ao continente ${continenteId}: ${error.message}`);
      throw error;
    }
  }

async getOrCreateContinentId(nome: string){
    try {
      const existing = await prisma.continente.findFirst({
        where: { nome },
      });

      if (existing) {
        logger.info(`Continente encontrado: ${existing.nome} (ID: ${existing.id})`);
        return existing.id;
      }

      const created = await prisma.continente.create({
        data: {
          nome: nome,
          descricao: `Continent created automatically for ${nome}`,
          paises: { connect: [] },
        },
      });

      logger.info(`Continente criado com sucesso: ${created.nome} (ID: ${created.id})`);
      return created.id;

    } catch (error: any) {
      logger.error(`[Service] Erro ao criar ou buscar continente: ${error.message}`);
      throw error;
    }
  }

  async getAllContinentes(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    try {
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

      logger.info(`Listando continentes - Página: ${page}, Total retornado: ${continentes.length} de ${total}`);

      if (continentes.length === 0) {
        logger.warn(`[Service] Nenhum continente encontrado na página ${page}`);
      }

      return {
        data: continentes,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error: any) {
      logger.error(`[Service] Erro ao listar continentes: ${error.message}`);
      throw error;
    }
  }

  async getContinenteById(id: number) {
    try {
      const response = await prisma.continente.findUnique({
        where: { id },
        include: {
          paises: true,
        },
      });

      if (!response) {
        logger.warn(`[Service] Continente com ID ${id} não encontrado`);
        return null;
      }

      logger.info(`Continente encontrado: ${response.nome} (ID: ${response.id})`);
      return response;
    } catch (error: any) {
      logger.error(`[Service] Erro ao buscar continente ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async updateContinente(id: number, data: UpdateContinenteSchema) {
    try {
      const response = await prisma.continente.update({
        where: { id },
        data: {
          nome: data.nome,
          descricao: data.descricao,
        },
      });

      logger.info(`Continente atualizado com sucesso: ${response.nome} (ID: ${response.id})`);
      return response;
    } catch (error: any) {
      
      if (error.code === "P2025") {
        logger.warn(`[Service] Nenhum continente encontrado com ID ${id} para atualização.`);
        throw new AppError(`Continente com ID ${id} não encontrado`, 404);
      }

      logger.error(`[Service] Erro ao atualizar continente ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async deleteContinente(id: number) {
    try {
      const response = await prisma.continente.delete({
        where: { id },
      });

      logger.info(`Continente deletado com sucesso: ID ${id}`);
      return response;
    } catch (error: any) {

      if (error.code === "P2025") {
        logger.warn(`[Service] Nenhum continente encontrado com ID ${id} para deletar.`);
        throw new AppError(`Continente com ID ${id} não encontrado`, 404);
      }

      logger.error(`[Service] Erro ao deletar continente ID ${id}: ${error.message}`);
      throw error;
    }
  }

    async getContinenteCount() {
    try {
      const total = await prisma.continente.count();

      logger.info(`[Service] Total de continentes: ${total}`);

      return { total };
    } catch (error: any) {
      logger.error(`[Service] Erro ao contar continentes: ${error.message}`);
      throw error;
    }
  }

}


