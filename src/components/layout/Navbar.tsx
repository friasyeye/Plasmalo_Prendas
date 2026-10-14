import { navigation } from "@/config/navigation";
import { withNavPhotos } from "@/lib/navigation";
import { NavbarClient } from "./NavbarClient";

interface NavbarProps {
  /** Ver NavbarClient: "solid" (por defecto) u "overlay" sobre un hero oscuro. */
  variant?: "solid" | "overlay";
}

/**
 * Navbar: server component que resuelve las fotos de producto del mega-menú
 * (Shopify, con la caché de 2 h del resto del catálogo) y se las pasa al
 * componente cliente, que gestiona hover, scroll y menú móvil.
 */
export async function Navbar({ variant }: NavbarProps) {
  const entries = await withNavPhotos(navigation);
  return <NavbarClient entries={entries} variant={variant} />;
}
