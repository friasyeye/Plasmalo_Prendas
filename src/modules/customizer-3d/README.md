# Módulo: Personalizador 3D (fase futura — aún no implementado)

Esta carpeta reserva el espacio del futuro personalizador 3D: el usuario verá
su diseño aplicado sobre la prenda en 3D antes de comprar.

## Contrato previsto

- El módulo expondrá **un único punto de entrada público** (`index.ts` con un
  componente, p. ej. `<Customizer3D productHandle={...} />`). El resto de la
  app solo importa desde ese índice, nunca de archivos internos.
- La página de producto lo cargará con `next/dynamic` (import perezoso):
  Three.js / React Three Fiber pesan cientos de KB y solo deben descargarse
  si el usuario abre el personalizador.
- Todas las dependencias 3D (three, @react-three/fiber, @react-three/drei…)
  quedan encapsuladas aquí: ningún otro directorio debe importarlas.
- Para el precio de la personalización, el módulo consumirá las funciones de
  `src/lib/pricing` — no duplicará lógica de precios.

Mientras no se implemente, esta carpeta solo contiene este README.
