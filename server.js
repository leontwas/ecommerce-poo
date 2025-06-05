const express = require("express");
const cors = require("cors");
const connection = require("./database");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/usuarios", (req, res) => {
    connection.query("SELECT * FROM usuario", (err, results) => {
        if (err) {
            console.error("Error al obtener los usuarios:", err);
            return res.status(500).json({ error: "Error al obtener los usuarios" });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});