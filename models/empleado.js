import db from "../config/db.js";

export class EmpleadoModel {
  static async getById(id) {
    const [rows] = await db.query(
      "SELECT * FROM v_empleados WHERE id_empleado = ?",
      [id],
    );
    return rows[0];
  }

  static async getEmpleadoByIdUsuario(id_usuario) {
    const [rows] = await db.query(
      "SELECT * FROM v_empleados WHERE id_usuario = ?",
      [id_usuario],
    );
    return rows[0];
  }

  static async updateEmpleado(id, updateData) {
    // Filtrar solo los campos que no son null o undefined
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updateData).filter(
        ([key, value]) => value !== null && value !== undefined && value !== "",
      ),
    );

    if (Object.keys(fieldsToUpdate).length === 0) {
      return { message: "No hay campos para actualizar", rows: [] };
    }

    // Construir dinámicamente la consulta UPDATE
    const setClause = Object.keys(fieldsToUpdate)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = Object.values(fieldsToUpdate);
    values.push(id);

    const [rows] = await db.execute(
      `UPDATE empleados SET ${setClause} WHERE id = ?`,
      values,
    );

    return {
      message: "Información básica actualizada exitosamente",
      fieldsUpdated: Object.keys(fieldsToUpdate),
      rows,
    };
  }

  static async updateEmpleadoSalud(id_empleado, updateData) {
    // Filtrar solo los campos que no son null o undefined
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updateData).filter(
        ([key, value]) => value !== null && value !== undefined && value !== "",
      ),
    );

    if (Object.keys(fieldsToUpdate).length === 0) {
      return { message: "No hay campos para actualizar", rows: [] };
    }

    // Construir dinámicamente la consulta UPDATE
    const setClause = Object.keys(fieldsToUpdate)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = Object.values(fieldsToUpdate);
    values.push(id_empleado);

    const [rows] = await db.execute(
      `UPDATE empleados_salud SET ${setClause} WHERE id_empleado = ?`,
      values,
    );

    return {
      message: "Información de salud actualizada exitosamente",
      fieldsUpdated: Object.keys(fieldsToUpdate),
      rows,
    };
  }

  static async updateEmpleadoFinanciero(id_empleado, updateData) {
    // Filtrar solo los campos que no son null o undefined
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updateData).filter(
        ([key, value]) => value !== null && value !== undefined && value !== "",
      ),
    );

    if (Object.keys(fieldsToUpdate).length === 0) {
      return { message: "No hay campos para actualizar", rows: [] };
    }

    // Construir dinámicamente la consulta UPDATE
    const setClause = Object.keys(fieldsToUpdate)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = Object.values(fieldsToUpdate);
    values.push(id_empleado);

    const [rows] = await db.execute(
      `UPDATE empleados_financiero SET ${setClause} WHERE id_empleado = ?`,
      values,
    );

    return {
      message: "Información financiera actualizada exitosamente",
      fieldsUpdated: Object.keys(fieldsToUpdate),
      rows,
    };
  }

  static async updateEmpleadoAnexos(id_empleado, updateData) {
    // Filtrar solo los campos que no son null o undefined
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updateData).filter(
        ([key, value]) => value !== null && value !== undefined && value !== "",
      ),
    );

    if (Object.keys(fieldsToUpdate).length === 0) {
      return { message: "No hay campos para actualizar", rows: [] };
    }

    // Construir dinámicamente la consulta UPDATE
    const setClause = Object.keys(fieldsToUpdate)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = Object.values(fieldsToUpdate);
    values.push(id_empleado);

    const [rows] = await db.execute(
      `UPDATE empleados_anexos SET ${setClause} WHERE id_empleado = ?`,
      values,
    );

    return {
      message: "Anexos actualizados exitosamente",
      fieldsUpdated: Object.keys(fieldsToUpdate),
      rows,
    };
  }
}
