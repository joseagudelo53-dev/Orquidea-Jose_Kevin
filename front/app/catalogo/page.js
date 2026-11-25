"use client";
// =============================================================
// Página de Catálogo con filtros y carrito
// =============================================================
import { useState, useEffect } from "react";
import Link from "next/link";
import { obtenerProductos, crearPedido, verificarAPI } from "../../lib/api";
import TarjetaProducto from "../../components/TarjetaProducto";
import Filtros from "../../components/Filtros";
import Carrito from "../../components/Carrito";

const TARIFA = 950;

function ahorroPesosMes(producto) {
  const wattsAntes = Number(producto.wattsAntes || 0);
  const wattsDespues = Number(producto.wattsDespues || 0);
  const horasDia = Number(producto.horasDia || 0);
  const ahorroKwh = Math.max((wattsAntes - wattsDespues) * horasDia * 30 / 1000, 0);
  return ahorroKwh * TARIFA;
}

export default function CatalogoPage() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [carrito, setCarrito] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const disponible = await verificarAPI();
      if (!disponible) {
        setError("No se pudo conectar con la API. Asegúrate de que el servidor esté corriendo en el puerto 3000.");
        setCargando(false);
        return;
      }

      const productos = await obtenerProductos();
      // Añadir ahorro calculado
      const conAhorro = productos.map((p) => ({
        ...p,
        ahorroKwhMes: ((Number(p.wattsAntes || 0) - Number(p.wattsDespues || 0)) * Number(p.horasDia || 0) * 30 / 1000).toFixed(2),
        ahorroPesosMes: Math.round(ahorroPesosMes(p)),
      }));

      setProductos(conAhorro);
      setProductosFiltrados(conAhorro);
    } catch (e) {
      setError("Error al cargar los productos: " + e.message);
    } finally {
      setCargando(false);
    }
  };

  // Aplicar filtros cuando cambian
  useEffect(() => {
    let filtrados = productos;

    if (categoriaActiva !== "todas") {
      filtrados = filtrados.filter((p) => p.categoria === categoriaActiva);
    }

    if (busqueda.trim()) {
      filtrados = filtrados.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setProductosFiltrados(filtrados);
  }, [productos, categoriaActiva, busqueda]);

  const handleCambiarCategoria = (categoria) => {
    setCategoriaActiva(categoria);
  };

  const handleBuscar = (evento) => {
    setBuzqueda(evento.target.value);
  };

  const handleAgregarAlCarrito = (productId) => {
    const producto = productos.find((p) => p.id === productId);
    if (producto) {
      setCarrito((prev) => [...prev, producto]);
    }
  };

  const handleEliminarDelCarrito = (productId) => {
    setCarrito((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleVaciarCarrito = () => {
    setCarrito([]);
  };

  const handleConfirmarPedido = async (pedido) => {
    try {
      const confirmado = await crearPedido(pedido);
      setMensajeConfirmacion("¡Pedido confirmado! Gracias por tu compra.");
      setCarrito([]);
      setTimeout(() => setMensajeConfirmacion(""), 3000);
    } catch (e) {
      setMensajeConfirmacion("Error al confirmar el pedido: " + e.message);
    }
  };

  return (
    <main className="container py-3">
      <header className="encabezado mb-4">
        <h1>📦 Catálogo</h1>
        <p>Cada producto muestra cuánto ahorra al mes con una tarifa de 950 COP/kWh.</p>
        <nav className="menu">
          <Link href="/">Inicio</Link>
          <Link href="/catalogo" className="activo">Catálogo</Link>
          <Link href="/admin">Administración</Link>
        </nav>
      </header>

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      {cargando && (
        <div className="alert alert-info" role="alert">
          Cargando productos...
        </div>
      )}

      <section>
        <div className="buscador-container mb-3">
          <label htmlFor="buscador" className="form-label">Buscar productos:</label>
          <input
            type="text"
            id="buscador"
            className="form-control mb-3"
            placeholder="🔍 Buscar por nombre..."
            value={busqueda}
            onChange={handleBuscar}
          />
        </div>

        <Filtros categoriaActiva={categoriaActiva} onCambiarCategoria={handleCambiarCategoria} />

        <div className="tarjetas">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <TarjetaProducto
                key={producto.id}
                producto={producto}
                onAgregar={handleAgregarAlCarrito}
              />
            ))
          ) : (
            <p>No hay productos que mostrar.</p>
          )}
        </div>
      </section>

      {mensajeConfirmacion && (
        <div className="alert alert-success" role="alert">
          {mensajeConfirmacion}
        </div>
      )}

      <aside className="carrito">
        <Carrito
          carrito={carrito}
          onEliminar={handleEliminarDelCarrito}
          onVaciar={handleVaciarCarrito}
          onConfirmar={handleConfirmarPedido}
        />
      </aside>

      <footer className="pie">
        <p>Los productos y sus precios son de ejemplo educativo.</p>
        <p>Orquídea &middot; Proyecto educativo &middot; Ingeniería Web I &middot; IU Digital de Antioquia &middot; 2026</p>
      </footer>
    </main>
  );
}