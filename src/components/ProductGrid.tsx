import { ProductCard } from "./ProductCard";

const products = [
  { id: "1",  name: "Breeze Mesh Trainers",       price: "109.00", image: "/images/product-breeze-mesh-trainers.png" },
  { id: "2",  name: "EcoLite Trail Shoes",         price: "129.00", image: "/images/product-ecolite-trail-shoes.png" },
  { id: "3",  name: "Canyon Runner Sneakers",      price: "129.00", image: "/images/product-canyon-runner-sneakers.png" },
  { id: "4",  name: "Wave Knit Slip-Ons",          price: "109.00", image: "/images/product-wave-knit-slip-ons.png" },
  { id: "5",  name: "TerraFlex Everyday Sneaker",  price: "105.00", image: "/images/product-terraflex-everyday-sneaker.png" },
  { id: "6",  name: "CoreLoop Classic",            price: "110.00", image: "/images/product-coreloop-classic.png" },
  { id: "7",  name: "CloudTread Urban Walker",     price: "120.00", image: "/images/product-cloudtread-urban-walker.png" },
  { id: "8",  name: "BreatheLite Mesh Trainer",    price: "89.00",  image: "/images/product-breathelite-mesh-trainer.png" },
  { id: "9",  name: "EcoStrider Trail Grip",       price: "125.00", image: "/images/product-ecostrider-trail-grip.png" },
  { id: "10", name: "Give the Gift of Refeet",     price: "50.00",  image: "/images/product-gift-card.jpg" },
];

export function ProductGrid() {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
}
