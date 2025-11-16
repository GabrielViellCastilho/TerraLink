import { Request, Response, NextFunction } from "express";
import { ContinenteService } from "../services/continenteService";
import { AddPaisAoContinente, CreateContinenteSchema, UpdateContinenteSchema} from "../schemas/continenteSchema";
import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";

export class ContinenteController {
  private continenteService: ContinenteService;

  constructor(continenteService: ContinenteService) {
    this.continenteService = continenteService;
  }

  addContinente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método addContinente");

      const continente = CreateContinenteSchema.parse(req.body);
      logger.info("[CONTROLLER] - Dados validados com sucesso:", continente);

      const response = await this.continenteService.addContinente(continente);

      logger.info("[CONTROLLER] - Continente criado com sucesso:", response);
      return res.status(201).json(response);
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao adicionar continente:", error);
      return next(error);
    }
  };

  getOrCreateContinent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método getOrCreateContinent");

      
      const { name } = req.body;
      if (!name || typeof name !== "string") {
        logger.warn("[CONTROLLER] - Nome do continente inválido:", req.body);
        return res.status(400).json({ message: "Invalid continent name" });
      }

      logger.info("[CONTROLLER] - Nome do continente recebido:", name);

      
      const continentId = await this.continenteService.getOrCreateContinentId(name);

      logger.info(`[CONTROLLER] - Continente processado com sucesso: ${name} (ID: ${continentId})`);
      return res.status(200).json({ id: continentId });

    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao processar continente:", error);
      return next(error);
    }
  };


  addPaisAoContinente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método addPaisAoContinente");

      const data = AddPaisAoContinente.parse(req.body);
      logger.info("[CONTROLLER] - Dados validados com sucesso:", data);

      const response = await this.continenteService.addPaisAoContinente(
        data.continenteId,
        data.paisId
      );

      logger.info("[CONTROLLER] - País adicionado ao continente com sucesso:", response);
      return res.status(200).json(response);
    } catch (error) {
      console.error("[CONTROLLER] - Erro ao adicionar país ao continente:", error);
      return next(error);
    }
  };

  getAllContinentes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método getAllContinentes");

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      logger.info(`[CONTROLLER] - Parâmetros de paginação => page: ${page}, limit: ${limit}`);

      const response = await this.continenteService.getAllContinentes(page, limit);

      logger.info("[CONTROLLER] - Lista de continentes retornada com sucesso");
      return res.status(200).json(response);
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao listar continentes:", error);
      return next(error);
    }
  };

  getContinenteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método getContinenteById");

      if (!req.params.id) {
        throw new AppError("Informe o ID do continente", 400);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new AppError("ID inválido", 400);
      logger.info("[CONTROLLER] - ID do continente recebido:", id);

      const response = await this.continenteService.getContinenteById(id);
      if (!response) throw new AppError("Continente não encontrado", 404);

      logger.info("[CONTROLLER] - Continente encontrado:", response);
      return res.status(200).json(response);
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao buscar continente por ID:", error);
      return next(error);
    }
  };

  updateContinente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método updateContinente");

      if (!req.params.id) {
        throw new AppError("Informe o ID do continente", 400);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new AppError("ID inválido", 400);
      logger.info("[CONTROLLER] - ID do continente recebido:", id);

      const data = UpdateContinenteSchema.parse(req.body);
      logger.info("[CONTROLLER] - Dados validados com sucesso:", data);

      const response = await this.continenteService.updateContinente(id, data);

      logger.info("[CONTROLLER] - Continente atualizado com sucesso:", response);
      return res.status(200).json(response);
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao atualizar continente:", error);
      return next(error);
    }
  };

  deleteContinente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("[CONTROLLER] - Iniciando método deleteContinente");

      if (!req.params.id) {
        throw new AppError("Informe o ID do continente", 400);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new AppError("ID inválido", 400);
      logger.info("[CONTROLLER] - ID do continente recebido:", id);

      const response = await this.continenteService.deleteContinente(id);

      logger.info("[CONTROLLER] - Continente deletado com sucesso:", response);
      return res.status(200).json({ message: "Continente deletado com sucesso", response });
    } catch (error) {
      logger.error("[CONTROLLER] - Erro ao deletar continente:", error);
      return next(error);
    }
  };

}

