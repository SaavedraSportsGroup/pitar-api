import { Router } from "express";
import { EmpleadoController } from "../controllers/empleadosC.js";
import { AuthMiddleware } from "../middlewares/authM.js";

const empleadoRouter = Router();

empleadoRouter.get("/:id", AuthMiddleware, EmpleadoController.getById);
empleadoRouter.patch("/:id", AuthMiddleware, EmpleadoController.updateEmpleado);
empleadoRouter.patch(
  "/:id/salud",
  AuthMiddleware,
  EmpleadoController.updateEmpleadoSalud,
);
empleadoRouter.patch(
  "/:id/financiero",
  AuthMiddleware,
  EmpleadoController.updateEmpleadoFinanciero,
);
empleadoRouter.patch(
  "/:id/anexos",
  AuthMiddleware,
  EmpleadoController.updateEmpleadoAnexos,
);

export default empleadoRouter;
