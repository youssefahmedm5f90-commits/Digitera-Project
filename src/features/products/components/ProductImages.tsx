"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/features/products/types/product.types";

type ProductImagesProps = {
  product: Product;
};

/** US-04: product image gallery with thumbnail strip. */
export function ProductImages({ product }: ProductImagesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = product.images;
  const activeImage = images[activeIndex];

  if (images.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-lg bg-[#ebe6de] text-sm text-[#605a54]">
        No product images yet
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative h-[380px] overflow-hidden rounded-lg sm:h-[460px] lg:h-[600px]">
        <Image
          src={activeImage}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative h-[100px] flex-1 overflow-hidden rounded-[4px] border-2 transition-colors sm:h-[120px] ${
                index === activeIndex
                  ? "border-[#1a1a1a]"
                  : "border-[#ebe6de] hover:border-[#c5a880]"
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="20vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

