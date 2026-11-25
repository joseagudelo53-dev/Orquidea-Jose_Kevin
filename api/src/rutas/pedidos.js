// =============================================================
// Capa de Rutas: pedidos
// =============================================================
const express = require("express");
const router = express.Router();
const servicios = require("../servicios/pedidos");

// POST /api/pedidos - Guarda un pedido con los productos del carrito
router.post("/", (req, res) => {
  try {
    const pedido = servicios.crearPedido(req.body);
    res.status(201).json({ pedido });
  } catch (err) {
    res.status(err.codigo || 500).json({ error: true, mensaje: err.message, detalles: err.detalles });
  }
});

// GET /api/pedidos - Lista los pedidos
router.get("/", (req, res) => {
  const pedidos = servicios.listarPedidos();
  res.status(200).json({ pedidos });
});

module.exports = router;
