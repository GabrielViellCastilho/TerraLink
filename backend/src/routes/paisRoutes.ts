import express from "express";
import { PaisService } from "../services/paisService";
import { PaisController } from "../controllers/paisController";

const router = express.Router();

const paisService = new PaisService();
const paisController = new PaisController(paisService);

router.get("/paises", paisController.getAllPaises);
router.get("/pais/:id", paisController.getPaisById);
router.post("/createPais", paisController.addPais);
router.put("/pais/:id", paisController.updatePais);
router.delete("/pais/:id", paisController.deletePais);
router.get("/paises/count", paisController.getPaisCount);
router.get("/paises/top/pib", paisController.getTop5PibPerCapita);
router.get("/paises/top/inflacao", paisController.getTop5Inflacao);
router.get("/paises/populacao/total", paisController.getTotalPopulation);



export default router;
