import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/config/site";

export interface BreadcrumbItem {
  label: string;
  /** Sin href = página actual (último elemento). */
  href?: string;
}

/**
 * Migas de pan: Inicio / Prendas / Polos / Polo Pacific. Incluye su versión
 * para Google (BreadcrumbList), que puede mostrar la ruta en el resultado de
 * búsqueda en vez de la URL. El último elemento va sin URL, como pide Google.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Migas de pan">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-black/50">
        {items.map(({ label, href }, index) => (
          <li key={label} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">/</span>}
            {href ? (
              <Link href={href} className="hover:text-black transition-colors">
                {label}
              </Link>
            ) : (
              <span aria-current="page" className="text-black">
                {label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map(({ label, href }, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: label,
            ...(href && { item: new URL(href, siteUrl).toString() }),
          })),
        }}
      />
    </nav>
  );
}
