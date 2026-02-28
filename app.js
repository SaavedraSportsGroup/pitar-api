import express from "express";
import { corsMiddleware } from "./middlewares/corsM.js";
import usuariosRouter from "./routes/usuariosR.js";
import authRouter from "./routes/authR.js";
import "dotenv/config";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT ?? process.env.DEFAULT_PORT;
const app = express();

// Middlewares
app.use(corsMiddleware());
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/usuarios", usuariosRouter);
app.use("/api/auth", authRouter);

app.get("/api", (req, res) => {
  res.send("API de PITAR");
});

app.get("/api/health", (req, res) => {
  res.status(200).send("Api funcionando correctamente");
});

// Servidor
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`La API se está ejecutando en http://localhost:${PORT}`);
  });
}

export default app;
