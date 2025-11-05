import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middlewares/errorHandler";
import { ContinenteService } from "./services/continenteService";
import { ContinenteController } from "./controllers/continenteController";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

var continenteService = new ContinenteService()
var continenteController = new ContinenteController(continenteService)

// Rotas

app.get("/continentes", continenteController.getAllContinentes);
app.get("/continente/:id", continenteController.getContinenteById);
app.post("/createContinente",continenteController.addContinente);
app.post("/addPais", continenteController.addPaisAoContinente);
app.put("/continente/:id", continenteController.updateContinente);
app.delete("/continente/:id", continenteController.deleteContinente);


// Middleware de erro
app.use(errorHandler);

export default app;
