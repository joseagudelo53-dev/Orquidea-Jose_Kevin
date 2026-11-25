// =============================================================
// Capa de Rutas: productos
// Recibe las peticiones HTTP y delega en la capa de servicios
// =============================================================
const express = require("express");
const router = express.Router();
const servicios = require("../servicios/productos");

// GET /api/productos - Lista productos (con ?categoria= opcional)
router.get("/", (req, res) => {
  const categoria = req.query.categoria;
  const productos = servicios.listarProductos(categoria);
  res.status(200).json({ productos });
});

// GET /api/productos/:id - Un producto o 404
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: true, mensaje: "ID invalido" });
  }
  const producto = servicios.obtenerProducto(id);
  if (!producto) {
    return res.status(404).json({ error: true, mensaje: "Producto no encontrado" });
  }
  res.status(200).json({ producto });
});

// POST /api/productos - Crea un producto (400 si datos invalidos)
router.post("/", (req, res) => {
  try {
    const producto = servicios.crearProducto(req.body);
    res.status(201).json({ producto });
  } catch (err) {
    res.status(err.codigo || 500).json({ error: true, mensaje: err.message, detalles: err.detalles });
  }
});

// PUT /api/productos/:id - Modifica un producto
router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: true, mensaje: "ID invalido" });
    }
    const producto = servicios.actualizarProducto(id, req.body);
    res.status(200).json({ producto });
  } catch (err) {
    res.status(err.codigo || 500).json({ error: true, mensaje: err.message, detalles: err.detalles });
  }
});

// DELETE /api/productos/:id - Borra un producto
router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: true, mensaje: "ID invalido" });
    }
    const resultado = servicios.eliminarProducto(id);
    res.status(200).json({ ok: true, mensaje: "Producto eliminado", resultado });
  } catch (err) {
    res.status(err.codigo || 500).json({ error: true, mensaje: err.message });
  }
});

module.exports = router;
