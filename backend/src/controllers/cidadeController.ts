import { Request, Response, NextFunction } from "express";
import { CidadeService } from "../services/cidadeService";
import { CreateCidadeSchema, UpdateCidadeSchema } from "../schemas/cidadeSchema";
import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";

export class CidadeController {
  private cidadeService: CidadeService;

  constructor(cidadeService: CidadeService) {
    this.cidadeService = cidadeService;
  }

  addCidade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método addCidade");

      const data = CreateCidadeSchema.parse(req.body);
      logger.info("[CONTROLLER] - Dados validados com sucesso:", data);

      const response = await this.cidadeService.addCidade(data);

      logger.info("[CONTROLLER] - Cidade criada com sucesso:", response);
      return res.status(201).json(response);
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao adicionar cidade:", error);
      return next(error);
    }
  };

  getAllCidades = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método getAllCidades");

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const paisId = req.query.paisId ? parseInt(req.query.paisId as string) : undefined;
      const continenteId = req.query.continenteId ? parseInt(req.query.continenteId as string) : undefined;

      logger.info(`[CONTROLLER] - Parâmetros => page: ${page}, limit: ${limit}, paisId: ${paisId}, continenteId: ${continenteId}`);

      const response = await this.cidadeService.getAllCidades(page, limit, paisId, continenteId);

      logger.info("[CONTROLLER] - Lista de cidades retornada com sucesso");
      return res.status(200).json(response);
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao listar cidades:", error);
      return next(error);
    }
  };

  getCidadeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método getCidadeById");

      if (!req.params.id) {
        throw new AppError("Informe o ID da cidade", 400);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new AppError("ID inválido", 400);
      logger.info("[CONTROLLER] - ID da cidade recebido:", id);

      const response = await this.cidadeService.getCidadeById(id);
      if (!response) throw new AppError("Cidade não encontrada", 404);

      logger.info("[CONTROLLER] - Cidade encontrada:", response);
      return res.status(200).json(response);
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao buscar cidade por ID:", error);
      return next(error);
    }
  };

  updateCidade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método updateCidade");

      if (!req.params.id) {
        throw new AppError("Informe o ID da cidade", 400);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new AppError("ID inválido", 400);
      logger.info("[CONTROLLER] - ID da cidade recebido:", id);

      const data = UpdateCidadeSchema.parse(req.body);
      logger.info("[CONTROLLER] - Dados validados com sucesso:", data);

      const response = await this.cidadeService.updateCidade(id, data);

      logger.info("[CONTROLLER] - Cidade atualizada com sucesso:", response);
      return res.status(200).json(response);
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao atualizar cidade:", error);
      return next(error);
    }
  };

  deleteCidade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método deleteCidade");

      if (!req.params.id) {
        throw new AppError("Informe o ID da cidade", 400);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new AppError("ID inválido", 400);
      logger.info("[CONTROLLER] - ID da cidade recebido:", id);

      const response = await this.cidadeService.deleteCidade(id);

      logger.info("[CONTROLLER] - Cidade deletada com sucesso:", response);
      return res.status(200).json({ message: "Cidade deletada com sucesso", response });
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao deletar cidade:", error);
      return next(error);
    }
  };

  getCidadeCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req
      logger.info("[CONTROLLER] - Contando cidades");

      const result = await this.cidadeService.getCidadeCount();

      return res.status(200).json(result);

    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao contar cidades:", error);
      return next(error);
    }
  };

}
