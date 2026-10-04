import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductView } from "@/components/product/ProductView";
import { getProduct } from "@/lib/shopify/client";
import { camisetaCustomizations, camisetaDetails } from "@/config/pricing";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="px-4 md:px-8 py-6 md:py-10 max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-5 md:mb-8">
            <ol className="flex items-center gap-1.5 text-xs text-gray-500">
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-800 font-medium truncate max-w-[200px]">
                {product.title}
              </li>
            </ol>
          </nav>

          <ProductView
            productHandle={product.handle}
            title={product.title}
            description={product.description}
            featuredImage={product.featuredImage}
            priceTiers={product.priceTiers}
            customizations={camisetaCustomizations}
            details={camisetaDetails}
            options={product.options}
            variants={product.variants}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
