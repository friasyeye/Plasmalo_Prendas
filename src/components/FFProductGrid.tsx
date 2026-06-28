import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Product {
  name: string;
  category?: string;
  price: string;
  salePrice?: string;
  image: string;
}

interface FFProductGridProps {
  title: string;
  products: Product[];
}

export function FFProductGrid({ title, products }: FFProductGridProps) {
  return (
    <section>
      {/* Section header */}
      <div className="flex justify-between items-center mb-8 px-8 pt-16">
        <h1
          style={{
            fontFamily: "var(--font-bebas-neue), 'Bebas Neue', sans-serif",
            fontSize: "48px",
            color: "rgb(0, 0, 0)",
            lineHeight: 1,
          }}
        >
          {title}
        </h1>
        <a
          href="#"
          style={{
            fontFamily: "var(--font-spline-sans), 'Spline Sans', sans-serif",
            fontSize: "16px",
            color: "rgb(0, 0, 0)",
            textDecoration: "none",
          }}
          className="hover:underline"
        >
          View more
        </a>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-3 gap-4 px-8 pb-16">
        {products.map((product, index) => (
          <article key={`${product.name}-${index}`} className="cursor-pointer group">
            {/* Image area */}
            <div
              className="relative overflow-hidden bg-[rgb(245,245,245)]"
              style={{ height: "340px" }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {/* "View more" pill */}
              <button
                className="absolute top-3 right-3 bg-[rgb(245,245,245)] text-black text-xs px-3 py-1.5 flex items-center gap-1"
                style={{
                  fontFamily: "var(--font-spline-sans), 'Spline Sans', sans-serif",
                }}
              >
                View more
                <ArrowUpRight size={12} />
              </button>
            </div>

            {/* Card info */}
            <div className="pt-3">
              {/* Row 1: name + price */}
              <div className="flex justify-between items-center">
                <span
                  style={{
                    fontFamily: "var(--font-spline-sans), 'Spline Sans', sans-serif",
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  {product.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-spline-sans), 'Spline Sans', sans-serif",
                    fontSize: "20px",
                    fontWeight: 500,
                    color: product.salePrice ? "rgb(255, 0, 0)" : "rgb(0, 0, 0)",
                  }}
                >
                  {product.salePrice ?? product.price}
                </span>
              </div>

              {/* Row 2: category (only if present) */}
              {product.category && (
                <p
                  style={{
                    fontFamily: "var(--font-spline-sans), 'Spline Sans', sans-serif",
                    fontSize: "18px",
                    fontWeight: 400,
                    color: "rgb(100, 100, 100)",
                    marginTop: "2px",
                  }}
                >
                  {product.category}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
