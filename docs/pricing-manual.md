# Manual del pricing de Plásmalo

## 1. El descuento siempre es automático
El cliente cambia la cantidad y el precio baja solo. No tiene que introducir códigos ni hacer cálculos.

## 2. Mostrar el ahorro en dinero, no en porcentajes
El objetivo del configurador no es decirle al cliente que tiene un descuento, sino que entienda cuánto dinero puede ahorrar aumentando ligeramente su pedido. Los porcentajes son abstractos, el dinero es inmediato.

**No mostrar:**
- "Ahorra un 12%"
- "Descuento del 8%"
- "Compra más"

**Mostraremos:**
- "Añade solo 1 camiseta más y ahorrarás 13,75€ en este pedido."
- "Te faltan 6 unidades para ahorrar 32,45€."

El ahorro se calcula siempre sobre el pedido completo, nunca sobre una sola prenda.

## 3. El configurador recalcula el precio en tiempo real

### Regla 1 — Se compra un pedido, no una camiseta
El precio importante no es solo el unitario, es el ahorro total.

Ejemplo: cliente tiene 24 camisetas.
> Te falta solo 1 camiseta para entrar en el siguiente tramo.
> Añadiendo 1 unidad: el precio baja de 6,45€ a 5,90€.
> Ahorrarás 13,75€ en todo el pedido.

### Regla 2 — Solo cambia el precio de la prenda
El precio de una camiseta se forma de dos bloques:

**A. Precio de la prenda** (cambia según cantidad)
| Cantidad | Precio |
|---|---|
| 1 camiseta | 5,25€ |
| 50 camisetas | 8,10€ |
| 200 camisetas | 4,15€ |

**B. Personalización** (nunca cambia, siempre vale lo mismo, da igual si compras 1 / 10 / 100 / 500)
| Zona | Precio |
|---|---|
| Escudo | +1€ |
| Frontal | +2,10€ |
| Espalda | +2,10€ |
| Manga | +1€ |

**Cálculo siempre:** precio prenda según cantidad + personalizaciones seleccionadas.

Ejemplo (100 camisetas, Escudo + Espalda):
- Precio prenda: 4,70€
- Escudo: +1€, Espalda: +2,10€
- Total unidad: 7,80€
- Total pedido: 7,80€ × 100 = 780€ + IVA

**Importante:** nunca se recalculan las personalizaciones, solo cambia el precio de la prenda.

### C. El IVA
Mostrar:
- Precio grande: `7,80€ + IVA`
- Debajo en pequeño: `9,44€ IVA incluido`

Así se eliminan dudas, todo es transparente, no se esconde nada.

### D. El resumen siempre visible
Mientras el cliente configura, a la derecha, siempre visible:

Tu pedido: 100 camisetas
Precio unidad: 7,80€
IVA: 21%
Total: 943,80€


Nunca se oculta el resumen.

## E. El configurador debe guiar al cliente
No solo informa, acompaña. Cada vez que se modifica la cantidad, la web indica el siguiente paso más inteligente.

Ejemplo: cliente tiene 43 camisetas.
> Solo te faltan 7 unidades para acceder al siguiente descuento.

Al añadir las 7, no solo se dice que compre más — se le dice qué gana.

## F. Tabla de tramos de precio (producto de referencia: camiseta Regent)

| Cantidad | Precio sin IVA | Precio con IVA |
|---|---|---|
| 1-3 | 8,10€ | 9,80€ |
| 4-9 | 7,10€ | 8,59€ |
| 10-24 | 6,45€ | 7,80€ |
| 25-49 | 5,90€ | 7,14€ |
| 50-99 | 5,25€ | 6,35€ |
| 100-199 | 4,70€ | 5,69€ |
| 200-299 | 4,15€ | 5,02€ |

**Personalización**
| Zona | Sin IVA | Con IVA |
|---|---|---|
| Escudo | 1,00€ | 1,21€ |
| Frontal | 2,10€ | 2,54€ |
| Espalda | 2,10€ | 2,54€ |
| Manga | 1,00€ | 1,21€ |

Estos son los precios internos que la web debe sumar según cantidad y tipo(s) de personalización (puede haber una o varias a la vez). Justo debajo del selector de cantidad deben aparecer las unidades restantes para el siguiente descuento (en número o en ahorro).

El descuento se aplica automáticamente a todo el pedido.

Ejemplo: "Añade solo 6 camisetas más y ahorrarás 32,45€ en este pedido."
>