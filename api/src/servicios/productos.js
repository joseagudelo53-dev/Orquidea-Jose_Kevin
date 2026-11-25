// =============================================================
// Capa de Servicios: reglas de negocio y validaciones
// Esta capa usa el repositorio para obtener/guardar datos,
// pero nunca escribe SQL.
// =============================================================

const productosRepo = require("../repositorios/datos");

// Tarifa de energia (COP por kWh) y dias del mes para el calculo de ahorro
const TARIFA = 950; // COP por kWh
const DIAS_MES = 30;

// Categorias validas
const CATEGORIAS_VALIDAS = new Set([
  "iluminacion",
  "electrodomesticos",
  "solar",
]);

// =============================================================
// Validaciones de productos
// =============================================================

function validarProducto(datos, esActualizacion = false) {
  const errores = {};

  if (!esActualizacion || datos.nombre !== undefined) {
    if (!datos.nombre || String(datos.nombre).trim().length === 0) {
      errores.nombre = "El nombre del producto es obligatorio.";
    }
  }

  if (!esActualizacion || datos.categoria !== undefined) {
    if (!datos.categoria || !CATEGORIAS_VALIDAS.has(String(datos.categoria))) {
      errores.categoria =
        "La categoria debe ser una de: iluminacion, electrodomesticos, solar.";
    }
  }

  if (!esActualizacion || datos.precio !== undefined) {
    const precio = Number(datos.precio);
    if (!Number.isFinite(precio) || precio < 0) {
      errores.precio = "El precio debe ser un numero mayor o igual a 0.";
    }
  }

  if (!esActualizacion || datos.wattsAntes !== undefined) {
    const wa = Number(datos.wattsAntes);
    if (!Number.isFinite(wa) || wa < 0) {
      errores.wattsAntes = "Watts antes debe ser un numero mayor o igual a 0.";
    }
  }

  if (!esActualizacion || datos.wattsDespues !== undefined) {
    const wd = Number(datos.wattsDespues);
    if (!Number.isFinite(wd) || wd < 0) {
      errores.wattsDespues =
        "Watts despues debe ser un numero mayor o igual a 0.";
    }
  }

  if (!esActualizacion || datos.horasDia !== undefined) {
    const hd = Number(datos.horasDia);
    if (!Number.isFinite(hd) || hd < 0) {
      errores.horasDia = "Horas al dia debe ser un numero mayor o igual a 0.";
    }
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores,
  };
}

// =============================================================
// Listar productos
// =============================================================

function listarProductos(categoria) {
  const productos = productosRepo.listarProductos(categoria);
  return productos.map((p) => conAhorro(p));
}

// =============================================================
// Obtener un producto por id (con 404 si no existe)
// =============================================================

function obtenerProducto(id) {
  const producto = productosRepo.obtenerProducto(Number(id));
  if (!producto) return null;
  return conAhorro(producto);
}

// =============================================================
// Crear un producto (despues de validar)
// =============================================================

function crearProducto(datos) {
  const validacion = validarProducto(datos, false);
  if (!validacion.valido) {
    const err = new Error("Datos de producto invalidos");
    err.codigo = 400;
    err.detalles = validacion.errores;
    throw err;
  }

  const creado = productosRepo.crearProducto({
    nombre: String(datos.nombre).trim(),
    categoria: String(datos.categoria),
    precio: Number(datos.precio),
    wattsAntes: Number(datos.wattsAntes),
    wattsDespues: Number(datos.wattsDespues),
    horasDia: Number(datos.horasDia),
  });
  return conAhorro(creado);
}

// =============================================================
// Actualizar un producto (despues de validar)
// =============================================================

function actualizarProducto(id, datos) {
  const productoExistente = productosRepo.obtenerProducto(Number(id));
  if (!productoExistente) {
    const err = new Error("Producto no encontrado");
    err.codigo = 404;
    throw err;
  }

  const validacion = validarProducto(datos, true);
  if (!validacion.valido) {
    const err = new Error("Datos de producto invalidos");
    err.codigo = 400;
    err.detalles = validacion.errores;
    throw err;
  }

  const actualizado = productosRepo.actualizarProducto(Number(id), {
    nombre: String(datos.nombre || productoExistente.nombre).trim(),
    categoria:
      datos.categoria !== undefined ? String(datos.categoria) : productoExistente.categoria,
    precio:
      datos.precio !== undefined ? Number(datos.precio) : productoExistente.precio,
    wattsAntes:
      datos.wattsAntes !== undefined ? Number(datos.wattsAntes) : productoExistente.wattsAntes,
    wattsDespues:
      datos.wattsDespues !== undefined ? Number(datos.wattsDespues) : productoExistente.wattsDespues,
    horasDia:
      datos.horasDia !== undefined ? Number(datos.horasDia) : productoExistente.horasDia,
  });
  return conAhorro(actualizado);
}

// =============================================================
// Eliminar un producto
// =============================================================

function eliminarProducto(id) {
  const productoExistente = productosRepo.obtenerProducto(Number(id));
  if (!productoExistente) {
    const err = new Error("Producto no encontrado");
    err.codigo = 404;
    throw err;
  }

  const ok = productosRepo.eliminarProducto(Number(id));
  if (!ok) {
    const err = new Error("No se pudo eliminar el producto");
    err.codigo = 404;
    throw err;
  }
  return true;
}

// =============================================================
// Helpers de negocio
// =============================================================

// Calcular el ahorro en kWh al mes de un producto
function ahorroKwhMes(producto) {
  const wattsAntes = Number(producto.wattsAntes || 0);
  const wattsDespues = Number(producto.wattsDespues || 0);
  const horasDia = Number(producto.horasDia || 0);
  return Math.max((wattsAntes - wattsDespues) * horasDia * DIAS_MES / 1000, 0);
}

// Calcular el ahorro en pesos al mes de un producto
function ahorroPesosMes(producto) {
  return ahorroKwhMes(producto) * TARIFA;
}

// Anexar los campos calculados de ahorro a un producto
function conAhorro(producto) {
  return {
    ...producto,
    ahorroKwhMes: Number(ahorroKwhMes(producto).toFixed(2)),
    ahorroPesosMes: Math.round(ahorroPesosMes(producto)),
  };
}

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  validarProducto,
  ahorroKwhMes,
  ahorroPesosMes,
};