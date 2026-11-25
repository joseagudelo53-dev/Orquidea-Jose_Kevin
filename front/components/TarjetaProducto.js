"use client";
// =============================================================
// Componente TarjetaProducto: muestra un producto individual
// =============================================================

export default function TarjetaProducto({ producto, onAgregar }) {
  if (!producto) return null;

  const categoriaLabels = {
    iluminacion: "Iluminación",
    electrodomesticos: "Electrodomésticos",
    solar: "Energía solar",
  };

  const handleAgregar = () => {
    if (onAgregar) {
      onAgregar(producto.id);
    }
  };

  return (
    <article className="tarjeta">
      <span className="categoria">
        {categoriaLabels[producto.categoria] || producto.categoria}
      </span>
      <h3>{producto.nombre}</h3>
      <p>
        Reemplaza un equipo de {producto.wattsAntes} W.
        Ahorra <span className="ahorro">{producto.ahorroKwhMes?.toFixed(1) || 0} kWh</span> al mes.
      </p>
      <p className="precio">${(producto.precio || 0).toLocaleString("es-CO")}</p>
      <p>Ahorro mensual: <span className="ahorro">$ {(producto.ahorroPesosMes || 0).toLocaleString("es-CO")}</span></p>
      <button className="btn btn-primary btn-sm" onClick={handleAgregar}>
        Agregar al carrito
      </button>
    </article>
  );
}