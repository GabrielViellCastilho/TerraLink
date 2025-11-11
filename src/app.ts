import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middlewares/errorHandler";

import continenteRoutes from "./routes/contitenRoutes";
import paisRoutes from "./routes/paisRoutes";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas principais
app.use(continenteRoutes);
app.use(paisRoutes);

// Middleware global de erro
app.use(errorHandler);

export default app;
