import db from "../config/db.js";
import bcrypt from "bcryptjs";

export class UsuarioModel {
  static async getAll(q = "") {
    let query = "SELECT * FROM v_usuarios";
    const queryParams = [];

    // Si hay un término de búsqueda, agregar condiciones WHERE
    if (q && q.trim() !== "") {
      const searchTerm = `%${q.trim()}%`;
      query += ` WHERE username LIKE ? OR email LIKE ? OR nombre LIKE ?`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    const [rows] = await db.query(query, queryParams);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM v_usuarios WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  static async getByUser(username) {
    const [rows] = await db.query(
      "SELECT * FROM v_usuarios WHERE username = ?",
      [username],
    );
    return rows[0];
  }

  static async getUserCredentials(username) {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE username = ?", [
      username,
    ]);
    return rows[0];
  }

  static async create(
    nombres,
    apellidos,
    tipo_documento,
    documento,
    email,
    rol,
  ) {
    const pass =
      "." + nombres.slice(-1) + documento + apellidos.charAt(0) + ".";
    console.log("pass", pass);
    const pass_hash = await bcrypt.hash(pass, 10);

    const [rows] = await db.execute(
      "CALL p_nuevo_usuario(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombres,
        apellidos,
        tipo_documento,
        documento,
        email,
        rol,
        pass_hash,
        null,
      ],
    );

    return { message: "Usuario creado exitosamente", rows };
  }

  static async update(id, username, email) {
    const [rows] = await db.execute(
      "UPDATE usuarios SET username = ?, email = ? WHERE id = ?",
      [username, email, id],
    );
    return { message: "Usuario actualizado exitosamente", rows };
  }

  static async updatePass(id, newPassword) {
    await db.execute(
      "UPDATE usuarios SET pass_hash = ?, pass_fecha_cambio = NOW() WHERE id = ?",
      [newPassword, id],
    );
    return { message: "Contraseña actualizada exitosamente" };
  }

  static async updateLastConnection(id) {
    await db.execute("UPDATE usuarios SET ultimo_login = NOW() WHERE id = ?", [
      id,
    ]);
    return { message: "Última conexión actualizada exitosamente" };
  }

  static async delete(id) {
    const [rows] = await db.execute("DELETE FROM usuarios WHERE id = ?", [id]);
    return { message: "Usuario eliminado exitosamente", rows };
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
