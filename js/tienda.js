// =============================================================
// Orquídea: el catálogo y el carrito, con JavaScript Vanilla
// Cada linea tiene un comentario: QUE hace y PARA QUE
// =============================================================

// === CONSTANTES ===
const TARIFA = 950;            // Lo que cuesta 1 kWh, en pesos (COP)
const DIAS_MES = 30;           // Días de un mes

// === ARREGLO DE OBJETOS: la lista de productos ===
const productos = [
    // --- ILUMINACIÓN ---
    { id: 1, nombre: "Bombillo LED 9 W", categoria: "iluminacion", precio: 8900,
      wattsAntes: 60, wattsDespues: 9, horasDia: 5 },
    { id: 2, nombre: "Panel LED 18 W", categoria: "iluminacion", precio: 35000,
      wattsAntes: 40, wattsDespues: 18, horasDia: 8 },
    { id: 3, nombre: "Reflector LED 50 W", categoria: "iluminacion", precio: 59000,
      wattsAntes: 250, wattsDespues: 50, horasDia: 6 },
    { id: 4, nombre: "Lámpara de escritorio LED", categoria: "iluminacion", precio: 45000,
      wattsAntes: 75, wattsDespues: 12, horasDia: 4 },

    // --- ELECTRODOMÉSTICOS ---
    { id: 5, nombre: "Nevera eficiente", categoria: "electrodomesticos", precio: 1890000,
      wattsAntes: 80, wattsDespues: 40, horasDia: 24 },
    { id: 6, nombre: "Aire acondicionado inverter", categoria: "electrodomesticos", precio: 2100000,
      wattsAntes: 1400, wattsDespues: 900, horasDia: 6 },
    { id: 7, nombre: "Regleta con apagado automático", categoria: "electrodomesticos", precio: 65000,
      wattsAntes: 15, wattsDespues: 0, horasDia: 20 },
    { id: 8, nombre: "Ventilador de torre eficiente", categoria: "electrodomesticos", precio: 120000,
      wattsAntes: 75, wattsDespues: 35, horasDia: 8 },

    // --- ENERGÍA SOLAR ---
    { id: 9, nombre: "Calentador solar de agua", categoria: "solar", precio: 1200000,
      wattsAntes: 3500, wattsDespues: 0, horasDia: 0.5 },
    { id: 10, nombre: "Kit de panel solar 550 W", categoria: "solar", precio: 2400000,
      wattsAntes: 550, wattsDespues: 0, horasDia: 4.5 },
    { id: 11, nombre: "Bombilla solar recargable", categoria: "solar", precio: 35000,
      wattsAntes: 20, wattsDespues: 0, horasDia: 4 }
];

// === VARIABLE: el carrito ===
let carrito = [];

// === FUNCIÓN 1: Ahorro en kWh al mes ===
function ahorroKwhMes(producto) {
    return (producto.wattsAntes - producto.wattsDespues) * producto.horasDia * DIAS_MES / 1000;
}

// === FUNCIÓN 2: Ahorro en pesos al mes ===
function ahorroPesosMes(producto) {
    return ahorroKwhMes(producto) * TARIFA;
}

// === FUNCIÓN 3: Formato en pesos colombianos ===
function pesos(valor) {
    return "$" + Math.round(valor).toLocaleString("es-CO");
}

// === FUNCIÓN 4: Nombre de la categoría para mostrar ===
// En los datos se guarda sin tildes ("iluminacion") y en la página se muestra bonito ("Iluminación")
// Esta función convierte los nombres internos a nombres legibles para el usuario
function nombreCategoria(categoria) {
    // CONDICIONAL: if = "si"; else if = "si no, si"; else = "si no"
    // === compara si son EXACTAMENTE iguales (mismo texto, mismas minúsculas)
    if (categoria === "iluminacion") {
        // Si la categoría es "iluminacion", devuelve el nombre con tilde
        return "Iluminación";
    } else if (categoria === "electrodomesticos") {
        // Si es "electrodomesticos", devuelve con tilde y acento
        return "Electrodomésticos";
    } else {
        // Si no es ninguna de las dos anteriores, solo queda "solar"
        return "Energía solar";
    }
}

