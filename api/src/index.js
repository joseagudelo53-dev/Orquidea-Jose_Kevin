// =============================================================
// Punto de entrada de la API de Orquídea
// Servidor Express con las capas: rutas -> servicios -> repositorio
// =============================================================
const express = require("express");
const cors = require("cors");
const path = require("node:path");
const fs = require("node:fs");

const rutasProductos = require("./rutas/productos");
const rutasPedidos = require("./rutas/pedidos");
const errorHandler = require("./rutas/middleware");

const DB_PATH = path.join(__dirname, "..", "datos", "tienda.db");
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Verificar que la base de datos exista
if (!fs.existsSync(DB_PATH)) {
  console.error("ERROR: No existe la base de datos en:", DB_PATH);
  console.error("Ejecuta primero: npm run crear-bd");
  process.exit(1);
}

// === Rutas de la API ===
app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true, mensaje: "API Orquídea funcionando" });
});

app.use("/api/productos", rutasProductos);
app.use("/api/pedidos", rutasPedidos);

// Ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({ error: true, mensaje: "Ruta no encontrada" });
});

// Middleware de errores (debe ir al final)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API Orquídea escuchando en http://localhost:${PORT}`);
});
