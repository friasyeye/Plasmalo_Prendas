"use client";

import { useState } from "react";
import type { PriceTier, ProductImage, ProductOption, ProductVariant } from "@/types";
import type { Customization } from "@/config/pricing";
import { ProductGallery } from "./ProductGallery";
import { ProductConfigurator } from "./ProductConfigurator";

interface ProductViewProps {
  productHandle: string;
  title: string;
  description: string;
  featuredImage?: ProductImage;
  priceTiers: PriceTier[];
  customizations: Customization[];
  options: ProductOption[];
  variants: ProductVariant[];
}

/**
 * Componente cliente que comparte el estado de las opciones seleccionadas
 * entre la galería y el configurador. La galería muestra las fotos del color
 * activo (metacampo custom.galeria de la variante); al cambiar de color se
 * cambia la galería entera y se vuelve a la primera foto.
 */
export function ProductView({
  productHandle,
  title,
  description,
  featuredImage,
  priceTiers,
  customizations,
  options,
  variants,
}: ProductViewProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        options.map((option) => [option.name, option.values[0]])
      )
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const colorOption = options.find((option) => /color|colour/i.test(option.name));
  const selectedColor = colorOption ? selectedOptions[colorOption.name] : undefined;

  // Fotos del color activo: la galería del metacampo si alguna variante del
  // color la tiene; si no, su portada de variante; si no, featuredImage.
  const colorVariants = colorOption
    ? variants.filter(
        (variant) => variant.selectedOptions[colorOption.name] === selectedColor
      )
    : variants;

  const metafieldGallery = colorVariants.find(
    (variant) => variant.galleryImages.length > 0
  )?.galleryImages;
  const coverImage = colorVariants.find((variant) => variant.image)?.image;

  const galleryImages =
    metafieldGallery ??
    (coverImage ? [coverImage] : featuredImage ? [featuredImage] : []);

  const activeIndex = Math.min(
    activeImageIndex,
    Math.max(galleryImages.length - 1, 0)
  );

  function handleSelectOption(name: string, value: string) {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
    // Al cambiar de color cambia la galería entera: volver a la primera foto.
    if (colorOption && name === colorOption.name) {
      setActiveImageIndex(0);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 md:gap-14 pb-24 md:pb-0">
      <div className="flex items-start">
        <ProductGallery
          images={galleryImages}
          productTitle={title}
          activeIndex={activeIndex}
          onSelect={setActiveImageIndex}
        />
      </div>

      <ProductConfigurator
        productHandle={productHandle}
        title={title}
        description={description}
        priceTiers={priceTiers}
        customizations={customizations}
        options={options}
        variants={variants}
        selectedOptions={selectedOptions}
        onSelectOption={handleSelectOption}
      />
    </div>
  );
}
