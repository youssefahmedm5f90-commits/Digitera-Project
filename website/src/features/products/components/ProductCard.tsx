"use client";

import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type MouseEvent,
  type ReactNode,
  type SetStateAction,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductOptions, type VolumeGroup } from "@/features/products/components/ProductOptions";
import { useCart } from "@/features/cart";
import { productPaths } from "@/features/products/paths";
import type { Product } from "@/features/products/types/product.types";
import {
  formatWholePrice,
  resolveProductImages,
} from "@/features/products/utils/product.utils";

type ProductCardProps = {
  product: Product;
};

type QuickAction = "view" | "shop" | null;

const VOLUME_PRESETS = [
  { id: "30 ml", label: "30 ml", ratio: 140 / 220 },
  { id: "50 ml", label: "50 ml", ratio: 180 / 220 },
  { id: "100 ml", label: "100 ml", ratio: 1 },
] as const;

function productOptionGroups(product: Product): VolumeGroup[] {
  const configured = product.options.filter((option) => option.values.length > 0);

  if (configured.length > 0) {
    return configured.map((option) => ({
      id: option.id,
      label: /size|volume/i.test(option.name) ? "Select Volume" : option.name,
      choices: option.values.map((value) => ({
        id: value,
        label: value,
        price: product.price,
      })),
    }));
  }

  return [
    {
      id: "volume",
      label: "Select Volume",
      choices: VOLUME_PRESETS.map((preset) => ({
        id: preset.id,
        label: preset.label,
        price: Math.round(product.price * preset.ratio),
      })),
    },
  ];
}

function ActionIcon({ kind }: { kind: "eye" | "cart" }) {
  return kind === "eye" ? (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-4"
    >
      <path d="M2.5 12s3.2-6 9.5-6 9.5 6 9.5 6-3.2 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-4"
    >
      <path d="M3 4h2l2.1 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.5L21 8H6" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  function closeFromBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={closeFromBackdrop}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-5 text-[#1a1a1a] shadow-2xl sm:p-8"
      >
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] transition-colors hover:bg-[#f4f0eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a880] sm:right-5 sm:top-5"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="size-5"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
        {children}
      </section>
    </div>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const image = resolveProductImages(product)[0];
  const [quickAction, setQuickAction] = useState<QuickAction>(null);
  const [quantity, setQuantity] = useState(1);
  const optionGroups = useMemo(() => productOptionGroups(product), [product]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        optionGroups.map((group) => [
          group.id,
          group.choices[group.choices.length - 1]?.id ?? "",
        ]),
      ),
  );

  useEffect(() => {
    if (!quickAction) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setQuickAction(null);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [quickAction]);

  const resolvedOptions = Object.fromEntries(
    optionGroups.map((group) => [
      group.id,
      selectedOptions[group.id] ??
        group.choices[group.choices.length - 1]?.id ??
        "",
    ]),
  );
  const selectedChoices = optionGroups.map((group) =>
    group.choices.find((choice) => choice.id === resolvedOptions[group.id]),
  );
  const unitPrice =
    selectedChoices[0]?.price ?? product.price;
  const cartOptions = Object.fromEntries(
    optionGroups.map((group, index) => [
      group.label,
      selectedChoices[index]?.label ?? resolvedOptions[group.id],
    ]),
  );

  function addProductToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      price: unitPrice,
      image,
      selectedOptions: cartOptions,
      quantity,
    });
    setQuickAction(null);
  }

  return (
    <>
      <article className="flex min-w-0 flex-1 flex-col items-start gap-4 self-stretch rounded-lg bg-white p-4 transition-transform duration-200 hover:-translate-y-1">
        <div className="group/image relative h-[240px] w-full shrink-0 overflow-hidden rounded sm:h-[280px] lg:h-[320px]">
          <Link
            href={productPaths.detail(product.id)}
            aria-label={`View ${product.name} details`}
            className="absolute inset-0 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a880]"
          >
            {image ? (
              <Image
                src={image}
                alt={product.name}
                fill
                className="rounded object-cover transition-transform duration-700 group-hover/image:scale-[1.035]"
                sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw"
              />
            ) : (
              <div className="flex size-full items-center justify-center rounded bg-[#faf8f5] text-sm text-[#605a54]">
                No image
              </div>
            )}
          </Link>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover/image:opacity-100 md:group-focus-within/image:opacity-100">
            <div className="translate-y-0 opacity-100 transition duration-500 ease-out md:-translate-y-3 md:opacity-0 md:group-hover/image:translate-y-0 md:group-hover/image:opacity-100 md:group-focus-within/image:translate-y-0 md:group-focus-within/image:opacity-100">
              <QuickActionButton
                label="Quick View"
                icon="eye"
                onClick={() => setQuickAction("view")}
              />
            </div>
            <div className="translate-y-0 opacity-100 transition duration-500 ease-out md:-translate-y-3 md:opacity-0 md:group-hover/image:translate-y-0 md:group-hover/image:opacity-100 md:group-focus-within/image:translate-y-0 md:group-focus-within/image:opacity-100 md:group-hover/image:delay-75 md:group-focus-within/image:delay-75">
              <QuickActionButton
                label="Quick Shop"
                icon="cart"
                onClick={() => setQuickAction("shop")}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex w-full items-start justify-between">
            <Link
              href={productPaths.detail(product.id)}
              className="flex min-w-0 flex-col items-start gap-1 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a880]"
            >
              <h2 className="w-full font-[family-name:var(--font-instrument-serif)] text-[20px] text-[#1a1a1a] sm:truncate sm:text-[22px]">
                {product.name}
              </h2>
              <p className="w-full text-[11px] font-normal uppercase text-[#c5a880] sm:truncate">
                {product.notes}
              </p>
            </Link>
            <p className="shrink-0 text-[15px] font-semibold text-[#1a1a1a]">
              {formatWholePrice(product.price)}
            </p>
          </div>
        </div>
      </article>

      {quickAction === "view" ? (
        <ModalShell
          title={`Quick view: ${product.name}`}
          onClose={() => setQuickAction(null)}
        >
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-9">
            <ProductModalImage image={image} name={product.name} />
            <div className="flex flex-col items-start gap-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c5a880]">
                {product.notes}
              </p>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-4xl sm:text-5xl">
                {product.name}
              </h2>
              <p className="text-lg font-semibold">
                {formatWholePrice(product.price)}
              </p>
              <p className="text-sm leading-6 text-[#605a54]">
                {product.description}
              </p>
              <ProductOptions
                groups={optionGroups}
                selected={resolvedOptions}
                onChange={(groupId, choiceId) =>
                  setSelectedOptions((current) => ({
                    ...current,
                    [groupId]: choiceId,
                  }))
                }
              />
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <button
                type="button"
                onClick={addProductToCart}
                className="inline-flex min-h-12 w-full items-center justify-center rounded bg-[#1a1a1a] px-5 text-[11px] font-semibold tracking-[0.12em] text-white transition-colors hover:bg-[#38332e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a880]"
              >
                ADD TO CART
              </button>
              <Link
                href={productPaths.detail(product.id)}
                onClick={() => setQuickAction(null)}
                className="inline-flex min-h-12 w-full items-center justify-center rounded border border-[#1a1a1a] px-5 text-[11px] font-semibold tracking-[0.12em] text-[#1a1a1a] transition-colors hover:bg-[#f4f0eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a880]"
              >
                VIEW DETAILS
              </Link>
            </div>
          </div>
        </ModalShell>
      ) : null}

      {quickAction === "shop" ? (
        <ModalShell
          title={`Quick shop: ${product.name}`}
          onClose={() => setQuickAction(null)}
        >
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-9">
            <ProductModalImage image={image} name={product.name} />
            <div className="flex flex-col items-start gap-5 py-3">
              <div className="flex w-full flex-col gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c5a880]">
                  {product.notes}
                </p>
                <h2 className="font-[family-name:var(--font-instrument-serif)] text-4xl sm:text-5xl">
                  {product.name}
                </h2>
                <p className="text-lg font-semibold">
                  {formatWholePrice(unitPrice)}
                </p>
              </div>
              <ProductOptions
                groups={optionGroups}
                selected={resolvedOptions}
                onChange={(groupId, choiceId) =>
                  setSelectedOptions((current) => ({
                    ...current,
                    [groupId]: choiceId,
                  }))
                }
              />
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
              <button
                type="button"
                onClick={addProductToCart}
                className="inline-flex min-h-12 w-full items-center justify-center rounded bg-[#1a1a1a] px-5 text-[11px] font-semibold tracking-[0.12em] text-white transition-colors hover:bg-[#38332e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a880]"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </ModalShell>
      ) : null}
    </>
  );
}

