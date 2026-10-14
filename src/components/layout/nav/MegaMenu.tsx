import { cn } from "@/lib/utils";
import { MEGA_MENU_FEATURED, type NavMenuEntry } from "@/config/navigation";
import { MegaMenuTile } from "./MegaMenuTile";
import { NAV_TRANSITION } from "./transition";

interface MegaMenuProps {
  id: string;
  entry: NavMenuEntry;
  open: boolean;
  onNavigate: () => void;
}

/**
 * Panel desplegable a todo el ancho: las primeras entradas del menú como
 * tarjetas + "Descubrir todo" (patrón de Nude Project).
 *
 * Siempre montado y oculto con `invisible` (no renderizado condicional): así
 * las imágenes ya están descargadas al hacer hover y el panel aparece a la
 * vez que el fondo blanco del navbar, con la MISMA transición (NAV_TRANSITION).
 * `invisible` también lo saca del tabulador y de los lectores de pantalla.
 *
 * Se posiciona contra el <nav> (absolute inset-x-0 top-full), no contra su
 * botón: por eso el <li> que lo contiene NO debe ser `relative`. Vive en el
 * DOM justo después de su botón para que el tabulador entre en el panel
 * antes de saltar al siguiente menú.
 */
export function MegaMenu({ id, entry, open, onNavigate }: MegaMenuProps) {
  const featured = entry.items.slice(0, MEGA_MENU_FEATURED);

  return (
    <div
      id={id}
      className={cn(
        "absolute inset-x-0 top-full bg-white border-t border-black/10",
        NAV_TRANSITION,
        "transition-[opacity,visibility]",
        open ? "visible opacity-100" : "invisible opacity-0"
      )}
    >
      <ul className="grid grid-cols-4 gap-px bg-black/10">
        {featured.map((item) => (
          <li key={item.label}>
            <MegaMenuTile {...item} onNavigate={onNavigate} />
          </li>
        ))}
        <li>
          <MegaMenuTile
            label="Descubrir todo"
            href={entry.viewAllHref}
            plain
            // Misma proporción que sus vecinas para que la fila quede alineada.
            contain={featured.some((item) => item.contain)}
            onNavigate={onNavigate}
          />
        </li>
      </ul>
    </div>
  );
}
