const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("API de PITAR");
});

app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});
