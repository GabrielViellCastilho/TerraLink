import { Request, Response } from "express";
import { ContinenteService } from "../services/continenteService";
import { CreateContinenteSchema} from "../schemas/continenteSchema";

export class ContinenteController {
  private continenteService: ContinenteService;

  constructor(continenteService: ContinenteService) {
    this.continenteService = continenteService;
  }

  addContinente = async (req: Request, res: Response) => {
    try {
      const continente = CreateContinenteSchema.parse(req.body);

      const response = await this.continenteService.addContinente(continente);

      return res.status(201).json(response);
    } catch (error) {
      if (error instanceof Error && "errors" in error) {

        return res.status(400).json({ error: (error as any).errors });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  };
}
