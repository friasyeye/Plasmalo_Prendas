# Catálogo de prendas

Lista del cliente: `catalogo/prendas_por_sector.csv` (sector, categoría, modelo, proveedor).

## Decisiones

- Se copia del proveedor **tal cual**: todas sus tallas, colores, EAN e imágenes.
- **Hombre/mujer = productos distintos** (sus unidades no suman para el tramo de descuento).
- **Precio de variante = precio público del proveedor.** La web nunca muestra la prenda sola
  (siempre con personalización) ni cobra ese precio: el precio real sale de los tramos
  (metaobjeto `tabla_de_precios`) + personalización, vía `priceOverride` en el checkout.
- Subida con la **importación CSV nativa de Shopify** (Productos → Importar), todo como borrador
  y sin seguimiento de inventario.
- Peso: no se importa (el feed de SOL'S trae 0,4 kg de relleno en todo y los envíos son tarifa fija).

## SOL'S — estado

Generador: `catalogo/generar_csv_shopify.py` → `catalogo/shopify_sols.csv` (29 productos,
~1.800 variantes). `python generar_csv_shopify.py 11380` genera un piloto solo con el Regent.

Fotos por color (en este orden): prenda puesta (modelo) + packshot frente/espalda/lateral;
alt text `Título - Color`. Colores ordenados con los típicos primero (`COLOR_PRIORITY` en el
generador: negro, blanco, gris, azul marino…; bicolor al final). El primero es el que la web
preselecciona. Ambos órdenes quedan guardados en Shopify y se pueden reordenar desde el admin.

**No encontrados en el catálogo de SOL'S** (pendiente de que el cliente elija sustituto):

| Pedido por el cliente | Sector(es) | Situación | Alternativa propuesta |
|---|---|---|---|
| Bonus (gorro) | Deporte & Fitness | No existe | Serpico 55, Pittsburgh o Blizzard |
| Broadway Men (camisa manga larga) | Restauración, Empresas | Broadway solo existe en manga corta hombre | Brighton (stretch, manga larga, hombre) |
| Broadway Women (camisa manga larga) | Restauración, Empresas | No existe | Eden (stretch manga larga) / Excess (manga corta) |

**Incluidos con sustituto, pendientes de confirmar** (llevan la etiqueta `Pendiente confirmar`):

| Pedido | Subido como | Motivo |
|---|---|---|
| Pacific Men | Pacific (unisex, ref. 04439) | No hay versión Men |
| Jane Women (pantalón chino) | Jared Women (ref. 02918) | SOL'S Jane es una camiseta de tirantes |

Notas: el Slam figura como "Sudadera" pero es con capucha. Performer, Prime, Race BW, Replay y
Spike se suben en versión Men y Women.

## Stanley/Stella — pendiente

Falta el feed del proveedor (CSV vía helpdesk@stanleystella.com). Modelos pedidos:
Creator 2.0, Stella Mia (STTW962), Cruiser 2.0, Freestyler, Sparker 2.0, Prepster 2.0,
Drummer 2.0, Trainer 2.0 (solo si se incorpora), Tote Bag.

## Otros pendientes

- Pantalón laboral (Industria & Construcción): modelo a confirmar por el cliente.
- Cada producto necesita su `tabla_de_precios` (tramos) enlazada antes de publicarse.
- Personalizaciones (zonas y precios): `camisetaCustomizations` se aplica a TODOS los productos.
  Falta definir con el cliente las zonas de cada familia (una gorra no lleva Espalda/Manga).

## Cómo lee la web cada producto (hecho 2026-10-04)

Todo sale de Shopify, sin código por producto:
- Variantes: se piden en páginas de 250 (el Regent tiene 301).
- Fotos por color: las imágenes del producto con alt "<Título> - <Color>" (lo pone el CSV).
  Si se renombra un producto, el alt ya subido no cambia, pero la web empareja por el final
  (" - <Color>"), así que no se rompe.
- Composición y detalles: se leen de la descripción (`<p><strong>Título:</strong><br />líneas…</p>`),
  que es el formato que genera el CSV y conserva el editor de Shopify.
- Colores: círculo con el hex de `src/config/colors.ts`, GENERADO por
  `catalogo/generar_colores.py` desde las muestras del proveedor (bicolor = círculo partido;
  3+ colores o color sin hex → foto de la prenda). Con más de 15 colores se pliega a 12 + "+N colores".
  Si SOL'S añade colores, volver a ejecutar el script.
- Precio: tabla de tramos del metacampo `tabla_de_precios` (enlazar a cada producto).

## Fotos de la Home

- **4 categorías** (`homeCategories` en `config/home.ts`): cada una toma la foto de un producto real, opcionalmente de un color (`photoColor`).
- **Fila de productos**: la lista y el orden los manda la colección manual `destacados` de Shopify (hasta 12). `featuredPhotoColors` (handle → color) fuerza el color de la foto solo en los productos listados; el resto usa su portada, así que cambiar la colección nunca rompe nada. Foto = primera con alt `"<Título> - <Color>"` (la del modelo va primero).
- Ambas usan `getProductPhoto` (consulta ligera de fotos, caché 2 h). Si el color pedido ya no existe, cae a la portada.

## Colecciones de categoría (creadas 2026-10-06)

Colecciones **inteligentes** por tipo de producto (orden manual, editable en el admin; la descripción
es el texto de la categoría en la web). Publicadas en Tienda online, NextJS Frontend y Plasmalo Prendas Headless
(sin el canal headless, la Storefront API devuelve `null`).

| Handle | Regla (tipo de producto) |
|---|---|
| `prendas` | cualquiera de las de abajo (todas las prendas) |
| `sudaderas` | empieza por "Sudadera" |
| `chaquetas` | empieza por "Chaqueta" o "Chaleco" |
| `camisetas` | empieza por "Camiseta" |
| `polos` | empieza por "Polo" |
| `camisas` | empieza por "Camisa" |
| `pantalones` | empieza por "Pantalón" |
| `gorras` | empieza por "Gorra" o "Gorro" |
| `accesorios` | es "Delantal" o "Tote bag" (la bolsa pasará a Merchandising) |

Un producto nuevo entra solo en su categoría si su **tipo** sigue estos nombres. Un tipo nuevo
(p. ej. "Jersey") necesita su regla en `prendas` y su propia colección.

## Listados `/prendas` y `/prendas/[categoria]`

- **Config** (`config/catalog.ts`): `prendasSection` = ruta base, colección de "todo" y categorías
  (slug, nombre, colección) en el orden de la franja. Navbar (Prendas) sale de aquí. Merchandising
  será otra sección igual + dos rutas finas que reutilizan `components/catalog/`.
- **Datos** (`lib/catalog/listing.ts` → `getCatalogListing`): la colección completa (`getCollection`,
  páginas de 250) + qué categorías tienen productos (`getNonEmptyCollections`, 1 petición);
  las vacías no salen en la franja. Título/descripción/SEO = los de la colección en el admin.
- **Filtros** (`lib/catalog/filters.ts`, lógica pura): estado en la URL
  (`?color=negro,azul&sector=restaurantes&genero=mujer`), filtrado en memoria en
  servidor. Color por familias (`colorFamilies`: el color principal del nombre, primera familia
  que encaje). Sector = etiquetas del CSV. Género = etiquetas `Hombre`/`Mujer`/`Unisex`, sacadas de la columna
  Gender del feed (las pone el generador; puestas en los 29 el 2026-10-06). Unisex lleva las tres:
  sale al filtrar por Hombre, por Mujer o por Unisex. Recuentos disyuntivos; se ocultan opciones a 0 y filtros con <2 opciones.
- **Sin selector de orden** (decisión: en ropa personalizada no aporta): manda el orden de la colección en el admin.
- **SEO**: canónica = URL limpia y absoluta (`siteUrl` en `config/site.ts` → `metadataBase`); con filtros `noindex, follow`.
- **UI** (`components/catalog/`): `CatalogListingView` (migas, h1, franja, rejilla), `CatalogResults`
  (cliente: barra, etiquetas activas, `router.replace` + `useOptimistic`), `FilterDrawer` (`<dialog>`
  nativo), `ProductCard` (compartida con la fila de la Home).

## URLs de producto

`/prendas/[categoria]/[handle]` (la antigua `/product/[handle]` se eliminó sin redirecciones: la web
nunca se indexó). La categoría NO se guarda: es la primera categoría de `catalogSections`
(`config/catalog.ts`) cuya colección contiene el producto (`productLocation` en `lib/catalog/paths.ts`).
Productos sin categoría se descartan de listados y home (no tendrían página). Entrar con otra
categoría en la URL redirige a la buena. Migas y su BreadcrumbList (JSON-LD) en listados y ficha.
Sin JSON-LD de Product: Google lo marca como error sin precio (`offers`), y el precio depende de
tramos + personalización; se valorará al lanzar. `/sitemap.xml` se genera solo desde Shopify.
