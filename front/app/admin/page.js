"use client";
// =============================================================
// Página de Administración: crear y gestionar productos
// =============================================================
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  obtenerProductos,
  crearProducto,
  eliminarProducto,
  verificarAPI,
} from "../../lib/api";

const CATEGORIAS_VALIDAS = ["iluminacion", "electrodomesticos", "solar"];

function nombreCategoria(cat) {
  const nombres = {
    iluminacion: "Iluminación",
    electrodomesticos: "Electrodomésticos",
    solar: "Energía solar",
  };
  return nombres[cat] || cat;
}

export default function AdminPage() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // Formulario
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("iluminacion");
  const [precio, setPrecio] = useState("");
  const [wattsAntes, setWattsAntes] = useState("");
  const [wattsDespues, setWattsDespues] = useState("");
  const [horasDia, setHorasDia] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const disponible = await verificarAPI();
      if (!disponible) {
        setError(
          "No se pudo conectar con la API. Asegúrate de que el servidor esté corriendo en el puerto 3000."
        );
        return;
      }
      const lista = await obtenerProductos();
      setProductos(
        lista.map((p) => ({
          ...p,
          ahorroKwhMes:
            ((Number(p.wattsAntes || 0) -
              Number(p.wattsDespues || 0)) *
              Number(p.horasDia || 0)) /
              1000,
          ahorroPesosMes: Math.round(
            ((Number(p.wattsAntes || 0) -
              Number(p.wattsDespues || 0)) *
              Number(p.horasDia || 0)) *
              950 /
              1000
          ),
        }))
      );
    } catch (e) {
      setError("Error al cargar productos: " + e.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje("");

    if (!nombre.trim()) {
      setError("El nombre del producto es obligatorio.");
      return;
    }

    try {
      const nuevo = {
        nombre: nombre.trim(),
        categoria,
        precio: Number(precio),
        wattsAntes: Number(wattsAntes),
        wattsDespues: Number(wattsDespues),
        horasDia: Number(horasDia),
      };
      await crearProducto(nuevo);
      setMensaje("¡Producto creado exitosamente!");
      setNombre("");
      setPrecio("");
      setWattsAntes("");
      setWattsDespues("");
      setHorasDia("");
      setCategoria("iluminacion");
      cargarProductos();
      setTimeout(() => setMensaje(""), 3000);
    } catch (e) {
      setError("Error al crear producto: " + e.message);
    }
  };

  const handleBorrar = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }
    try {
      await eliminarProducto(id);
      cargarProductos();
    } catch (e) {
      setError("Error al eliminar: " + e.message);
    }
  };

  return (
    <main className="container py-3">
      <header className="encabezado mb-4">
        <h1>🔧 Administración</h1>
        <p>Administra los productos de la tienda.</p>
        <nav className="menu">
          <Link href="/">Inicio</Link>
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/admin" className="activo">
            Administración
          </Link>
        </nav>
      </header>

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      {mensaje && (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      )}

      <section className="formulario">
        <h2>Crear Nuevo Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre del producto *
            </label>
            <input
              type="text"
              id="nombre"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Bombillo LED 10W"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="categoria" className="form-label">
              Categoría *
            </label>
            <select
              id="categoria"
              className="form-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              {CATEGORIAS_VALIDAS.map((cat) => (
                <option key={cat} value={cat}>
                  {nombreCategoria(cat)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="precio" className="form-label">
              Precio (COP) *
            </label>
            <input
              type="number"
              id="precio"
              className="form-control"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="Ej: 8900"
              min="0"
              step="1"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="wattsAntes" className="form-label">
                Watts antes (W)
              </label>
              <input
                type="number"
                id="wattsAntes"
                className="form-control"
                value={wattsAntes}
                onChange={(e) => setWattsAntes(e.target.value)}
                placeholder="Ej: 60"
                min="0"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="wattsDespues" className="form-label">
                Watts después (W)
              </label>
              <input
                type="number"
                id="wattsDespues"
                className="form-control"
                value={wattsDespues}
                onChange={(e) => setWattsDespues(e.target.value)}
                placeholder="Ej: 9"
                min="0"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="horasDia" className="form-label">
                Horas/día
              </label>
              <input
                type="number"
                id="horasDia"
                className="form-control"
                value={horasDia}
                onChange={(e) => setHorasDia(e.target.value)}
                placeholder="Ej: 5"
                min="0"
                step="0.5"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Crear Producto
          </button>
        </form>
      </section>

      <section>
        <h2>Lista de Productos</h2>
        {productos.length === 0 ? (
          <p>No hay productos registrados.</p>
        ) : (
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Ahorro mensual</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{nombreCategoria(p.categoria)}</td>
                  <td>${p.precio.toLocaleString("es-CO")}</td>
                  <td>${p.ahorroPesosMes.toLocaleString("es-CO")}</td>
                  <td>
                    <button
                      className="btn-borrar"
                      onClick={() => handleBorrar(p.id)}
                      title="Eliminar"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <footer className="pie">
        <p>
          Orquídea &middot; Proyecto educativo &middot; Ingeniería Web I &middot;
          IU Digital de Antioquia &middot; 2026
        </p>
      </footer>
    </main>
  );
}