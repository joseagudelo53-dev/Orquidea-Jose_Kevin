// =============================================================
// Módulo API: funciones para consumir el backend de Orquídea
// =============================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Obtener productos (con filtro opcional por categoria)
export async function obtenerProductos(categoria) {
  try {
    const url = categoria && categoria !== "todas"
      ? `${API_URL}/api/productos?categoria=${categoria}`
      : `${API_URL}/api/productos`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.status}`);
    }

    const data = await response.json();
    return data.productos || [];
  } catch (error) {
    console.error("Error en obtenerProductos:", error);
    throw error;
  }
}

// Obtener un producto por ID
export async function obtenerProducto(id) {
  try {
    const response = await fetch(`${API_URL}/api/productos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener producto: ${response.status}`);
    }

    const data = await response.json();
    return data.producto;
  } catch (error) {
    console.error("Error en obtenerProducto:", error);
    throw error;
  }
}

// Crear un nuevo producto
export async function crearProducto(producto) {
  try {
    const response = await fetch(`${API_URL}/api/productos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.mensaje || "Error al crear producto");
    }

    const data = await response.json();
    return data.producto;
  } catch (error) {
    console.error("Error en crearProducto:", error);
    throw error;
  }
}

// Actualizar un producto
export async function actualizarProducto(id, producto) {
  try {
    const response = await fetch(`${API_URL}/api/productos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.mensaje || "Error al actualizar producto");
    }

    const data = await response.json();
    return data.producto;
  } catch (error) {
    console.error("Error en actualizarProducto:", error);
    throw error;
  }
}

// Eliminar un producto
export async function eliminarProducto(id) {
  try {
    const response = await fetch(`${API_URL}/api/productos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.mensaje || "Error al eliminar producto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en eliminarProducto:", error);
    throw error;
  }
}

// Crear un pedido (enviar carrito)
export async function crearPedido(pedido) {
  try {
    const response = await fetch(`${API_URL}/api/pedidos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.mensaje || "Error al crear el pedido");
    }

    const data = await response.json();
    return data.pedido;
  } catch (error) {
    console.error("Error en crearPedido:", error);
    throw error;
  }
}

// Listar pedidos
export async function obtenerPedidos() {
  try {
    const response = await fetch(`${API_URL}/api/pedidos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener pedidos: ${response.status}`);
    }

    const data = await response.json();
    return data.pedidos || [];
  } catch (error) {
    console.error("Error en obtenerPedidos:", error);
    throw error;
  }
}

// Verificar conectividad con la API
export async function verificarAPI() {
  try {
    const response = await fetch(`${API_URL}/api/health`, {
      method: "GET",
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}