import { prisma } from "../config/prisma";
import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";
import { CreateCidadeSchema, UpdateCidadeSchema } from "../schemas/cidadeSchema";

export class CidadeService {

  async addCidade(data: CreateCidadeSchema) {
    try {
      const response = await prisma.cidade.create({
        data: {
          nome: data.nome,
          populacao: data.populacao,
          latitude: data.latitude,
          longitude: data.longitude,
          id_pais: data.id_pais,
        },
        include: { pais: true },
      });

      logger.info(`Cidade criada com sucesso: ${response.nome} (ID: ${response.id})`);
      return response;
    } catch (error: any) {
      logger.error(`[Service] Erro ao criar cidade: ${error.message}`);
      throw error;
    }
  }

  async getAllCidades(
  page: number = 1,
  limit: number = 10,
  paisId?: number,
  continenteId?: number
) {
  const skip = (page - 1) * limit;

  try {
    const where: any = {};
    if (paisId) where.id_pais = paisId;
    if (continenteId) where.pais = { id_continente: continenteId };

    const [cidades, total] = await Promise.all([
      prisma.cidade.findMany({
        skip,
        take: limit,
        include: { pais: true },
        where,
        orderBy: { id: "asc" },
      }),
      prisma.cidade.count({ where }),
    ]);

    logger.info(`Listando cidades - Página: ${page}, Total retornado: ${cidades.length} de ${total}`);

    if (cidades.length === 0) {
      logger.warn(`[Service] Nenhuma cidade encontrada na página ${page}`);
    }

    return {
      data: cidades,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error: any) {
    logger.error(`[Service] Erro ao listar cidades: ${error.message}`);
    throw error;
  }
}


  async getCidadeById(id: number) {
    try {
      const response = await prisma.cidade.findUnique({
        where: { id },
        include: { pais: true },
      });

      if (!response) {
        logger.warn(`[Service] Cidade com ID ${id} não encontrada`);
        throw new AppError(`Cidade com ID ${id} não encontrada`, 404);
      }

      logger.info(`Cidade encontrada: ${response.nome} (ID: ${response.id})`);
      return response;
    } catch (error: any) {
      logger.error(`[Service] Erro ao buscar cidade ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async updateCidade(id: number, data: UpdateCidadeSchema) {
    try {
      const response = await prisma.cidade.update({
        where: { id },
        data: {
          nome: data.nome,
          populacao: data.populacao,
          latitude: data.latitude,
          longitude: data.longitude,
          id_pais: data.id_pais,
        },
      });

      logger.info(`Cidade atualizada com sucesso: ${response.nome} (ID: ${response.id})`);
      return response;
    } catch (error: any) {
      if (error.code === "P2025") {
        logger.warn(`[Service] Nenhuma cidade encontrada com ID ${id} para atualização.`);
        throw new AppError(`Cidade com ID ${id} não encontrada`, 404);
      }

      logger.error(`[Service] Erro ao atualizar cidade ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async deleteCidade(id: number) {
    try {
      const response = await prisma.cidade.delete({
        where: { id },
      });

      logger.info(`Cidade deletada com sucesso: ID ${id}`);
      return response;
    } catch (error: any) {
      if (error.code === "P2025") {
        logger.warn(`[Service] Nenhuma cidade encontrada com ID ${id} para deletar.`);
        throw new AppError(`Cidade com ID ${id} não encontrada`, 404);
      }

      logger.error(`[Service] Erro ao deletar cidade ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async getCidadeCount() {
    try {
      const total = await prisma.cidade.count();

      logger.info(`[Service] Total de cidades: ${total}`);

      return { total };
    } catch (error: any) {
      logger.error(`[Service] Erro ao contar cidades: ${error.message}`);
      throw error;
    }
  }

}
