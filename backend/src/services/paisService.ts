import { prisma } from "../config/prisma";
import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";
import { CreatePaisSchema, UpdatePaisSchema } from "../schemas/paisSchema";

export class PaisService {

  async addPais(data: CreatePaisSchema) {
    try {
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
          url_bandeira: data.url_bandeira ?? null,
          pib_per_capita: data.pib_per_capita ?? null,
          inflacao: data.inflacao ?? null,
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
          url_bandeira: data.url_bandeira ?? null,
          pib_per_capita: data.pib_per_capita ?? null,
          inflacao: data.inflacao ?? null,
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

  async getAllPaises(
    page: number = 1,
    limit: number = 10,
    filters?: { id_continente?: number; idioma_oficial?: string }
  ) {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.id_continente) where.id_continente = filters.id_continente;
    if (filters?.idioma_oficial) where.idioma_oficial = filters.idioma_oficial;

    try {
      const [paises, total] = await Promise.all([
        prisma.pais.findMany({
          skip,
          take: limit,
          include: { continente: true },
          orderBy: { id: "asc" },
          where,
        }),
        prisma.pais.count({ where }),
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
  async getPaisCount() {
    try {
      const total = await prisma.pais.count();

      logger.info(`[Service] Total de países: ${total}`);

      return { total };
    } catch (error: any) {
      logger.error(`[Service] Erro ao contar países: ${error.message}`);
      throw error;
    }
  }

    async getTop5PibPerCapita() {
    try {
      const result = await prisma.pais.findMany({
        orderBy: { pib_per_capita: "desc" },
        take: 5,
        include: { continente: true }
      });

      logger.info("[Service] Retornando top 5 países por PIB per capita");
      return result;
    } catch (error: any) {
      logger.error(`[Service] Erro ao buscar top PIB: ${error.message}`);
      throw error;
    }
  }

  async getTop5Inflacao() {
    try {
      const result = await prisma.pais.findMany({
        orderBy: { inflacao: "desc" },
        take: 5,
        include: { continente: true }
      });

      logger.info("[Service] Retornando top 5 países por inflação");
      return result;
    } catch (error: any) {
      logger.error(`[Service] Erro ao buscar top inflação: ${error.message}`);
      throw error;
    }
  }

  async getTotalPopulation() {
  try {
    const result = await prisma.pais.aggregate({
      _sum: {
        populacao: true
      }
    });

    return result._sum.populacao || 0;
  } catch (error: any) {
    logger.error(`[Service] Erro ao calcular população total: ${error.message}`);
    throw error;
  }
}


}
