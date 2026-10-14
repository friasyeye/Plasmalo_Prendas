"""
Genera el CSV de importación de Shopify con los modelos SOL'S que pide el
cliente, a partir de los feeds del proveedor (SOLOGROUP_*.csv).

Uso:  python generar_csv_shopify.py            -> shopify_sols.csv (todo)
      python generar_csv_shopify.py 11380      -> shopify_sols_piloto.csv (solo esos modelos)

Decisiones (ver docs/catalogo.md):
- Variantes, precios, EAN e imágenes se copian TAL CUAL del proveedor.
- Precio de variante = "Public price" de SOL'S. La web no lo usa para cobrar
  (el precio real sale de los tramos + personalización vía priceOverride).
- Hombre/mujer = productos distintos.
- Todo entra como BORRADOR y sin seguimiento de inventario.
- Fotos por color: packshot frente/espalda/lateral (n A/B/C) + 1 con modelo (vc A).
  El alt text es "Modelo - Color" para poder agrupar la galería por color.
"""

import csv
import re
import sys
import unicodedata
from collections import defaultdict
from pathlib import Path

csv.field_size_limit(10**8)
HERE = Path(__file__).parent

# referencia SOL'S -> (título, tipo, sectores, pendiente de confirmar)
R, D, I, E, M = (
    "Restauración",
    "Deporte & Fitness",
    "Industria & Construcción",
    "Empresas & Oficinas",
    "Marcas & Creadores",
)
PRODUCTS = {
    "11380": ("Regent", "Camiseta", [R, I], False),
    "04439": ("Pacific", "Polo", [R], True),  # el cliente pidió "Pacific Men"; solo existe unisex
    "04440": ("Pacific Women", "Polo", [R], False),
    "17030": ("Broadway", "Camisa manga corta", [R, E], False),
    "01714": ("Stone", "Sudadera", [R, I], False),
    "47101": ("Snake", "Sudadera con capucha", [R, I], False),
    "46602": ("Replay Men", "Chaqueta softshell", [R, D, I, E], False),
    "46802": ("Replay Women", "Chaqueta softshell", [R, D, I, E], False),
    "88010": ("Gala", "Delantal", [R], False),
    "02917": ("Jared Men", "Pantalón chino", [R, E], False),
    "02918": ("Jared Women", "Pantalón chino", [R, E], True),  # el cliente pidió "Jane Women" (es una camiseta de tirantes)
    "11939": ("Sporty", "Camiseta técnica", [D], False),
    "01180": ("Performer Men", "Polo técnico", [D], False),
    "01179": ("Performer Women", "Polo técnico", [D], False),
    "13251": ("Slam", "Sudadera con capucha", [D], False),
    "03105": ("Spike Men", "Sudadera con capucha", [D], False),
    "03106": ("Spike Women", "Sudadera con capucha", [D], False),
    "04451": ("Blink", "Gorra", [D], False),
    "00571": ("Prime Men", "Polo", [I, E], False),
    "00573": ("Prime Women", "Polo", [I, E], False),
    "02887": ("Race BW Men", "Chaleco softshell", [I], False),
    "02888": ("Race BW Women", "Chaleco softshell", [I], False),
    "44001": ("Winner", "Chaleco reflectante", [I], False),
    "04343": ("Tekapo", "Gorra", [I], False),
    "88112": ("Serpico 55", "Gorro", [I], False),
    "00594": ("Long Beach", "Gorra", [E], False),
    "01668": ("Bubble", "Gorra", [M], False),
    "03997": ("Bucket Twill", "Gorro", [M], False),
    "04101": ("Ibiza", "Tote bag", [M], False),
}

SIZE_ORDER = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "S/M", "M/L"]
ONE_SIZE = "TUN"
# La web vende de XS a 3XL: se descartan las tallas de letra fuera de ese rango.
# (Las numéricas de pantalón y las únicas TUN, S/M, M/L no se tocan.)
EXCLUDED_SIZES = {"XXS", "4XL", "5XL"}
# Orden de fotos por color: primero la prenda puesta (modelo), luego el packshot
# frente / espalda / lateral.
IMAGE_COLUMNS = ["Model picture A", "Packshot picture A", "Packshot picture B", "Packshot picture C"]

