import express from "express";
import { ContinenteService } from "../services/continenteService";
import { ContinenteController } from "../controllers/continenteController";

const router = express.Router();


const continenteService = new ContinenteService();
const continenteController = new ContinenteController(continenteService);

router.get("/continentes", continenteController.getAllContinentes);
router.get("/continente/:id", continenteController.getContinenteById);
router.post("/createContinente", continenteController.addContinente);
router.post("/addPais", continenteController.addPaisAoContinente);
router.put("/continente/:id", continenteController.updateContinente);
router.delete("/continente/:id", continenteController.deleteContinente);
router.post("/getOrCreateContinent", continenteController.getOrCreateContinent);

export default router;
