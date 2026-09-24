import type { Product } from "@/features/products/types/product.types";

type ScentAnatomyProps = {
  product: Product;
};

/** Displays the scent anatomy (description + notes pyramid) for a product. */
export function ScentAnatomy({ product }: ScentAnatomyProps) {
  const hasNotes = Boolean(
    product.topNotes || product.heartNotes || product.baseNotes,
  );

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-[family-name:var(--font-instrument-serif)] text-[32px] leading-tight text-[#1a1a1a]">
        Scent Anatomy
      </h2>

      {product.description && (
        <p className="text-[14px] font-normal leading-[1.6] text-[#605a54]">
          {product.description}
        </p>
      )}

      {hasNotes && (
        <div className="flex flex-col gap-1">
          {product.topNotes && (
            <div className="flex items-center justify-between border-b border-[#ebe6de] py-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                Top Notes
              </span>
              <span className="text-[13px] font-normal text-[#605a54]">
                {product.topNotes}
              </span>
            </div>
          )}
          {product.heartNotes && (
            <div className="flex items-center justify-between border-b border-[#ebe6de] py-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                Heart Notes
              </span>
              <span className="text-[13px] font-normal text-[#605a54]">
                {product.heartNotes}
              </span>
            </div>
          )}
          {product.baseNotes && (
            <div className="flex items-center justify-between border-b border-[#ebe6de] py-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                Base Notes
              </span>
              <span className="text-[13px] font-normal text-[#605a54]">
                {product.baseNotes}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

