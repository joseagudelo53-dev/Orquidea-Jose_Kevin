/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // URL de la API backend (ajustar si corre en otro puerto)
  // Para desarrollo local: http://localhost:3000
  // Para producción: el mismo dominio
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  },
};

export default nextConfig;