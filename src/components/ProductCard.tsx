interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

export function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <article className="cursor-pointer group">
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "rgb(246, 247, 247)", aspectRatio: "172/238" }}
      >
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex justify-between items-center pt-3">
        <span className="text-sm text-black">{name}</span>
        <span className="text-sm text-black">{price}</span>
      </div>
    </article>
  );
}
