"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import * as m from "motion/react-m";
import { useCart } from "@/features/cart/hooks/useCart";
import { cartPaths } from "@/features/cart/paths";

export function CartNavLink() {
  const { quantity } = useCart();

  return (
    <m.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
      <Link
        href={cartPaths.cart}
        className="flex items-center gap-1.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a880]"
        aria-label={`Cart, ${quantity} ${quantity === 1 ? "item" : "items"}`}
      >
        <img src="/icons/shopping-bag.svg" alt="" width={20} height={20} />
        <m.span
          key={quantity}
          initial={{ scale: 0.7, opacity: 0.75 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
          className="rounded-full bg-[#c5a880] px-1.5 py-0.5 text-[10px] leading-[normal] font-bold text-white"
        >
          {quantity}
        </m.span>
      </Link>
    </m.div>
  );
}
