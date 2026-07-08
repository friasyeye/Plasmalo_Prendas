import { notFound } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductConfigurator } from "@/components/product/ProductConfigurator";
import { ProductGallery } from "@/components/product/ProductGallery";
import { getProduct } from "@/lib/shopify/client";
import { camisetaCustomizations } from "@/config/pricing";

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
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Galería */}
            <div className="flex items-start">
              <ProductGallery images={product.images} productTitle={product.title} />
            </div>

            {/* Información del producto */}
            <div className="flex flex-col gap-8">
              <div>
                <h1
                  style={{ fontFamily: "var(--font-general-sans)", fontWeight: 600 }}
                  className="text-black text-4xl md:text-5xl mb-4 leading-tight"
                >
                  {product.title}
                </h1>
                <p className="text-gray-600 text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              <ProductConfigurator
                priceTiers={product.priceTiers}
                customizations={camisetaCustomizations}
                options={product.options}
                variants={product.variants}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
