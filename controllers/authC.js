import { UsuarioModel } from "../models/usuario.js";
import jwt from "jsonwebtoken";

export class AuthController {
  static login = async (req, res) => {
    try {
      const { username, password } = req.body;
      // Validaciones básicas
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Usuario y contraseña son requeridos" });
      }

      // Buscar usuario por username
      const user = await UsuarioModel.getUserCredentials(username);
      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
      // Verificar contraseña
      const isPasswordValid = await UsuarioModel.verifyPassword(
        password,
        user.pass_hash,
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      // Generar JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });

      // Actualizar última conexión
      await UsuarioModel.updateLastConnection(user.id);

      res.status(200).json({ message: "Login exitoso", token });
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static logout = async (req, res) => {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logout exitoso" });
  };

  static verify = async (req, res) => {
    try {
      const token = req.cookies.authToken;
      if (!token)
        return res
          .status(401)
          .json({ authenticated: false, message: "Token no encontrado" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

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

      return res.status(200).json({ authenticated: true, user });
    } catch {
      res.status(401).json({ authenticated: false, message: "Token inválido" });
    }
  };

  static getUserInfo = async (req, res) => {
    try {
      const user = req.user;
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}
