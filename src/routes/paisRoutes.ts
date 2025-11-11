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

export default router;
