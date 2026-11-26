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

  const TARIFA_KWH = 950;
  const DIAS_MES = 30;
  const wattsAntes = Number(producto.wattsAntes || 0);
  const wattsDespues = Number(producto.wattsDespues || 0);
  const horasDia = Number(producto.horasDia || 0);
  const ahorroKwhMes = Math.max(((wattsAntes - wattsDespues) * horasDia * DIAS_MES) / 1000, 0);
  const ahorroPesosMes = Math.round(ahorroKwhMes * TARIFA_KWH);

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
        Reemplaza un equipo de {wattsAntes} W.
        Ahorra <span className="ahorro">{ahorroKwhMes.toFixed(1)} kWh</span> al mes.
      </p>
      <p className="precio">${(producto.precio || 0).toLocaleString("es-CO")}</p>
      <p>Ahorro mensual: <span className="ahorro">$ ${ahorroPesosMes.toLocaleString("es-CO")}</span></p>
      <button className="btn btn-primary btn-sm" onClick={handleAgregar}>
        Agregar al carrito
      </button>
    </article>
  );
}