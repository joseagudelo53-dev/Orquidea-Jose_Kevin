<<<<<<< HEAD
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
=======
#  Orquídea - Tienda de Equipos que Ahorran Energía

Tienda en línea de equipos eficientes energéticamente, diseñada como proyecto educativo para demostrar habilidades en HTML5, CSS, Sass, Bootstrap y JavaScript Vanilla.

##  Descripción

En 2026, el fenómeno de El Niño ha causado una crisis energética en Colombia. Los precios de la energía han subido drásticamente (de 212 COP/kWh en enero a 942 COP/kWh en agosto). **Orquídea** ayuda a los usuarios a encontrar equipos eficientes que les permitan ahorrar dinero en su factura de energía.

##  Sitio Web

- **GitHub Pages**: [Tu enlace aquí]
- **Repositorio GitHub**: https://github.com/tu-usuario/Orquidea-Jose_Kevin

##  Integrantes del Equipo

- **Jose Andres Agudelo** - Desarrollador Frontend + JavaScript
  - Email: jose.agudelo53@est.iudigital.edu.co
  - Responsable: Estructura HTML, catálogo dinámico, filtros, buscador, carrito

- **Kevin Rosario Cano** - Diseñador UX/UI + Estilos CSS/Sass
  - Email: kevin.rosario@est.iudigital.edu.co
  - Responsable: Estilos Sass, diseño responsivo, personalización Bootstrap, efectos visuales

##  Estructura del Proyecto

```
Orquidea-Jose_Kevin/
├── index.html           # Portada con información sobre El Niño y beneficios
├── catalogo.html        # Catálogo dinámico con filtros, buscador y carrito
├── nosotros.html        # Página con información del equipo
├── contacto.html        # Formulario de contacto (5+ campos)
├── package.json         # Configuración de Node.js y Sass
├── .gitignore           # Archivos a ignorar en Git
├── css/
│   └── estilos.css     # Estilos compilados desde Sass (archivo final que usa el navegador)
├── scss/
│   ├── estilos.scss    # Archivo principal de estilos Sass
│   └── _variables.scss # Parcial Sass: variables, mixins y configuración
├── js/
│   └── tienda.js       # Lógica JavaScript: productos, catálogo, filtros, buscador, carrito
└── README.md           # Este archivo
```

##  Características

### HTML5
- Estructura semántica completa
- Metaetiquetas apropiadas
- Atributos data personalizados
- Comentarios explicativos

### CSS/Sass
- **Bootstrap 5.3.3** personalizado
- **Sass** con variables, mixins, anidamiento y parciales
- **Grid** para el catálogo (3 columnas en desktop)
- **Flexbox** para menú y filtros
- **Diseño responsivo** (celular, tablet, desktop)
- **Transiciones** suaves y efectos hover
- **Paleta de colores** de 6 colores CSS variables

### JavaScript Vanilla
- **Catálogo dinámico**: Generado con template strings
- **Filtros**: 4 botones para categorías
- **Buscador**: Filtrado en tiempo real por nombre
- **Carrito**: Agregar/quitar productos, calcular ahorro
- **11 productos** en 3 categorías
- **4+ funciones propias** para cálculos
- **Manejo de eventos**: Click e input

##  Catálogo de Productos

### Iluminación (4 productos)
- Bombillo LED 9 W
- Panel LED 18 W
- Reflector LED 50 W
- Lámpara de escritorio LED

### Electrodomésticos (4 productos)
- Nevera eficiente
- Aire acondicionado inverter
- Regleta con apagado automático
- Ventilador de torre eficiente

### Energía Solar (3 productos)
- Calentador solar de agua
- Kit de panel solar 550 W
- Bombilla solar recargable

##  Cómo Usar

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/Orquidea-Jose_Kevin.git
cd Orquidea-Jose_Kevin
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Compilar Sass (opcional, si modificas estilos)
```bash
# Compilar una sola vez
npx sass scss/estilos.scss css/estilos.css --no-source-map

# O vigilar cambios en tiempo real
npm run sass:watch
```

### 4. Abrir en el navegador
```bash
# Simplemente abre index.html en tu navegador
# O usa un servidor local (recomendado):
# VS Code: Extensión "Live Server"
# Python: python -m http.server 8000
# Node.js: npx http-server
```

##  Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos y diseño responsivo
- **Sass/SCSS** - Preprocesador CSS
- **Bootstrap 5.3.3** - Framework CSS personalizado
- **JavaScript ES6+** - Lógica de aplicación
- **Google Fonts** - Tipografía (Poppins)
- **Git/GitHub** - Control de versiones y colaboración
- **GitHub Pages** - Hosting

##  Validación

- ✅ HTML válido según W3C
- ✅ CSS válido según W3C
- ✅ Sin errores en la consola del navegador
- ✅ Responsivo en celular, tablet y desktop
- ✅ Funcionalidades probadas

##  Commits

### Jose Andres Agudelo 
1. `Jose: creo estructura HTML de las 4 páginas y carpetas del proyecto`
2. `Jose: programo catálogo dinámico, filtros, buscador y carrito con JavaScript`
3. `Jose: completo páginas nosotros.html y contacto.html con formularios`

### Kevin Rosario Cano 
1. `Kevin: creo sistema de estilos Sass con variables, mixins y paleta de colores`
2. `Kevin: agrego estilos CSS responsivos, Grid, Flexbox y transiciones`
3. `Kevin: personalizo Bootstrap, agrego efectos visuales y refinamientos de diseño`

##  Tag de Entrega

```bash
git tag ea2
git push origin ea2
```

##  Capturas de Pantalla



##  Recursos Utilizados

- [EcoTienda](../ecotienda/) - Proyecto base para referencia
- [Bootstrap Docs](https://getbootstrap.com/)
- [Sass Docs](https://sass-lang.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 📄 Licencia

ISC

## 📧 Contacto

- **Jose Andres Agudelo- C.C:1017247547**: jose.agudelo53@est.iudigital.edu.co
- **Kevin Rosario Cano- C.C: 1038387214**: kevin.rosario@est.iudigital.edu.co

---

**Proyecto Educativo** | Ingeniería Web I | IU Digital de Antioquia | 2026-2
>>>>>>> 08b75d09e481676d9e29e4b7846f7177ac2097c1
