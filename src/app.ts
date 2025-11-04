import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middlewares/errorHandler";
import { ContinenteService } from "./services/continenteService";
import { ContinenteController } from "./controllers/continenteController";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json()); // parse JSON

var continenteService = new ContinenteService()
var continenteController = new ContinenteController(continenteService)

// Rotas


app.post("/createContinente",continenteController.addContinente)


// Middleware de erro
app.use(errorHandler);

export default app;
