"use client";

import { useCart } from "@/features/cart/hooks/useCart";
import type { AddToCartInput } from "@/features/cart/types/cart.types";
import * as m from "motion/react-m";

type AddToCartButtonProps = AddToCartInput & {
  className?: string;
  label?: string;
};

export function AddToCartButton({
  className,
  label = "Add to cart",
  quantity,
  ...input
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <m.button
      type="button"
      className={`${className ?? "inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a880]`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      onClick={() => addItem({ ...input, quantity })}
    >
      {label}
    </m.button>
  );
}