function QuantitySelector({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex w-full items-center justify-between rounded border border-[#ebe6de]">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={() => setQuantity((current) => Math.max(1, current - 1))}
        className="inline-flex size-12 items-center justify-center text-lg text-[#605a54] transition-colors hover:text-[#1a1a1a] disabled:opacity-40"
      >
        -
      </button>
      <span aria-live="polite" className="text-sm font-semibold">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => setQuantity((current) => current + 1)}
        className="inline-flex size-12 items-center justify-center text-lg text-[#605a54] transition-colors hover:text-[#1a1a1a]"
      >
        +
      </button>
    </div>
  );
}

function QuickActionButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: "eye" | "cart";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group/btn pointer-events-auto relative inline-flex min-h-10 min-w-32 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-white/95 px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] shadow-sm transition-colors duration-300 hover:bg-[#c5a880] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-11 sm:min-w-36"
    >
      <span className="transition duration-300 group-hover/btn:-translate-y-6 group-hover/btn:opacity-0">
        {label}
      </span>
      <span className="absolute inset-0 flex translate-y-6 items-center justify-center opacity-0 transition duration-300 group-hover/btn:translate-y-0 group-hover/btn:opacity-100">
        <ActionIcon kind={icon} />
      </span>
    </button>
  );
}

function ProductModalImage({ image, name }: { image?: string; name: string }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded bg-[#f4f0eb]">
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 640px) 40vw, 90vw"
          className="object-cover"
        />
      ) : (
        <div className="flex size-full items-center justify-center text-sm text-[#605a54]">
          No image
        </div>
      )}
    </div>
  );
}
