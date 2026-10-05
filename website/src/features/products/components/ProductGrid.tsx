import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ProductCard } from "@/features/products/components/ProductCard";
import type { Product } from "@/features/products/types/product.types";

type ProductGridProps = {
  products: Product[];
  isLoading?: boolean;
};

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading && products.length === 0) {
    return <p className="text-sm text-[#605a54]">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-sm text-[#605a54]">No products found.</p>;
  }

  return (
    <m.div
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.065, delayChildren: 0.025 },
        },
      }}
      initial="hidden"
      animate="visible"
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 xl:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <m.div
            key={product._id || product.id}
            layout
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0 },
            }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <ProductCard product={product} />
          </m.div>
        ))}
      </AnimatePresence>
    </m.div>
  );
}
