import type { Product } from "@/features/products/types/product.types";

type ProductDetailsProps = {
  product: Product;
  currentPrice?: number;
};

/** US-04: product information header (spec-header). */
export function ProductDetails({ product, currentPrice }: ProductDetailsProps) {
  const priceToDisplay = currentPrice ?? product.price;

  const scentFamilyLabel = product.scentFamily
    ? `SCENT FAMILY: ${product.scentFamily.toUpperCase()}`
    : null;

  const occasionLabel = product.occasion
    ? `OCCASION: ${product.occasion.replace(/-/g, " ").toUpperCase()}`
    : null;

  return (
    <div className="flex flex-col gap-3">
      {/* Tags row */}
      {(scentFamilyLabel || occasionLabel) && (
        <div className="flex flex-wrap items-center gap-2">
          {scentFamilyLabel && (
            <span className="rounded-full bg-[#f2ede5] px-[10px] py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1a1a1a]">
              {scentFamilyLabel}
            </span>
          )}
          {occasionLabel && (
            <span className="rounded-full bg-[#f4f0eb] px-[10px] py-1 text-[11px] font-semibold uppercase tracking-wide text-[#605a54]">
              {occasionLabel}
            </span>
          )}
        </div>
      )}

      {/* Product name */}
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[40px] leading-tight text-[#1a1a1a] sm:text-[48px]">
        {product.name}
      </h1>

      {/* Price + availability status */}
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-[#1a1a1a]">
          ${priceToDisplay}
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


