import { Request, Response, NextFunction } from "express";
import { PaisService } from "../services/paisService";
import { CreatePaisSchema, UpdatePaisSchema } from "../schemas/paisSchema";
import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";

export class PaisController {
  private paisService: PaisService;

  constructor(paisService: PaisService) {
    this.paisService = paisService;
  }

  addPais = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método addPais");

      const data = CreatePaisSchema.parse(req.body);
      logger.info("[CONTROLLER] - Dados validados com sucesso:", data);

      const response = await this.paisService.addPais(data);

      logger.info("[CONTROLLER] - País criado com sucesso:", response);
      return res.status(201).json(response);
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao adicionar país:", error);
      return next(error);
    }
  };

  getAllPaises = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método getAllPaises");

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      logger.info(`[CONTROLLER] - Parâmetros de paginação => page: ${page}, limit: ${limit}`);

      const response = await this.paisService.getAllPaises(page, limit);

      logger.info("[CONTROLLER] - Lista de países retornada com sucesso");
      return res.status(200).json(response);
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao listar países:", error);
      return next(error);
    }
  };

  getPaisById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método getPaisById");

      if (!req.params.id) {
        throw new AppError("Informe o ID do país", 400);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new AppError("ID inválido", 400);
      logger.info("[CONTROLLER] - ID do país recebido:", id);

      const response = await this.paisService.getPaisById(id);
      if (!response) throw new AppError("País não encontrado", 404);

      logger.info("[CONTROLLER] - País encontrado:", response);
      return res.status(200).json(response);
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao buscar país por ID:", error);
      return next(error);
    }
  };

  updatePais = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método updatePais");

      if (!req.params.id) {
        throw new AppError("Informe o ID do país", 400);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new AppError("ID inválido", 400);
      logger.info("[CONTROLLER] - ID do país recebido:", id);

      const data = UpdatePaisSchema.parse(req.body);
      logger.info("[CONTROLLER] - Dados validados com sucesso:", data);

      const response = await this.paisService.updatePais(id, data);

      logger.info("[CONTROLLER] - País atualizado com sucesso:", response);
      return res.status(200).json(response);
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao atualizar país:", error);
      return next(error);
    }
  };

  deletePais = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método deletePais");

      if (!req.params.id) {
        throw new AppError("Informe o ID do país", 400);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new AppError("ID inválido", 400);
      logger.info("[CONTROLLER] - ID do país recebido:", id);

      const response = await this.paisService.deletePais(id);

      logger.info("[CONTROLLER] - País deletado com sucesso:", response);
      return res.status(200).json({ message: "País deletado com sucesso", response });
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao deletar país:", error);
      return next(error);
    }
  };
}
