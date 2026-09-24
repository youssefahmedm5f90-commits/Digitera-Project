"use client";

import { ProductCard } from "@/features/products/components/ProductCard";
import { useProducts } from "@/features/products/hooks/useProducts";

type RelatedProductsProps = {
  currentProductId: string;
};

/** Displays the "Olfactory Companions" related products section from Figma. */
export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const { data, isLoading } = useProducts({ pageSize: 8 });

  if (isLoading) {
    return null;
  }

  const relatedItems = (data?.items ?? [])
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (relatedItems.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f4f0eb] px-4 py-16 sm:px-6 md:px-10 lg:px-20 lg:py-[100px]">
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] text-[#1a1a1a] sm:text-[48px]">
            Olfactory Companions
          </h2>
          <p className="mt-2 text-[12px] font-medium uppercase tracking-wider text-[#605a54] sm:text-[14px]">
            Fragrances of Synonymous Sophistication
          </p>
        </div>

        {/* 4-column product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
