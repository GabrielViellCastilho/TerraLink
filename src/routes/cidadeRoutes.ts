import express from "express";
import { CidadeService } from "../services/cidadeService";
import { CidadeController } from "../controllers/cidadeController";

const router = express.Router();

const cidadeService = new CidadeService();
const cidadeController = new CidadeController(cidadeService);

router.get("/cidades", cidadeController.getAllCidades);
router.get("/cidade/:id", cidadeController.getCidadeById);
router.post("/createCidade", cidadeController.addCidade);
router.put("/cidade/:id", cidadeController.updateCidade);
router.delete("/cidade/:id", cidadeController.deleteCidade);

export default router;
