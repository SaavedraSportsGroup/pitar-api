import jwt from "jsonwebtoken";
import { UsuarioModel } from "../models/usuario.js";

export const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res
        .status(401)
        .json({ authenticated: false, message: "Token no encontrado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Consulta usuario
    const user = await UsuarioModel.getById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ authenticated: false, message: "Usuario no encontrado" });
    }

    if (user.activo !== 1) {
      return res
        .status(401)
        .json({ authenticated: false, message: "Usuario no activo" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ authenticated: false, message: "Token inválido" });
  }
};
