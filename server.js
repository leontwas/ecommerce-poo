const express = require("express");
const path = require("path");
const cors = require("cors");
const connection = require("./database");

const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS y parseo de JSON
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Ruta para obtener usuarios desde la base de datos
app.get("/usuarios", (req, res) => {
  connection.query("SELECT * FROM usuario", (err, results) => {
    if (err) {
      console.error("Error al obtener los usuarios:", err);
      return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
    res.json(results);
  });
});

// Para cualquier otra ruta, devolver el archivo index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
