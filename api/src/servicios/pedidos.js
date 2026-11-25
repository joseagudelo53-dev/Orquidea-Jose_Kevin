// =============================================================
// Capa de Servicios: reglas de negocio de pedidos
// Valida los datos del pedido y calcula el total
// =============================================================

const pedidosRepo = require("../repositorios/datos");

function validarPedido(datos) {
  const errores = {};

  if (!datos.cliente || String(datos.cliente).trim().length === 0) {
    errores.cliente = "El nombre del cliente es obligatorio.";
  }

  if (!Array.isArray(datos.productos) || datos.productos.length === 0) {
    errores.productos = "El pedido debe tener al menos un producto.";
  } else {
    datos.productos.forEach((p, i) => {
      if (!p || !Number.isInteger(Number(p.id))) {
        errores[`productos[${i}]`] = "Cada producto debe tener un id valido.";
      }
    });
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores,
  };
}

// Crea un pedido validando primero. El total se calcula aqui.
function crearPedido(datos) {
  const validacion = validarPedido(datos);
  if (!validacion.valido) {
    const err = new Error("Datos de pedido invalidos");
    err.codigo = 400;
    err.detalles = validacion.errores;
    throw err;
  }

  const pedido = {
    cliente: String(datos.cliente).trim(),
    fecha: datos.fecha || new Date().toISOString().slice(0, 10),
    total: 0,
    productos: datos.productos,
  };

  const creado = pedidosRepo.crearPedido(pedido);
  return creado;
}

function listarPedidos() {
  return pedidosRepo.listarPedidos();
}

module.exports = {
  crearPedido,
  listarPedidos,
  validarPedido,
};
