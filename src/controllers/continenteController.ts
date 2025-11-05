import { Request, Response, NextFunction } from "express";
import { ContinenteService } from "../services/continenteService";
import { AddPaisAoContinente, CreateContinenteSchema, UpdateContinenteSchema} from "../schemas/continenteSchema";
import { AppError } from "../errors/AppError";

export class ContinenteController {
  private continenteService: ContinenteService;

  constructor(continenteService: ContinenteService) {
    this.continenteService = continenteService;
  }

  addContinente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const continente = CreateContinenteSchema.parse(req.body);

      const response = await this.continenteService.addContinente(continente);

      return res.status(201).json(response);
    } catch (error) {
      return next(error)
    }
  };
  
  addPaisAoContinente = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const data = AddPaisAoContinente.parse(req.body)


      const response = await this.continenteService.addPaisAoContinente(
        data.continenteId,
        data.paisId
      );

      return res.status(200).json(response);
    } catch (error: any) {
      console.error(error);
      return next(error)
    }
  };

  getAllContinentes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const response = await this.continenteService.getAllContinentes(page, limit);
      return res.status(200).json(response);
    } catch (error: any) {
      console.error(error);
      return next(error)
    }
  };

  getContinenteById = async (req: Request, res: Response, next: NextFunction) => {
    try {

      if (!req.params.id){
        throw new AppError("Informe o ID do continente",400);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new AppError("ID inválido",400);

      const response = await this.continenteService.getContinenteById(id);
      if (!response) throw new AppError("Continente não encontrado",404)

      return res.status(200).json(response);
    } catch (error: any) {
      console.error(error);
      return next(error)
    }
  };

  updateContinente = async (req: Request, res: Response, next: NextFunction) => {
    try {

      if (!req.params.id){
        throw new AppError("Informe o ID do continente",400);
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new AppError("ID inválido",400);

      const data = UpdateContinenteSchema.parse(req.body);
      const response = await this.continenteService.updateContinente(id, data);

      return res.status(200).json(response);
    } catch (error: any) {
      console.error(error);
      return next(error)
    }
  };

  deleteContinente = async (req: Request, res: Response, next: NextFunction) => {
    try {

      if (!req.params.id){
        throw new AppError("Informe o ID do continente",400);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new AppError("ID inválido",400);

      const response = await this.continenteService.deleteContinente(id);
      return res.status(200).json({ message: "Continente deletado com sucesso", response });
    } catch (error: any) {
      console.error(error);
      return next(error)
    }
  };
}

