// =============================================================
// Capa de Repositorio: acceso a la base de datos SQLite
// Solo esta capa escribe y lee SQL. Las demás capas
// (rutas y servicios) NO conocen nada de SQL.
// =============================================================
const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");
const fs = require("node:fs");

const DB_PATH = path.join(__dirname, "..", "..", "datos", "tienda.db");

let db = null;

function getDb() {
  if (!db) {
    db = new DatabaseSync(DB_PATH);
  }
  return db;
}

// === LISTAR PRODUCTOS (con filtro opcional por categoria) ===
function listarProductos(categoria) {
  const db = getDb();
  const sql = categoria && categoria !== "todas"
    ? "SELECT * FROM productos WHERE categoria = @cat ORDER BY id"
    : "SELECT * FROM productos ORDER BY id";
  const params = categoria && categoria !== "todas" ? { cat: categoria } : {};

  const stmt = db.prepare(sql);
  const rows = categoria && categoria !== "todas"
    ? stmt.all(params)
    : stmt.all();

  return rows.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    categoria: r.categoria,
    precio: r.precio,
    wattsAntes: r.wattsAntes,
    wattsDespues: r.wattsDespues,
    horasDia: r.horasDia,
  }));
}

// === OBTENER UN PRODUCTO POR ID ===
function obtenerProducto(id) {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM productos WHERE id = @id");
  const row = stmt.get({ id });
  if (!row) return null;
  return {
    id: row.id,
    nombre: row.nombre,
    categoria: row.categoria,
    precio: row.precio,
    wattsAntes: row.wattsAntes,
    wattsDespues: row.wattsDespues,
    horasDia: row.horasDia,
  };
}

// === CREAR PRODUCTO ===
function crearProducto(datos) {
  const db = getDb();
  const stmt = db.prepare(
    "INSERT INTO productos (nombre, categoria, precio, wattsAntes, wattsDespues, horasDia) VALUES (@nombre, @cat, @precio, @wa, @wd, @hd)"
  );
  const info = stmt.run({
    nombre: datos.nombre,
    cat: datos.categoria,
    precio: datos.precio,
    wa: datos.wattsAntes,
    wd: datos.wattsDespues,
    hd: datos.horasDia,
  });
  const id = Number(info.lastInsertRowid);
  const creado = obtenerProducto(id);
  return creado;
}

// === ACTUALIZAR PRODUCTO ===
function actualizarProducto(id, datos) {
  const db = getDb();
  const stmt = db.prepare(
    "UPDATE productos SET nombre = @nombre, categoria = @cat, precio = @precio, wattsAntes = @wa, wattsDespues = @wd, horasDia = @hd WHERE id = @id"
  );
  const info = stmt.run({
    id,
    nombre: datos.nombre,
    cat: datos.categoria,
    precio: datos.precio,
    wa: datos.wattsAntes,
    wd: datos.wattsDespues,
    hd: datos.horasDia,
  });
  if (Number(info.changes) === 0) return null;
  return obtenerProducto(id);
}

// === ELIMINAR PRODUCTO ===
function eliminarProducto(id) {
  const db = getDb();
  const stmt = db.prepare("DELETE FROM productos WHERE id = @id");
  const info = stmt.run({ id });
  if (Number(info.changes) === 0) return null;
  // Las categorias de los pedidos se actualizan a "general" si se eliminan
  return true;
}

// === CREAR PEDIDO ===
function crearPedido(pedido) {
  const db = getDb();
  const stmt = db.prepare(
    "INSERT INTO pedidos (cliente, fecha, total, productos) VALUES (@cliente, @fecha, @total, @productos)"
  );
  const info = stmt.run({
    cliente: pedido.cliente,
    fecha: pedido.fecha,
    total: Number(pedido.total) || 0,
    productos: JSON.stringify(pedido.productos || []),
  });
  const id = Number(info.lastInsertRowid);

  return {
    id,
    cliente: pedido.cliente,
    fecha: pedido.fecha,
    total: Number(pedido.total) || 0,
    productos: pedido.productos || [],
  };
}

// === LISTAR PEDIDOS ===
function listarPedidos() {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM pedidos ORDER BY id DESC");
  const rows = stmt.all();
  return rows.map((r) => ({
    id: r.id,
    cliente: r.cliente,
    fecha: r.fecha,
    total: Number(r.total),
    productos: r.productos ? JSON.parse(r.productos) : [],
  }));
}

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  crearPedido,
  listarPedidos,
};
