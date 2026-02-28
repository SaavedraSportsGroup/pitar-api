import { Router } from "express";
import { UsuarioController } from "../controllers/usuariosC.js";
import { AuthMiddleware } from "../middlewares/authM.js";

const usuariosRouter = Router();

usuariosRouter.get("/", AuthMiddleware, UsuarioController.getAll);
usuariosRouter.get("/:id", AuthMiddleware, UsuarioController.getById);
usuariosRouter.post("/", AuthMiddleware, UsuarioController.create);
usuariosRouter.put("/:id", AuthMiddleware, UsuarioController.update);
usuariosRouter.patch("/pass/:id", AuthMiddleware, UsuarioController.updatePass);
usuariosRouter.delete("/:id", AuthMiddleware, UsuarioController.delete);

export default usuariosRouter;
