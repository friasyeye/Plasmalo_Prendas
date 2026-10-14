import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

/**
 * Web en fase de preview para el cliente: nada se rastrea. Al lanzar, cambiar
 * `disallow` por `allow: "/"` (y quitar el noindex del layout raíz).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