# Colores más típicos primero (el primero es el que la web preselecciona).
# Cada entrada casa por el principio del nombre ("negro" -> "Negro profundo").
# Los no listados van después, y los bicolor ("Negro / Rojo") al final.
COLOR_PRIORITY = [
    "negro", "blanco", "gris", "azul marino", "french marino", "azul royal",
    "rojo", "burdeos", "verde", "amarillo", "naranja", "rosa",
]
MAX_IMAGES = 250  # límite de Shopify por producto
# Etiquetas de género que lee el filtro de la web (el resto del campo Gender, como
# "Twin" o "Familia", es marketing del proveedor y se descarta).
GENDER_TAGS = ("Hombre", "Mujer", "Unisex")

HEADERS = [
    "Handle", "Title", "Body (HTML)", "Vendor", "Type", "Tags", "Published",
    "Option1 Name", "Option1 Value", "Option2 Name", "Option2 Value",
    "Variant SKU", "Variant Inventory Tracker", "Variant Inventory Policy",
    "Variant Fulfillment Service", "Variant Price", "Variant Requires Shipping",
    "Variant Taxable", "Variant Barcode", "Image Src", "Image Position", "Image Alt Text",
    "Variant Image", "Status",
]


def load(name):
    with open(HERE / name, encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f, delimiter=";"))


def size_key(size):
    if size in SIZE_ORDER:
        return (0, SIZE_ORDER.index(size), "")
    if size.isdigit():  # tallas de pantalón 036, 038...
        return (1, int(size), "")
    return (2, 0, size)


# Color de portada: para que los listados no sean todos negros, cada producto
# toma uno distinto rotando por esta lista (según su posición en PRODUCTS). Es
# el primer color del producto: su foto es la portada y la web lo preselecciona.
# Solo colores lisos; si el producto no tiene ninguno, manda COLOR_PRIORITY.
COVER_CYCLE = ["azul royal", "blanco", "rojo", "gris", "azul marino", "verde", "burdeos", "naranja"]


def pick_cover(codes, color_name, product_index):
    solids = [c for c in codes if "/" not in color_name[c]]
    for i in range(len(COVER_CYCLE)):
        prefix = COVER_CYCLE[(product_index + i) % len(COVER_CYCLE)]
        for code in solids:
            if color_name[code].lower().startswith(prefix):
                return code
    return None


def color_rank(name):
    lowered = name.lower()
    rank = next(
        (i for i, prefix in enumerate(COLOR_PRIORITY) if lowered.startswith(prefix)),
        len(COLOR_PRIORITY),
    )
    return rank + (100 if "/" in name else 0)


def sentence_case(text):
    text = text.strip().lower()
    return text[:1].upper() + text[1:]


def body_html(model):
    parts = [f"<p>{sentence_case(model['Short description'])}.</p>"]
    if model["Quality"]:
        parts.append(f"<p><strong>Composición:</strong><br />{model['Quality']}</p>")
    if model["Style"]:
        parts.append(f"<p><strong>Detalles:</strong><br />{model['Style']}</p>")
    return "".join(parts)


def handle_for(title):
    ascii_title = unicodedata.normalize("NFKD", title).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", ascii_title.lower()).strip("-")


