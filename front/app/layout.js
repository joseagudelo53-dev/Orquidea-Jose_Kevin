// =============================================================
// Layout global de Next.js
// =============================================================
import "./app.css";

export const metadata = {
  title: "Orquídea - Tienda de Equipos que Ahorran Energía",
  description: "Encuentra equipos eficientes que te ahorran dinero en la factura de energía.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}