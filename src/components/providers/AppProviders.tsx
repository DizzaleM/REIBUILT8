"use client";

import { CartProvider } from "@/components/providers/CartProvider";
import { UiProvider } from "@/components/providers/UiProvider";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UiProvider>
      <CartProvider>{children}</CartProvider>
    </UiProvider>
  );
}
