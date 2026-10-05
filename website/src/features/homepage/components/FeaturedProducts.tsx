"use client";

import { ProductCard, useProduct } from "@/features/products";

const FEATURED_PRODUCTS = [
  { id: "fleur-de-lune", image: "/images/home/product-fleur-de-lune.png" },
  {
    id: "santal-parchment",
    image: "/images/home/product-santal-parchment.png",
  },
  { id: "sol-dor", image: "/images/home/product-sol-dor.png" },
  { id: "noir-cocoon", image: "/images/home/product-noir-cocoon.png" },
] as const;

function FeaturedProduct({
  productId,
  image,
}: {
  productId: string;
  image: string;
}) {
  const productQuery = useProduct(productId);

  if (productQuery.isLoading) {
    return (
      <div aria-hidden="true" className="animate-pulse rounded-lg bg-white p-4">
        <div className="h-[240px] rounded bg-[#ebe6de] sm:h-[280px] lg:h-[320px]" />
        <div className="mt-4 h-5 w-3/5 rounded bg-[#ebe6de]" />
        <div className="mt-2 h-4 w-2/5 rounded bg-[#ebe6de]" />
        <div className="mt-4 h-10 rounded border border-[#ebe6de]" />
      </div>
    );
  }

  return productQuery.data ? (
    <ProductCard product={{ ...productQuery.data, images: [image] }} />
  ) : null;
}

export function FeaturedProducts() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {FEATURED_PRODUCTS.map(({ id, image }) => (
        <FeaturedProduct key={id} productId={id} image={image} />
      ))}
    </div>
  );
}
