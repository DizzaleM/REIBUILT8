"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/cards/ProgramCard";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/providers/CartProvider";
import { useUi } from "@/components/providers/UiProvider";
import { products, shopCategories } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { Suspense } from "react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState("Featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { addItem } = useCart();
  const { pushToast } = useUi();

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => `${p.name} ${p.description}`.toLowerCase().includes(q));
    }
    list = list.filter((p) => p.price <= maxPrice);
    if (sort === "Price Low to High") list.sort((a, b) => a.price - b.price);
    if (sort === "Price High to Low") list.sort((a, b) => b.price - a.price);
    if (sort === "Top Rated") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, query, maxPrice, sort]);

  const addProduct = (product: Product) => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      type: "product",
    });
    pushToast(`${product.name} added to cart.`);
  };

  const Filters = (
    <div className="space-y-4">
      <label className="block text-xs uppercase tracking-[0.14em] text-r8-muted">
        Search
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-2 w-full rounded-md border border-r8-border bg-r8-elevated px-3 py-2 text-sm text-r8-white"
          placeholder="Search products"
        />
      </label>
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-r8-muted">Category</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["All", ...shopCategories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-md border px-3 py-2 text-xs ${
                category === c ? "border-white text-r8-secondary" : "border-r8-border text-r8-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <label className="block text-xs uppercase tracking-[0.14em] text-r8-muted">
        Max price (${maxPrice})
        <input type="range" min={20} max={200} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-2 w-full accent-white" />
      </label>
    </div>
  );

  return (
    <div>
      <PageHero title="Shop DIESEL WAY" description="Apparel, accessories, digital programs, and more — front-end storefront mockup." />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-r8-muted">{filtered.length} products</p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="lg:hidden" onClick={() => setFiltersOpen(true)}>
              Filters
            </Button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-md border border-r8-border bg-r8-charcoal px-3 py-2 text-sm text-r8-white"
            >
              {["Featured", "Price Low to High", "Price High to Low", "Top Rated"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden h-fit rounded-xl border border-r8-border bg-r8-charcoal p-4 lg:block">{Filters}</aside>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.length === 0 ? (
              <div className="col-span-full rounded-xl border border-r8-border bg-r8-elevated p-10 text-center">
                <p className="font-display text-2xl uppercase text-r8-white">No products in this view</p>
                <p className="mt-2 text-sm text-r8-secondary">Try another category or raise the max price filter.</p>
                <Button
                  className="mt-5"
                  variant="secondary"
                  onClick={() => {
                    setCategory("All");
                    setQuery("");
                    setMaxPrice(200);
                  }}
                >
                  Show All Products
                </Button>
              </div>
            ) : (
              filtered.map((product) => (
                <div key={product.id} className="relative">
                  <button
                    type="button"
                    aria-label="Favorite"
                    onClick={() =>
                      setFavorites((prev) =>
                        prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id],
                      )
                    }
                    className="absolute right-3 top-3 z-10 rounded-full border border-r8-border bg-r8-black/70 p-2"
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-white text-white" : "text-r8-white"}`} />
                  </button>
                  <ProductCard
                    product={product}
                    onAdd={() => addProduct(product)}
                    onQuickView={() => setQuickView(product)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Modal open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters">
        {Filters}
        <Button className="mt-6 w-full" onClick={() => setFiltersOpen(false)}>
          Apply Filters
        </Button>
      </Modal>

      <Modal open={Boolean(quickView)} onClose={() => setQuickView(null)} title={quickView?.name ?? "Quick View"}>
        {quickView ? (
          <div>
            <p className="text-r8-secondary">{formatPrice(quickView.price)}</p>
            <p className="mt-3 text-sm text-r8-secondary">{quickView.description}</p>
            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => {
                  addProduct(quickView);
                  setQuickView(null);
                }}
              >
                Add to Cart
              </Button>
              <Button href={`/shop/${quickView.slug}`} variant="secondary" onClick={() => setQuickView(null)}>
                View Details
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-r8-secondary">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
