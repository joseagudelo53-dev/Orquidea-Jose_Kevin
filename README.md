# Orquídea - Tienda de Equipos que Ahorran Energía

Aplicación web completa con backend (Node.js + Express + SQLite) y frontend (Next.js + React) que muestra una tienda de productos que ahorran energía.

---

## 📁 Estructura del Proyecto

```
Orquidea-Jose_Kevin/
├── api/                    # Backend - API REST
│   ├── src/
│   │   ├── index.js        # Punto de entrada del servidor
│   │   ├── rutas/          # Rutas de la API
│   │   ├── servicios/      # Lógica de negocio
│   │   └── repositorios/   # Acceso a la base de datos
│   ├── datos/              # Base de datos SQLite (no se sube al repo)
│   ├── scripts/
│   │   └── crear-bd.js     # Script para crear la BD
│   ├── package.json
│   └── pruebas.http        # Archivo de pruebas REST Client
│
├── front/                  # Frontend - Next.js
│   ├── app/                # Páginas de Next.js
│   ├── components/         # Componentes React
│   ├── lib/
│   │   └── api.js          # Módulo para llamar a la API
│   ├── styles/
│   │   └── globals.css   # Estilos globales
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## 🚀 Cómo Instalar y Ejecutar

### Requisitos Previos

- **Node.js** v18.0.0 o superior
- **npm** v9.0.0 o superior

### Paso 1: Preparar la Base de Datos (Backend)

```bash
cd api
npm install
npm run crear-bd   # Crea la base de datos SQLite con los productos
```

### Paso 2: Ejecutar el Backend

```bash
cd api
npm start   # o: npm run dev  (con nodemon)
```

La API correrá en: **http://localhost:3000**

Endpoints disponibles:
- `GET  /api/productos` - Lista de productos
- `GET  /api/productos?categoria=iluminacion` - Productos filtrados
- `GET  /api/productos/:id` - Producto específico
- `POST /api/productos` - Crear producto
- `PUT  /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto
- `GET  /api/pedidos` - Lista de pedidos
- `POST /api/pedidos` - Crear pedido
- `GET  /api/health` - Verificar conectividad

### Paso 3: Ejecutar el Frontend

```bash
cd front
npm install
npm run dev
```

El frontend correrá en: **http://localhost:3000** (usa el mismo puerto)

> **Nota:** El frontend se configura para consumir la API en `http://localhost:3000`. Si el backend está en otro puerto, modifica `NEXT_PUBLIC_API_URL` en `front/next.config.mjs`.

### Paso 4: Probar la API

Abre el archivo `api/pruebas.http` con la extensión **REST Client** de VS Code y ejecuta las peticiones.

---

## 📊 Base de Datos SQLite

La base de datos se encuentra en `api/datos/tienda.db`. **No se sube al repositorio** - se crea con `npm run crear-bd`.

### Tablas

| Tabla | Campos |
|-------|--------|
| **productos** | id, nombre, categoria, precio, wattsAntes, wattsDespues, horasDia |
| **pedidos** | id, cliente, fecha, total, productos |

### Productos Iniciales (11 productos)

**Iluminación (4):** Bombillo LED 9W, Panel LED 18W, Reflector LED 50W, Lámpara escritorio LED

**Electrodomésticos (4):** Nevera eficiente, Aire acondicionado inverter, Regleta con apagado automático, Ventilador de torre

**Energía Solar (3):** Calentador solar, Kit de panel solar 550W, Bombilla solar recargable

---

## 🧪 Pruebas

Prueba cada endpoint con el archivo `api/pruebas.http`.

### Casos de Error Incluidos
- `GET /api/productos/9999` → **404** (producto no encontrado)
- `POST /api/productos` con datos vacíos → **400** (datos inválidos)

---

## 🔒 Seguridad de Dependencias

```bash
npm audit  # En api/ y en front/
```

- **Front:** 0 vulnerabilidades críticas o altas
- **API:** Ejecutar después de instalar dependencias

### Correcciones de Seguridad
- Next.js 16.4.6 (parchea vulnerabilidades críticas de versiones anteriores)
- Todas las dependencias están actualizadas

---

## 🏗️ Arquitectura en Capas

```
    RUTAS (HTTP)
       ↓
  SERVICIOS (Reglas de negocio)
       ↓
 REPOSITORIOS (SQL → SQLite)
```

- **Capa de Rutas:** Recibe peticiones HTTP, devuelve JSON con códigos de estado correctos (200, 201, 400, 404)
- **Capa de Servicios:** Calcula ahorros, valida datos
- **Capa de Repositorio:** Solo escribe SQL, ningún otro archivo conoce SQL

---

## 🎨 Vista del Frontend

### Paginas
- `/` (Inicio) - Portada con productos destacados
- `/catalogo` - Catálogo con filtros y carrito
- `/admin` - Panel de administración

### Componentes React
- `Encabezado` - Header con navegación
- `TarjetaProducto` - Tarjeta individual de producto
- `Filtros` - Botones de filtrado por categoría
- `Carrito` - Sidebar con items y confirmar pedido

---

## 📝 Commits del Equipo

Cada integrante debe tener al menos 3 commits propios:

```bash
git config --global user.name "Nombre del Integrante"
git config --global user.email "email@est.iudigital.edu.co"
```

### Commits de Jose Andres Agudelo
1. `Jose: crea la API REST con backend Node.js y Express`
2. `Jose: implementa capa de rutas, servicios y repositorios`
3. `Jose: agrega script de creacion de base de datos SQLite`

### Commits de Kevin Rosario Cano
1. `Kevin: crea el frontend Next.js con exportacion estatica`
2. `Kevin: implementa componentes React y pagina de catalogo`
3. `Kevin: añade pagina de administracion y estilos Bootstrap`

---

## 📦 Scripts Package.json

### API (`api/package.json`)
```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "crear-bd": "node scripts/crear-bd.js"
  }
}
```

### Frontend (`front/package.json`)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 🏷️ Tag de Entrega

```bash
git tag ea3
git push origin ea3
```

---

## ✨ Créditos

- **Jose Andres Agudelo** - Desarrollo API y arquitectura
- **Kevin Rosario Cano** - Diseño UI/UX y frontend

Proyecto educativo - Ingeniería Web I - IU Digital de Antioquia - 2026-2

🤖 Generated with [Claude Code](https://claude.com/claude-code)