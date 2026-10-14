import { getProductPhoto } from "@/lib/shopify/client";
import type { NavEntry } from "@/config/navigation";

/**
 * Rellena `image` en las entradas de menú que piden una foto de producto
 * (`photo`). Si la foto no se encuentra, la entrada queda sin imagen y se
 * pinta el placeholder gris. Las entradas que ya traen `image` no se tocan.
 */
export async function withNavPhotos(entries: NavEntry[]): Promise<NavEntry[]> {
  return Promise.all(
    entries.map(async (entry) => {
      if (entry.type !== "menu") return entry;
      const items = await Promise.all(
        entry.items.map(async (item) => {
          if (item.image || !item.photo) return item;
          const photo = await getProductPhoto(item.photo.handle, item.photo.color);
          return photo ? { ...item, image: photo.url, contain: true } : item;
        })
      );
      return { ...entry, items };
    })
  );
}
