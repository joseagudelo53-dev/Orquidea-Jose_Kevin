"use client";
// =============================================================
// Componente Carrito: muestra los items del carrito y total
// =============================================================
import { useState, useEffect } from "react";
import { crearPedido } from "../lib/api";

const TARIFA = 950; // COP por kWh

function ahorroPesosMes(producto) {
  const wattsAntes = Number(producto.wattsAntes || 0);
  const wattsDespues = Number(producto.wattsDespues || 0);
  const horasDia = Number(producto.horasDia || 0);
  const ahorroKwh = Math.max((wattsAntes - wattsDespues) * horasDia * 30 / 1000, 0);
  return ahorroKwh * TARIFA;
}

export default function Carrito({ carrito, onEliminar, onVaciar, onConfirmar, productos }) {
  const [mostrando, setMostrando] = useState(true);

  const total = carrito.reduce((sum, item) => sum + (Number(item.precio) || 0), 0);
  const ahorroTotal = carrito.reduce((sum, item) => sum + ahorroPesosMes(item), 0);
  const meses = total > 0 ? Math.ceil(total / ahorroTotal) : 0;

  const handleConfirmar = async () => {
    if (carrito.length === 0) return;

    const pedido = {
      cliente: "Cliente Anónimo",
      productos: carrito,
    };

    try {
      await onConfirmar && onConfirmar(pedido);
    } catch (error) {
      console.error("Error al confirmar pedido:", error);
    }
  };

  // Mostrar contenido del carrito
  const [mostrarContenido, setMostrarContenido] = useState(false);

  useEffect(() => {
    if (carrito.length > 0) {
      setMostrarContenido(true);
    }
  }, [carrito]);

  if (carrito.length === 0) {
    return (
      <aside id="carrito" className="carrito-vacio">
        <h2>🛒 Carrito está vacío</h2>
      </aside>
    );
  }

  return (
    <aside id="carrito" className="carrito">
      <h2>🛒 Carrito ({carrito.length})</h2>
      <ul id="lista-carrito">
        {carrito.map((producto) => (
          <li key={producto.id}>
            {producto.nombre}: ${Number(producto.precio || 0).toLocaleString("es-CO")}
            <button
              className="btn-eliminar"
              onClick={() => onEliminar && onEliminar(producto.id)}
              aria-label="Eliminar producto"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <p id="total">Total: ${total.toLocaleString("es-CO")}</p>
      <p id="ahorro">
        Ahorra ${ahorroTotal.toLocaleString("es-CO")} al mes: la compra se paga sola en {meses} meses.
      </p>
      <button className="btn btn-secondary btn-sm" onClick={() => onVaciar && onVaciar()}>
        Vaciar carrito
      </button>
      <button
        className="btn btn-primary btn-sm"
        onClick={handleConfirmar}
        style={{ marginLeft: "8px" }}
      >
        Confirmar pedido
      </button>
    </aside>
  );
}