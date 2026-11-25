"use client";
// =============================================================
// Página de Inicio de Orquídea
// =============================================================
import { useState, useEffect } from "react";
import Link from "next/link";
import { obtenerProductos, verificarAPI } from "../lib/api";
import TarjetaProducto from "../components/TarjetaProducto";

export default function HomePage() {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

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
      // Mostrar los 4 primeros productos destacados
      setProductosDestacados(productos.slice(0, 4));
    } catch (e) {
      setError("Error al cargar los productos: " + e.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="container py-3">
      <header className="encabezado mb-4">
        <h1>🌿 Orquídea - Salva energía, ahorra dinero</h1>
        <p>
          En 2026, el fenómeno de El Niño ha causado una crisis energética en Colombia.
          Conecta con nuestros equipos que reducen tu consumo.
        </p>
        <nav className="menu">
          <Link href="/" className="activo">Inicio</Link>
          <Link href="/catalogo">Catálogo</Link>
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
        <h2>Productos Destacados</h2>
        <p>Equipos que ofrecen mayor ahorro energético:</p>

        <div className="tarjetas">
          {productosDestacados.length > 0 ? (
            productosDestacados.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))
          ) : (
            <p>No hay productos para mostrar.</p>
          )}
        </div>
      </section>

      <section className="cta">
        <h2>¿Listo para ahorrar?</h2>
        <p>
          Explora nuestro catálogo y calcula cuánto dinero puedes ahorrar mensualmente.
        </p>
        <Link href="/catalogo" className="btn btn-primary">
          Ver Catálogo
        </Link>
      </section>

      <footer className="pie">
        <p>Tienda de equipos eficientes - Proyecto educativo Ingeniería Web I</p>
        <p>Orquídea &middot; IU Digital de Antioquia &middot; 2026</p>
      </footer>
    </main>
  );
}