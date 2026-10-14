import { cache } from "react";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs";
import { ProductView } from "@/components/product/ProductView";
import { getProduct } from "@/lib/shopify/client";
import { categoryPath, productLocation, productPath } from "@/lib/catalog/paths";
import { camisetaCustomizations } from "@/config/pricing";
import { prendasSection } from "@/config/catalog";

interface ProductPageProps {
  params: Promise<{ categoria: string; handle: string }>;
}

/** generateMetadata y la página comparten la misma carga dentro de una petición. */
const loadProduct = cache(async (handle: string) => {
  const product = await getProduct(handle);
  const location = product && productLocation(product.collections);
  return product && location ? { product, location } : null;
});

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const loaded = await loadProduct(handle);
  if (!loaded) return {};
  const { product, location } = loaded;

  return {
    title: `${product.title} | Plásmalo`,
    description: product.description || undefined,
    alternates: { canonical: productPath(location, product.handle) },
  };
}

/**
 * Ficha de producto en /prendas/[categoria]/[handle]. La categoría sale de las
 * colecciones de Shopify del producto (lib/catalog/paths.ts). Si se entra con
 * otra categoría, se redirige a la buena: cada producto tiene UNA sola URL.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { categoria, handle } = await params;
  const loaded = await loadProduct(handle);
  if (!loaded) notFound();

  const { product, location } = loaded;
  const path = productPath(location, product.handle);
  if (path !== `${prendasSection.basePath}/${categoria}/${handle}`) permanentRedirect(path);

  const { section, category } = location;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="px-4 md:px-8 py-6 md:py-10 max-w-7xl mx-auto">
          <div className="mb-5 md:mb-8">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: section.label, href: section.basePath },
                { label: category.label, href: categoryPath(section, category) },
                { label: product.title },
              ]}
            />
          </div>

          <ProductView
            productHandle={product.handle}
            title={product.title}
            description={product.description}
            featuredImage={product.featuredImage}
            images={product.images}
            priceTiers={product.priceTiers}
            customizations={camisetaCustomizations}
            details={product.details}
            options={product.options}
            variants={product.variants}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
