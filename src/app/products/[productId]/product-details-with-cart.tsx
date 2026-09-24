"use client";

import { AddToCartButton } from "@/features/cart";
import { ProductDetailsPage } from "@/features/products";

type ProductDetailsWithCartProps = {
  productId: string;
};

export function ProductDetailsWithCart({
  productId,
}: ProductDetailsWithCartProps) {
  return (
    <ProductDetailsPage
      productId={productId}
      actions={({
        product,
        selectedOptions,
        currentPrice,
        quantity,
        onQuantityChange,
      }) => (
        <AddToCartButton
          productId={product.id}
          name={product.name}
          price={currentPrice}
          image={product.images[0]}
          selectedOptions={selectedOptions}
          quantity={quantity}
          onQuantityChange={onQuantityChange}
          showQuantitySelector
        />
      )}
    />
  );
}

