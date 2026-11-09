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
