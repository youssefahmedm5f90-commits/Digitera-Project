"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import { RelatedProducts } from "@/features/products/components/RelatedProducts";
import { ScentAnatomy } from "@/features/products/components/ScentAnatomy";
import { useProduct } from "@/features/products/hooks/useProduct";
import type { Product } from "@/features/products/types/product.types";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
  currentPrice: number;
  quantity: number;
  onQuantityChange: (qty: number) => void;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const product = productQuery.data;
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);

  const resolvedOptions = useMemo(() => {
    if (!product) {
      return selectedOptions;
    }

    return Object.fromEntries(
      product.options.map((option) => [
        option.id,
        selectedOptions[option.id] ?? option.values[0],
      ]),
    );
  }, [product, selectedOptions]);

  // Compute dynamic price based on selected size
  const currentPrice = useMemo(() => {
    if (!product) return 0;
    const sizeOption = product.options.find((opt) => opt.id === "size");
    const selectedSize = resolvedOptions["size"];
    if (sizeOption?.prices && selectedSize && sizeOption.prices[selectedSize]) {
      return sizeOption.prices[selectedSize];
    }
    return product.price;
  }, [product, resolvedOptions]);

  if (productQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-[#605a54]">Loading fragrance details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-2">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl text-[#1a1a1a]">
          Fragrance Not Found
        </h2>
        <p className="text-sm text-[#605a54]">
          The fragrance you are looking for does not exist or has been moved.
        </p>
      </div>
    );
  }

  return (
    <article className="overflow-x-hidden bg-[#faf8f5]">
      {/* Breadcrumbs matching Figma */}
      <ProductBreadcrumbs productName={product.name} />

      {/* Main Detail Body matching Figma detail-body */}
      <div className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 md:px-10 lg:px-20 lg:pb-[100px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,656px)_minmax(0,560px)] lg:justify-between lg:gap-16">
          {/* Left Column: Product Image Gallery */}
          <div className="w-full">
            <ProductImages product={product} />
          </div>

          {/* Right Column: Product Specifications */}
          <div className="flex w-full flex-col gap-8">
            {/* 1. Header (tags, title, price + availability) */}
            <ProductDetails product={product} currentPrice={currentPrice} />

            {/* Spec Divider */}
            <div className="h-px w-full bg-[#ebe6de]" />

            {/* 2. Options (Volume size selector & Gift wrapping toggle) */}
            <ProductOptions
              product={product}
              selectedOptions={resolvedOptions}
              onChange={(optionId, value) =>
                setSelectedOptions((current) => ({
                  ...current,
                  [optionId]: value,
                }))
              }
            />

            {/* 3. Actions (Quantity widget + Primary Add to Cart button) */}
            {actions?.({
              product,
              selectedOptions: resolvedOptions,
              currentPrice,
              quantity,
              onQuantityChange: setQuantity,
            })}

            {/* Spec Divider */}
            <div className="h-px w-full bg-[#ebe6de]" />

            {/* 4. Scent Anatomy (Description + Notes Pyramid) */}
            <ScentAnatomy product={product} />
          </div>
        </div>
      </div>

      {/* Related Products Section ("Olfactory Companions") matching Figma */}
      <RelatedProducts currentProductId={product.id} />
    </article>
  );
}

