import mysql from "mysql2";
import "dotenv/config"; // Carga las variables de entorno automáticamente

// Configuración de la conexión
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    process.exit(1); // Salir si hay error
  }
  console.log("Conectado a MySQL");
});

export default db.promise();
