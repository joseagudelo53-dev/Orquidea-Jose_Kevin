"use client";
// =============================================================
// Componente Filtros: botones para filtrar por categoria
// =============================================================

export default function Filtros({ categoriaActiva = "todas", onCambiarCategoria }) {
  const categorias = [
    { valor: "todas", etiqueta: "Todas" },
    { valor: "iluminacion", etiqueta: "Iluminación" },
    { valor: "electrodomesticos", etiqueta: "Electrodomésticos" },
    { valor: "solar", etiqueta: "Energía solar" },
  ];

  return (
    <div className="filtros" role="group" aria-label="Filtrar por categoría">
      {categorias.map((cat) => (
        <button
          key={cat.valor}
          className={`filtro ${categoriaActiva === cat.valor ? "activo" : ""}`}
          onClick={() => onCambiarCategoria && onCambiarCategoria(cat.valor)}
          aria-pressed={categoriaActiva === cat.valor}
        >
          {cat.etiqueta}
        </button>
      ))}
    </div>
  );
}