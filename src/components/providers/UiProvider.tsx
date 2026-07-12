"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type Toast = { id: string; message: string };

interface UiContextValue {
  toasts: Toast[];
  pushToast: (message: string) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  checkoutMessage: string;
  openCheckout: (message?: string) => void;
  videoOpen: boolean;
  setVideoOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  loginNoticeOpen: boolean;
  setLoginNoticeOpen: (open: boolean) => void;
  reserveOpen: boolean;
  setReserveOpen: (open: boolean) => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
}

const UiContext = createContext<UiContextValue | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState(
    "Online checkout will be connected during the payment integration phase.",
  );
  const [videoOpen, setVideoOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginNoticeOpen, setLoginNoticeOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const pushToast = useCallback((message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const openCheckout = useCallback((message?: string) => {
    if (message) setCheckoutMessage(message);
    setCheckoutOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      pushToast,
      checkoutOpen,
      setCheckoutOpen,
      checkoutMessage,
      openCheckout,
      videoOpen,
      setVideoOpen,
      searchOpen,
      setSearchOpen,
      loginNoticeOpen,
      setLoginNoticeOpen,
      reserveOpen,
      setReserveOpen,
      cartDrawerOpen,
      setCartDrawerOpen,
    }),
    [
      toasts,
      pushToast,
      checkoutOpen,
      checkoutMessage,
      openCheckout,
      videoOpen,
      searchOpen,
      loginNoticeOpen,
      reserveOpen,
      cartDrawerOpen,
    ],
  );

  return (
    <UiContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(92vw,360px)] flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="pointer-events-auto rounded-lg border border-r8-border bg-r8-elevated px-4 py-3 text-sm text-r8-white shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <p>{toast.message}</p>
                <button
                  type="button"
                  aria-label="Dismiss notification"
                  onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                  className="text-r8-muted hover:text-r8-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </UiContext.Provider>
  );
}

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used within UiProvider");
  return ctx;
}