def build_rows(ref, model, skus):
    model_name, product_type, sectors, pending = PRODUCTS[ref]
    title = f"{product_type} {model_name}"  # p. ej. "Camiseta Regent"
    handle = handle_for(title)
    # Género según el proveedor (columna Gender: "Hombre,Twin,Mujer,Unisex"...). Una prenda
    # unisex lleva Hombre, Mujer y Unisex: así sale al filtrar por cualquiera de los tres.
    gender = [g for g in GENDER_TAGS if g in model["Gender"].split(",")]
    tags = ["SOL'S", f"Ref. {ref}", *sectors, *gender] + (["Pendiente confirmar"] if pending else [])

    # Colores en el orden del proveedor; nombres repetidos se desambiguan con el código.
    by_color = defaultdict(list)
    for s in skus:
        by_color[s["Color code"]].append(s)
    names = defaultdict(list)
    for code, rows in by_color.items():
        names[rows[0]["Color"].strip()].append(code)
    color_name = {
        code: name if len(codes) == 1 else f"{name} ({code})"
        for name, codes in names.items()
        for code in codes
    }

    # Orden de colores (estable: dentro de un mismo rango, el del proveedor).
    color_order = sorted(by_color, key=lambda code: color_rank(color_name[code]))
    cover = pick_cover(color_order, color_name, list(PRODUCTS).index(ref))
    if cover:
        color_order.remove(cover)
        color_order.insert(0, cover)

    one_size = all(s["Size"] == ONE_SIZE for s in skus)

    # Orden talla-primero: así Shopify fija las tallas en orden XS < S < M...
    # (Shopify ordena los valores de opción por primera aparición).
    ordered = sorted(
        skus,
        key=lambda s: (size_key(s["Size"]), color_order.index(s["Color code"])),
    )

    rows = []
    for i, s in enumerate(ordered):
        row = dict.fromkeys(HEADERS, "")
        row.update({
            "Handle": handle,
            "Option1 Name": "Color" if i == 0 else "",
            "Option1 Value": color_name[s["Color code"]],
            "Variant SKU": s["SKU"],
            "Variant Inventory Policy": "continue",
            "Variant Fulfillment Service": "manual",
            "Variant Price": f"{float(s['Public price']):.2f}",
            "Variant Requires Shipping": "TRUE",
            "Variant Taxable": "TRUE",
            "Variant Barcode": s["Code EAN"],
            "Variant Image": s["Packshot picture A"],
        })
        if not one_size:
            row["Option2 Name"] = "Talla" if i == 0 else ""
            row["Option2 Value"] = s["Size"]
        if i == 0:
            row.update({
                "Title": title,
                "Body (HTML)": body_html(model),
                "Vendor": "SOL'S",
                "Type": product_type,
                "Tags": ", ".join(tags),
                "Published": "FALSE",
                "Status": "draft",
            })
        rows.append(row)

    # Imágenes: 4 por color, en el orden de los colores.
    images = []
    for code in color_order:
        first = by_color[code][0]
        for col in IMAGE_COLUMNS:
            if first[col]:
                images.append((first[col], f"{title} - {color_name[code]}"))
    images = images[:MAX_IMAGES]
    for pos, (url, alt) in enumerate(images, start=1):
        row = dict.fromkeys(HEADERS, "")
        row.update({"Handle": handle, "Image Src": url, "Image Position": str(pos), "Image Alt Text": alt})
        rows.append(row)

    return rows, len(ordered), len(by_color), len(images)


def main():
    only = set(sys.argv[1:])
    refs = [r for r in PRODUCTS if not only or r in only]
    models = {m["SKU"]: m for m in load("SOLOGROUP_models_new_ES.csv")}
    skus_by_parent = defaultdict(list)
    for s in load("SOLOGROUP_SKU_products_new_ES.csv"):
        if s["Size"] not in EXCLUDED_SIZES:
            skus_by_parent[s["Parent product"]].append(s)

    out_rows = []
    for ref in refs:
        if ref not in models or not skus_by_parent[ref]:
            print(f"!! {ref} no está en el catálogo del proveedor")
            continue
        rows, n_variants, n_colors, n_images = build_rows(ref, models[ref], skus_by_parent[ref])
        out_rows += rows
        print(f"{ref} {PRODUCTS[ref][1] + ' ' + PRODUCTS[ref][0]:34} variantes={n_variants:4} colores={n_colors:3} imágenes={n_images:4}")

    out = HERE / ("shopify_sols_piloto.csv" if only else "shopify_sols.csv")
    with open(out, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=HEADERS)
        writer.writeheader()
        writer.writerows(out_rows)
    print(f"-> {out.name}: {len(refs)} productos, {len(out_rows)} filas")


if __name__ == "__main__":
    main()
