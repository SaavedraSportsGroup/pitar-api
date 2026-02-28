import { Router } from "express";
import { UsuarioController } from "../controllers/usuariosC.js";

const usuariosRouter = Router();

usuariosRouter.get("/", UsuarioController.getAll);
usuariosRouter.get("/:id", UsuarioController.getById);
usuariosRouter.post("/", UsuarioController.create);
usuariosRouter.put("/:id", UsuarioController.update);
usuariosRouter.patch("/:id/password", UsuarioController.updatePass);
usuariosRouter.delete("/:id", UsuarioController.delete);

export default usuariosRouter;
