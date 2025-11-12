import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middlewares/errorHandler";

import continenteRoutes from "./routes/continenteRoutes";
import paisRoutes from "./routes/paisRoutes";
import cidadeRoutes from "./routes/cidadeRoutes"

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas principais
app.use(continenteRoutes);
app.use(paisRoutes);
app.use(cidadeRoutes);

// Middleware global de erro
app.use(errorHandler);

export default app;
