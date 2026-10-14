"""
Genera src/config/colors.ts: nombre de color (tal cual sale como valor de la
opción "Color" en Shopify) -> hex, leído de las muestras de color que publica
el proveedor (columna "Color Url" del feed de SKUs).

Uso:  python generar_colores.py

- Color liso: un hex ("#1d6fa5").
- Color bicolor (mitades claramente distintas): dos hex ("#000000,#ffffff"),
  que la web pinta como círculo partido.
- Mismo nombre con muestras distintas en varios modelos: gana la primera y se
  avisa por pantalla (revisar si la diferencia es grande).

Debe usar los mismos nombres que generar_csv_shopify.py (incluida la
desambiguación "Nombre (código)" cuando un modelo repite nombre de color).
"""

import io
import statistics
import urllib.request
from collections import defaultdict
from pathlib import Path

from PIL import Image

import generar_csv_shopify as gen

HERE = Path(__file__).parent
OUT = HERE.parent / "src" / "config" / "colors.ts"
SPLIT_THRESHOLD = 60  # distancia RGB entre mitades para considerar bicolor


def median_rgb(img, box):
    pixels = list(img.crop(box).get_flattened_data())
    return tuple(int(statistics.median(p[i] for p in pixels)) for i in range(3))


def distance(a, b):
    return sum((x - y) ** 2 for x, y in zip(a, b)) ** 0.5


def to_hex(rgb):
    return "#{:02x}{:02x}{:02x}".format(*rgb)


def swatch_hex(url, cache={}):
    if url in cache:
        return cache[url]
    with urllib.request.urlopen(url, timeout=30) as response:
        img = Image.open(io.BytesIO(response.read())).convert("RGB")
    w, h = img.size
    mx, my = w // 6, h // 6  # margen para evitar bordes
    left = median_rgb(img, (mx, my, w // 2 - 1, h - my))
    right = median_rgb(img, (w // 2 + 1, my, w - mx, h - my))
    if distance(left, right) > SPLIT_THRESHOLD:
        result = f"{to_hex(left)},{to_hex(right)}"
    else:
        result = to_hex(median_rgb(img, (mx, my, w - mx, h - my)))
    cache[url] = result
    return result


def main():
    skus_by_parent = defaultdict(list)
    for s in gen.load("SOLOGROUP_SKU_products_new_ES.csv"):
        if s["Size"] not in gen.EXCLUDED_SIZES:
            skus_by_parent[s["Parent product"]].append(s)

    colors = {}
    for ref in gen.PRODUCTS:
        by_code = {}
        for s in skus_by_parent[ref]:
            by_code.setdefault(s["Color code"], s)

        # misma desambiguación de nombres que build_rows
        names = defaultdict(list)
        for code, s in by_code.items():
            names[s["Color"].strip()].append(code)

        for name, codes in names.items():
            for code in codes:
                label = name if len(codes) == 1 else f"{name} ({code})"
                if label.count("/") >= 2:  # 3+ colores: no cabe en un círculo, se usa la foto
                    continue
                value = swatch_hex(by_code[code]["Color Url"])
                if label in colors and colors[label] != value:
                    print(f"  aviso: '{label}' distinto en {gen.PRODUCTS[ref][0]}: {colors[label]} vs {value}")
                    continue
                colors[label] = value

    lines = [
        "/**",
        " * Color -> hex para los selectores de color. GENERADO por",
        " * catalogo/generar_colores.py a partir de las muestras del proveedor:",
        " * no editar a mano, regenerar. Dos hex separados por coma = bicolor.",
        " * Un color que no esté aquí se pinta con la foto del producto.",
        " */",
        "export const colorSwatches: Record<string, string> = {",
    ]
    for name in sorted(colors):
        lines.append(f'  "{name}": "{colors[name]}",')
    lines.append("};")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    two_tone = sum(1 for v in colors.values() if "," in v)
    print(f"-> {OUT.relative_to(HERE.parent)}: {len(colors)} colores ({two_tone} bicolor)")


if __name__ == "__main__":
    main()
