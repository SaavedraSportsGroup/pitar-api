import cors from "cors";

export const corsMiddleware = () => {
  const origins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
    : ["http://localhost:5173"];

  return cors({
    origin: (origin, callback) => {
      // Permitir solicitudes sin origen (como Postman, curl, o mismo dominio)
      if (!origin) {
        return callback(null, true);
      }

      // Permitir orígenes explícitamente configurados
      if (origins.includes(origin)) {
        return callback(null, true);
      }

      // Para desarrollo, permitir localhost en cualquier puerto
      if (
        process.env.NODE_ENV !== "production" &&
        origin.startsWith("http://localhost:")
      ) {
        return callback(null, true);
      }

      return callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
};
