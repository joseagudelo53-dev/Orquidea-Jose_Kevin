// =============================================================
// Script npm run crear-bd: crea la base de datos SQLite
// y carga los productos iniciales (minimo 8, de 3 categorias)
// =============================================================
const { DatabaseSync } = require("node:sqlite");
const fs = require("node:fs");
const path = require("node:path");

const DB_PATH = path.join(__dirname, "..", "datos", "tienda.db");

// Datos de los productos iniciales (de 3 categorias, 11 productos)
const productosIniciales = [
  // --- ILUMINACIÓN ---
  { nombre: "Bombillo LED 9 W", categoria: "iluminacion", precio: 8900, wattsAntes: 60, wattsDespues: 9, horasDia: 5 },
  { nombre: "Panel LED 18 W", categoria: "iluminacion", precio: 35000, wattsAntes: 40, wattsDespues: 18, horasDia: 8 },
  { nombre: "Reflector LED 50 W", categoria: "iluminacion", precio: 59000, wattsAntes: 250, wattsDespues: 50, horasDia: 6 },
  { nombre: "Lámpara de escritorio LED", categoria: "iluminacion", precio: 45000, wattsAntes: 75, wattsDespues: 12, horasDia: 4 },

  // --- ELECTRODOMÉSTICOS ---
  { nombre: "Nevera eficiente", categoria: "electrodomesticos", precio: 1890000, wattsAntes: 80, wattsDespues: 40, horasDia: 24 },
  { nombre: "Aire acondicionado inverter", categoria: "electrodomesticos", precio: 2100000, wattsAntes: 1400, wattsDespues: 900, horasDia: 6 },
  { nombre: "Regleta con apagado automático", categoria: "electrodomesticos", precio: 65000, wattsAntes: 15, wattsDespues: 0, horasDia: 20 },
  { nombre: "Ventilador de torre eficiente", categoria: "electrodomesticos", precio: 120000, wattsAntes: 75, wattsDespues: 35, horasDia: 8 },

  // --- ENERGÍA SOLAR ---
  { nombre: "Calentador solar de agua", categoria: "solar", precio: 1200000, wattsAntes: 3500, wattsDespues: 0, horasDia: 0.5 },
  { nombre: "Kit de panel solar 550 W", categoria: "solar", precio: 2400000, wattsAntes: 550, wattsDespues: 0, horasDia: 4.5 },
  { nombre: "Bombilla solar recargable", categoria: "solar", precio: 35000, wattsAntes: 20, wattsDespues: 0, horasDia: 4 },
];

function crearBaseDatos() {
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
  }

  const db = new DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      categoria TEXT NOT NULL,
      precio REAL NOT NULL,
      wattsAntes INTEGER,
      wattsDespues INTEGER,
      horasDia REAL
    );

    CREATE TABLE pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente TEXT NOT NULL,
      fecha TEXT NOT NULL,
      total REAL NOT NULL,
      productos TEXT
    );
  `);

  const insertar = db.prepare(
    "INSERT INTO productos (nombre, categoria, precio, wattsAntes, wattsDespues, horasDia) VALUES (@nombre, @categoria, @precio, @wattsAntes, @wattsDespues, @horasDia)"
  );

  for (const p of productosIniciales) {
    insertar.run(p);
  }

  db.close();
  console.log("Base de datos creada en:", DB_PATH);
  console.log("Productos cargados:", productosIniciales.length);
}

crearBaseDatos();
