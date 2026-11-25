"use client";
// =============================================================
// Componente Encabezado: header con navegación
// =============================================================
import Link from "next/link";

export default function Encabezado({ titulo = "Orquídea", paginaActiva = "inicio" }) {
  const enlaces = [
    { nombre: "Inicio", ruta: "/", id: "inicio" },
    { nombre: "Catálogo", ruta: "/catalogo", id: "catalogo" },
    { nombre: "Administración", ruta: "/admin", id: "admin" },
  ];

  return (
    <header className="encabezado">
      <h1>📦 {titulo}</h1>
      <p>Encuentra equipos que ahorran energía y dinero.</p>
      <nav className="menu">
        {enlaces.map((enlace) => (
          <Link
            key={enlace.id}
            href={enlace.ruta}
            className={paginaActiva === enlace.id ? "activo" : ""}
            aria-current={paginaActiva === enlace.id ? "page" : undefined}
          >
            {enlace.nombre}
          </Link>
        ))}
      </nav>
    </header>
  );
}