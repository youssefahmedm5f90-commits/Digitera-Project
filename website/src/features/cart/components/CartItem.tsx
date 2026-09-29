"use client";

import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import type { CartLine } from "@/features/cart/types/cart.types";
import { formatCartAmount } from "@/features/cart/utils/cart.utils";

type CartItemProps = {
  line: CartLine;
  onIncrement: (lineId: string) => void;
  onDecrement: (lineId: string) => void;
  onRemove: (lineId: string) => void;
};

export function CartItem({
  line,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const optionLabel = Object.values(line.selectedOptions)
    .filter(Boolean)
    .join(" · ");

  return (
    <m.article
      layout
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="flex items-center gap-3.5 rounded-lg border border-[#ebe6de] bg-white p-3 shadow-[0px_8px_24px_0px_rgba(26,26,26,0.04)] lg:gap-5 lg:p-4"
    >
      <div className="relative h-[128px] w-[104px] shrink-0 overflow-hidden rounded lg:size-[150px]">
        {line.image ? (
          <Image
            src={line.image}
            alt={line.name}
            fill
            className="rounded object-cover"
            sizes="150px"
          />
        ) : (
          <div className="size-full rounded bg-[#f4f0eb]" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 lg:gap-3">
        <div className="flex items-start justify-between gap-3 text-[#1a1a1a]">
          <h2 className="min-w-0 font-[family-name:var(--font-instrument-serif)] text-[23px] leading-[normal] lg:text-[27px]">
            {line.name}
          </h2>
          <p className="shrink-0 text-[15px] leading-[normal] font-semibold">
            {formatCartAmount(line.price * line.quantity)}
          </p>
        </div>
        {optionLabel ? (
          <p className="text-[12px] leading-[normal] font-normal uppercase text-[#c5a880]">
            {optionLabel}
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center rounded border border-[#ebe6de] text-[12px] leading-[normal]">
            <m.button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center font-normal text-[#605a54] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#c5a880] disabled:cursor-default disabled:opacity-40"
              aria-label={`Decrease quantity of ${line.name}`}
              disabled={line.quantity <= 1}
              whileTap={line.quantity > 1 ? { scale: 0.88 } : undefined}
              onClick={() => onDecrement(line.id)}
            >
              −
            </m.button>
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span
                key={line.quantity}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="min-w-4 text-center font-semibold text-black"
              >
                {line.quantity}
              </m.span>
            </AnimatePresence>
            <m.button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center font-normal text-[#605a54] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#c5a880]"
              aria-label={`Increase quantity of ${line.name}`}
              whileTap={{ scale: 0.88 }}
              onClick={() => onIncrement(line.id)}
            >
              +
            </m.button>
          </div>
          <m.button
            type="button"
            className="cursor-pointer rounded-sm text-[11px] leading-[normal] font-normal text-[#605a54] uppercase underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a880]"
            whileHover={{ color: "#1a1a1a" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onRemove(line.id)}
          >
            Remove
          </m.button>
        </div>
      </div>
    </m.article>
  );
}
