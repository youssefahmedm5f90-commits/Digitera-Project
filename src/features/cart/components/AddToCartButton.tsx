"use client";

import { useState } from "react";
import { useCart } from "@/features/cart/hooks/useCart";
import type { AddToCartInput } from "@/features/cart/types/cart.types";

type AddToCartButtonProps = AddToCartInput & {
  quantity?: number;
  onQuantityChange?: (qty: number) => void;
  showQuantitySelector?: boolean;
  className?: string;
};

export function AddToCartButton({
  productId,
  name,
  price,
  image,
  selectedOptions,
  quantity = 1,
  onQuantityChange,
  showQuantitySelector = false,
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [internalQuantity, setInternalQuantity] = useState(quantity);
  const [added, setAdded] = useState(false);

  const currentQty = onQuantityChange ? quantity : internalQuantity;

  function updateQty(newQty: number) {
    if (newQty < 1) return;
    if (onQuantityChange) {
      onQuantityChange(newQty);
    } else {
      setInternalQuantity(newQty);
    }
  }

  function handleAddToCart() {
    addItem({
      productId,
      name,
      price,
      image,
      selectedOptions,
      quantity: currentQty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (showQuantitySelector) {
    return (
      <div className={`flex w-full items-center gap-4 ${className}`}>
        {/* Quantity selector matching Figma qty-widget */}
        <div className="flex h-[50px] w-[95px] shrink-0 items-center justify-between rounded-[4px] border border-[#ebe6de] px-4">
          <button
            type="button"
            onClick={() => updateQty(currentQty - 1)}
            disabled={currentQty <= 1}
            aria-label="Decrease quantity"
            className="flex items-center justify-center text-base text-[#605a54] transition-colors hover:text-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <span className="text-[14px] font-medium text-[#1a1a1a]">
            {currentQty}
          </span>
          <button
            type="button"
            onClick={() => updateQty(currentQty + 1)}
            aria-label="Increase quantity"
            className="flex items-center justify-center text-base text-[#605a54] transition-colors hover:text-[#1a1a1a]"
          >
            +
          </button>
        </div>

        {/* Primary Add to Cart button matching Figma add-to-cart-primary */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex h-[50px] flex-1 items-center justify-center rounded-[4px] bg-[#1a1a1a] px-6 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-black"
        >
          {added ? "Added to Cart ✓" : `Add to Cart / $${price * currentQty}`}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className={`inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 ${className}`}
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}

