import type { Product } from "@/features/products/types/product.types";

type ProductDetailsProps = {
  product: Product;
};

/** US-04: product information header (spec-header). */
export function ProductDetails({ product }: ProductDetailsProps) {
  const scentFamilyLabel = product.scentFamily
    ? `Scent Family: ${product.scentFamily.charAt(0).toUpperCase() + product.scentFamily.slice(1)}`
    : null;

  const occasionLabel = product.occasion
    ? `Occasion: ${product.occasion
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")}`
    : null;

  return (
    <div className="flex flex-col gap-3">
      {/* Tags row */}
      {(scentFamilyLabel || occasionLabel) && (
        <div className="flex flex-wrap gap-2">
          {scentFamilyLabel && (
            <span className="rounded-full bg-[#f2ede5] px-[10px] py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1a1a1a]">
              {scentFamilyLabel}
            </span>
          )}
          {occasionLabel && (
            <span className="rounded-full bg-[#f2ede5] px-[10px] py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1a1a1a]">
              {occasionLabel}
            </span>
          )}
        </div>
      )}

      {/* Product name */}
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[40px] leading-tight text-[#1a1a1a] sm:text-[48px]">
        {product.name}
      </h1>

      {/* Price + availability */}
      <div className="flex flex-wrap items-center gap-4">
        <p className="text-2xl font-semibold text-[#1a1a1a]">
          ${product.price}
        </p>
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-[#10b981]"
            aria-hidden="true"
          />
          <span className="text-[13px] font-semibold text-[#10b981]">
            Available in Atelier
          </span>
        </div>
      </div>
    </div>
  );
}

