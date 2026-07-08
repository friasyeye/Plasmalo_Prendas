"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
  productTitle: string;
}

export function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (!activeImage) {
    return (
      <div className="w-full relative aspect-2/3 bg-gray-100/50 overflow-hidden rounded-3xl" />
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full aspect-2/3 bg-gray-100/50 overflow-hidden rounded-3xl shadow-sm border border-gray-200/30">
        <Image
          src={activeImage.url}
          alt={activeImage.altText ?? productTitle}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              aria-label={`Ver foto ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={
                "flex-shrink-0 relative w-20 md:w-24 aspect-2/3 rounded-2xl overflow-hidden border-2 transition-all duration-200 " +
                (index === activeIndex
                  ? "border-black shadow-md"
                  : "border-gray-200/50 hover:border-gray-300/70 opacity-70 hover:opacity-100")
              }
            >
              <Image
                src={image.url}
                alt={image.altText ?? productTitle}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
