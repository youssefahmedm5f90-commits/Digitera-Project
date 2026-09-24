"use client";

import type { Product, ProductOption } from "@/features/products/types/product.types";

type ProductOptionsProps = {
  product: Product;
  selectedOptions: Record<string, string>;
  onChange: (optionId: string, value: string) => void;
};

/** Renders the volume size-card selector. */
function SizeSelector({
  option,
  selected,
  onChange,
}: {
  option: ProductOption;
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[12px] font-bold uppercase tracking-wider text-[#1a1a1a]">
        {option.name}
      </span>
      <div className="flex flex-wrap gap-3">
        {option.values.map((value) => {
          const price = option.prices?.[value];
          const isActive = selected === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onChange(value)}
              className={`flex min-w-[100px] flex-col items-start gap-0.5 rounded-[4px] border px-3 py-3 transition-colors sm:min-w-[110px] ${
                isActive
                  ? "border-[#1a1a1a] bg-white"
                  : "border-[#ebe6de] bg-transparent hover:border-[#c5a880]"
              }`}
            >
              <span className="text-[14px] font-medium text-[#1a1a1a]">
                {value}
              </span>
              {price !== undefined && (
                <span className="text-[11px] font-normal text-[#605a54]">
                  ${price}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Renders the gift-wrapping option as a highlighted card with a toggle. */
function GiftWrappingOption({
  option,
  selected,
  onChange,
}: {
  option: ProductOption;
  selected: string;
  onChange: (value: string) => void;
}) {
  const isEnabled = selected === "Yes";

  function handleToggle() {
    onChange(isEnabled ? "No" : "Yes");
  }

  return (
    <div className="flex items-start justify-between gap-4 rounded-[4px] bg-[#f4f0eb] px-5 py-5">
      <div className="flex flex-col gap-1">
        <p className="text-[13px] font-semibold text-[#1a1a1a]">
          Complimentary Signature Gift Wrapping
        </p>
        <p className="text-[12px] font-normal text-[#605a54]">
          Encased in linen paper box with custom wax seal stamp.
        </p>
      </div>
      {/* Toggle switch */}
      <button
        type="button"
        role="switch"
        aria-checked={isEnabled}
        onClick={handleToggle}
        className={`relative mt-0.5 h-6 w-11 flex-shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a1a] ${
          isEnabled ? "bg-[#1a1a1a]" : "bg-[#d4cfc9]"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            isEnabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
        <span className="sr-only">
          {isEnabled ? "Disable gift wrapping" : "Enable gift wrapping"}
        </span>
      </button>
    </div>
  );
}

/** US-04: selectable product options. */
export function ProductOptions({
  product,
  selectedOptions,
  onChange,
}: ProductOptionsProps) {
  if (product.options.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5">
      {product.options.map((option) => {
        const selected = selectedOptions[option.id] ?? option.values[0];

        if (option.id === "size") {
          return (
            <SizeSelector
              key={option.id}
              option={option}
              selected={selected}
              onChange={(value) => onChange(option.id, value)}
            />
          );
        }

        if (option.id === "gift-wrapping") {
          return (
            <GiftWrappingOption
              key={option.id}
              option={option}
              selected={selected}
              onChange={(value) => onChange(option.id, value)}
            />
          );
        }

        // Fallback: generic select
        return (
          <label key={option.id} className="block">
            <span className="mb-1 block text-sm font-medium">
              {option.name}
            </span>
            <select
              value={selected}
              onChange={(e) => onChange(option.id, e.target.value)}
              className="w-full rounded-[4px] border border-[#ebe6de] bg-white px-3 py-2 text-sm text-[#1a1a1a] outline-none focus:border-[#1a1a1a]"
            >
              {option.values.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        );
      })}
    </div>
  );
}

