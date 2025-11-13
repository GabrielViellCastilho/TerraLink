import { prisma } from "../config/prisma";
import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";
import { CreatePaisSchema, UpdatePaisSchema } from "../schemas/paisSchema";

export class PaisService {

  async addPais(data: CreatePaisSchema) {
    try {
      // Verifica se o continente informado existe
      const continente = await prisma.continente.findUnique({
        where: { id: data.id_continente },
      });

      if (!continente) {
        logger.warn(`[Service] Continente com ID ${data.id_continente} não encontrado ao tentar criar país.`);
        throw new AppError(`Continente com ID ${data.id_continente} não encontrado`, 404);
      }

      const response = await prisma.pais.create({
        data: {
          nome: data.nome,
          populacao: data.populacao,
          idioma_oficial: data.idioma_oficial,
          moeda: data.moeda,
          id_continente: data.id_continente,
        },
        include: { continente: true },
      });

      logger.info(`País criado com sucesso: ${response.nome} (ID: ${response.id})`);
      return response;

    } catch (error: any) {
      logger.error(`[Service] Erro ao criar país: ${error.message}`);
      throw error;
    }
  }

  async getAllPaises(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    try {
      const [paises, total] = await Promise.all([
        prisma.pais.findMany({
          skip,
          take: limit,
          include: { continente: true },
          orderBy: { id: "asc" },
        }),
        prisma.pais.count(),
      ]);

      logger.info(`Listando países - Página: ${page}, Total retornado: ${paises.length} de ${total}`);

      if (paises.length === 0) {
        logger.warn(`[Service] Nenhum país encontrado na página ${page}`);
      }

      return {
        data: paises,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };

    } catch (error: any) {
      logger.error(`[Service] Erro ao listar países: ${error.message}`);
      throw error;
    }
  }

  async getPaisById(id: number) {
    try {
      const response = await prisma.pais.findUnique({
        where: { id },
        include: { continente: true, cidades: true },
      });

      if (!response) {
        logger.warn(`[Service] País com ID ${id} não encontrado`);
        throw new AppError(`País com ID ${id} não encontrado`, 404);
      }

      logger.info(`País encontrado: ${response.nome} (ID: ${response.id})`);
      return response;

    } catch (error: any) {
      logger.error(`[Service] Erro ao buscar país ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async updatePais(id: number, data: UpdatePaisSchema) {
    try {
      const response = await prisma.pais.update({
        where: { id },
        data: {
          nome: data.nome,
          populacao: data.populacao,
          idioma_oficial: data.idioma_oficial,
          moeda: data.moeda,
          id_continente: data.id_continente,
        },
      });

      logger.info(`País atualizado com sucesso: ${response.nome} (ID: ${response.id})`);
      return response;

    } catch (error: any) {
      if (error.code === "P2025") {
        logger.warn(`[Service] Nenhum país encontrado com ID ${id} para atualização.`);
        throw new AppError(`País com ID ${id} não encontrado`, 404);
      }

      logger.error(`[Service] Erro ao atualizar país ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async deletePais(id: number) {
    try {
      const response = await prisma.pais.delete({
        where: { id },
      });

      logger.info(`País deletado com sucesso: ID ${id}`);
      return response;

    } catch (error: any) {
      if (error.code === "P2025") {
        logger.warn(`[Service] Nenhum país encontrado com ID ${id} para deletar.`);
        throw new AppError(`País com ID ${id} não encontrado`, 404);
      }

      logger.error(`[Service] Erro ao deletar país ID ${id}: ${error.message}`);
      throw error;
    }
  }
}
