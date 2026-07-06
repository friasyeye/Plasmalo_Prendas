# Prompt de contexto — Plásmalo

Pega esto al agente (Claude Code u otro) antes de pedirle cualquier cambio
en este proyecto, sobre todo si es un chat nuevo sin historial.

```
Vas a trabajar en el proyecto Plásmalo (ecommerce headless de ropa/merchandising
personalizado). Antes de tocar nada:

1. Lee CLAUDE.md en la raíz del repo — ahí está la arquitectura completa,
   las rutas actuales, las convenciones de nombres y las reglas de desarrollo.
   No lo repitas ni lo resumas, solo síguelo.

2. Reglas que no están sujetas a discusión:
   - No crear rutas ni funcionalidad que yo no haya pedido explícitamente.
   - No tocar copy, contenido ni estilos/CSS ya existentes salvo que el
     cambio que pido lo requiera de forma directa.
   - Sigue la separación de capas del proyecto: app/ compone, components/
     pinta, lib/ calcula y habla con Shopify, config/ contiene datos y
     entorno. Si tu cambio mete lógica de negocio o fetch dentro de un
     componente, está en el sitio equivocado.
   - Cualquier dato nuevo hardcodeado va a src/config/, no dentro del
     componente que lo pinta.
   - Toda variable de entorno se lee vía src/config/env.ts — nunca
     process.env directo en otro archivo.
   - Todo lo que hable con Shopify pasa por src/lib/shopify/ (client,
     queries, adapters). Ningún componente hace fetch directo a la
     Storefront API.
   - Usa siempre <Image> de Next.js, nunca <img>.

3. Soy nuevo programando: explícame el porqué de las decisiones no obvias
   (no solo el qué), y si hay más de una alternativa razonable, dime cuáles
   son y cuál recomiendas y por qué, en vez de asumir una en silencio.

4. Antes de dar por bueno un cambio: verifica que npm run typecheck y
   npm run lint pasan, y si el cambio es visible, arranca npm run dev y
   confírmalo en el navegador (o descríbeme qué no pudiste probar y por qué).

5. Si el cambio implica tocar más de un archivo o reorganizar código,
   explícame el plan antes de ejecutarlo y espera mi confirmación.
```

---

## Contexto específico de la tarea actual (2026-07-06)

Voy a conectar el primer producto real desde Shopify (una camiseta) a la
sección "Elige la prenda y hazla tuya" de la Home (`src/components/home/Categories.tsx`).

Puntos importantes:
- Todavía no sé cuántos productos subirá el cliente en total. El grid de
  esa sección tiene 4 tarjetas (`grid-cols-2 md:grid-cols-4`) y hoy las 4
  son placeholders estáticos en `src/config/home.ts` (`homeCategories`).
- Quiero que **1 tarjeta muestre el producto real de Shopify** (la camiseta)
  y las **otras 3 sigan como placeholders** iguales a como están ahora,
  hasta que el cliente confirme el resto del catálogo. No quiero productos
  de prueba/mentira creados en Shopify solo para rellenar huecos.
- Ya tengo configuradas las variables de entorno en `.env.local`
  (`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`), que
  `src/config/env.ts` expone vía `getShopifyConfig()`.
- La capa `src/lib/shopify/` ya tiene el esqueleto (`client.ts` con
  `shopifyFetch`, carpeta `queries/`, `types.ts`, `adapters.ts`) pero
  ninguna query real todavía — hay que escribir la primera.
- Decide conmigo (no asumas en silencio) cómo debe verse el tipo de dato
  en `config/home.ts` para poder mezclar "producto real" y "placeholder"
  en el mismo array sin duplicar lógica en el componente.
