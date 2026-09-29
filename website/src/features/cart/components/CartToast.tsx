"use client";

import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { cartPaths } from "@/features/cart/paths";
import { useToastStore } from "@/features/cart/store/toast.store";

export function CartToast() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex flex-col items-center gap-2 px-4">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <m.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto flex w-full max-w-sm items-center justify-between gap-4 rounded-lg border border-[#ebe6de] bg-white px-4 py-3 shadow-[0px_8px_24px_0px_rgba(26,26,26,0.08)]"
          >
            <p className="text-[13px] leading-[normal] text-[#1a1a1a]">
              {toast.message}
            </p>
            <Link
              href={cartPaths.cart}
              className="shrink-0 rounded-sm text-[11px] leading-[normal] font-semibold tracking-wide text-[#c5a880] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a880]"
            >
              View cart
            </Link>
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
