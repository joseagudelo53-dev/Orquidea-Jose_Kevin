// =============================================================
// Middleware de manejo de errores para la API
// Captura errores con codigo HTTP y devuelve JSON uniforme
// =============================================================
function errorHandler(err, req, res, next) {
  const codigo =
    err && err.codigo && Number.isInteger(err.codigo) ? err.codigo : 500;

  const respuesta = {
    error: true,
    mensaje:
      codigo === 400
        ? "Datos inválidos"
        : codigo === 404
          ? "Recurso no encontrado"
          : "Error interno del servidor",
  };

  if (codigo === 400 && err.detalles) {
    respuesta.detalles = err.detalles;
  }

  res.status(codigo).json(respuesta);
}

module.exports = errorHandler;