// === MOSTRAR PRODUCTOS ===
function mostrarProductos(categoria, filtro = "") {
    const contenedor = document.querySelector("#productos");
    contenedor.innerHTML = "";

    for (const producto of productos) {
        // Filtro por categoría
        if (categoria !== "todas" && producto.categoria !== categoria) {
            continue;
        }

        // Filtro por búsqueda
        if (filtro && !producto.nombre.toLowerCase().includes(filtro.toLowerCase())) {
            continue;
        }

        contenedor.innerHTML += `
            <article class="tarjeta">
                <span class="categoria">${nombreCategoria(producto.categoria)}</span>
                <h3>${producto.nombre}</h3>
                <p>Reemplaza un equipo de ${producto.wattsAntes} W.
                   Ahorra <span class="ahorro">${ahorroKwhMes(producto).toFixed(1)} kWh</span> al mes.</p>
                <p class="precio">${pesos(producto.precio)}</p>
                <p>Ahorro al mes: <span class="ahorro">${pesos(ahorroPesosMes(producto))}</span></p>
                <button class="btn btn-primary btn-sm" data-id="${producto.id}">Agregar al carrito</button>
            </article>`;
    }
}

// === AGREGAR AL CARRITO ===
function agregarAlCarrito(id) {
    for (const producto of productos) {
        if (producto.id === id) {
            carrito.push(producto);
        }
    }
    mostrarCarrito();
}

// === MOSTRAR CARRITO ===
function mostrarCarrito() {
    const lista = document.querySelector("#lista-carrito");
    lista.innerHTML = "";

    let total = 0;
    let ahorroMes = 0;

    for (const producto of carrito) {
        lista.innerHTML += `<li>${producto.nombre}: ${pesos(producto.precio)}</li>`;
        total += producto.precio;
        ahorroMes += ahorroPesosMes(producto);
    }

    document.querySelector("#total").textContent = "Total: " + pesos(total);

    if (carrito.length === 0) {
        document.querySelector("#ahorro").textContent = "El carrito está vacío.";
    } else {
        const meses = Math.ceil(total / ahorroMes);
        document.querySelector("#ahorro").textContent =
            `Ahorra ${pesos(ahorroMes)} al mes: la compra se paga sola en ${meses} meses.`;
    }
}

// === EVENTOS ===

// Evento: Filtros por categoría
const botonesFiltro = document.querySelectorAll(".filtro");
for (const boton of botonesFiltro) {
    boton.addEventListener("click", function () {
        for (const otro of botonesFiltro) {
            otro.classList.remove("activo");
        }
        boton.classList.add("activo");
        const filtro = document.querySelector("#buscador").value;
        mostrarProductos(boton.dataset.categoria, filtro);
    });
}

// Evento: Buscador en tiempo real
const buscador = document.querySelector("#buscador");
if (buscador) {
    buscador.addEventListener("input", function () {
        let categoriaActiva = "todas";
        for (const boton of botonesFiltro) {
            if (boton.classList.contains("activo")) {
                categoriaActiva = boton.dataset.categoria;
                break;
            }
        }
        mostrarProductos(categoriaActiva, buscador.value);
    });
}

// Evento: Agregar al carrito
document.querySelector("#productos").addEventListener("click", function (evento) {
    if (evento.target.dataset.id) {
        agregarAlCarrito(Number(evento.target.dataset.id));
    }
});

// Evento: Vaciar carrito
document.querySelector("#vaciar").addEventListener("click", function () {
    carrito = [];
    mostrarCarrito();
});

// === AL CARGAR LA PÁGINA ===
mostrarProductos("todas");
mostrarCarrito();
