import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("ERRO:", err);

  if (err instanceof ZodError) {
    const messages = err.issues.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
    return res.status(400).json({ error: "Erro de validação", details: messages });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err.code && err.clientVersion) {
    return res.status(500).json({
      error: "Erro no banco de dados",
      details: err.meta || err.message,
    });
  }

  return res.status(500).json({
    error: "Erro interno do servidor",
    message: err.message || "Algo inesperado aconteceu",
  });
}
