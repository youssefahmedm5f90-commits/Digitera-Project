"use client";

import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import { CartToast } from "@/features/cart/components/CartToast";
import { useCartStore } from "@/features/cart/store/cart.store";
import { createQueryClient } from "@/lib/api/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <QueryClientProvider client={queryClient}>
          {children}
          <CartToast />
        </QueryClientProvider>
      </LazyMotion>
    </MotionConfig>
  );
}
