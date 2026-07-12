"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SafeMedia } from "@/components/ui/SafeMedia";
import { Modal } from "@/components/ui/Modal";
import { ProductCard } from "@/components/cards/ProgramCard";
import { useCart } from "@/components/providers/CartProvider";
import { useUi } from "@/components/providers/UiProvider";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { Star } from "lucide-react";

export function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const [variant, setVariant] = useState(product.variants?.[0] ?? "");
  const [qty, setQty] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const gallery = [product.image, ...(product.gallery ?? [])].filter(
    (src, i, arr) => src && arr.indexOf(src) === i,
  );
  const [activeImage, setActiveImage] = useState(gallery[0] ?? product.image);
  const { addItem } = useCart();
  const { openCheckout, pushToast } = useUi();

  const add = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      type: "product",
      size: size || undefined,
      variant: variant || undefined,
      quantity: qty,
    });
    pushToast("Added to cart.");
  };

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.name },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-r8-border bg-r8-black">
              <SafeMedia src={activeImage} alt={product.name} title={product.name} />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(src)}
                  className={`relative aspect-square overflow-hidden rounded-lg border transition ${
                    activeImage === src ? "border-white" : "border-r8-border hover:border-white/40"
                  }`}
                >
                  <SafeMedia src={src} alt={`${product.name} view`} title={product.name} />
                </button>
              ))}
            </div>
          </div>

          <div>
            {product.badges?.[0] ? <Badge>{product.badges[0]}</Badge> : null}
            <h1 className="mt-3 font-display text-4xl uppercase text-r8-white">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm text-r8-secondary">
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-white text-white" />
                {product.rating}
              </span>
              <span>({product.reviewCount} reviews)</span>
            </div>
            <p className="mt-4 font-display text-3xl text-r8-secondary">{formatPrice(product.price)}</p>
            <p className="mt-4 text-r8-secondary">{product.description}</p>

            {product.isSupplement ? (
              <p className="mt-4 rounded-lg border border-r8-warning/40 bg-r8-warning/10 p-3 text-sm text-r8-warning">
                Product details, claims, ingredients and required disclaimers must be reviewed before launch.
              </p>
            ) : null}

            {product.variants?.length ? (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.14em] text-r8-muted">Option</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVariant(v)}
                      className={`rounded-md border px-3 py-2 text-sm ${variant === v ? "border-white text-r8-secondary" : "border-r8-border text-r8-secondary"}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {product.sizes?.length ? (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.14em] text-r8-muted">Size</p>
                  <button type="button" className="text-xs text-r8-secondary" onClick={() => setSizeGuideOpen(true)}>
                    Size guide
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`rounded-md border px-3 py-2 text-sm ${size === s ? "border-white text-r8-secondary" : "border-r8-border text-r8-secondary"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6">
              <label className="text-xs uppercase tracking-[0.14em] text-r8-muted" htmlFor="qty">
                Quantity
              </label>
              <input
                id="qty"
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="mt-2 w-24 rounded-md border border-r8-border bg-r8-charcoal px-3 py-2 text-r8-white"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={add}>Add to Cart</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  add();
                  openCheckout("Online checkout will be connected during the payment integration phase.");
                }}
              >
                Buy Now
              </Button>
            </div>

            <div className="mt-8 space-y-3 text-sm text-r8-secondary">
              <p><span className="text-r8-muted">Shipping:</span> {product.shippingSummary}</p>
              <p><span className="text-r8-muted">Returns:</span> {product.returnsSummary}</p>
            </div>

            <h2 className="mt-10 font-display text-2xl uppercase text-r8-white">Details</h2>
            <ul className="mt-3 space-y-2 text-sm text-r8-secondary">
              {product.details.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>

            {product.isSupplement ? (
              <div className="mt-10 space-y-4">
                {["Nutrition facts", "Ingredients", "Directions", "Warnings", "Disclaimer"].map((section) => (
                  <div key={section} className="rounded-lg border border-dashed border-r8-border p-4">
                    <p className="font-medium text-r8-white">{section}</p>
                    <p className="mt-1 text-sm text-r8-muted">Placeholder — add verified content before launch.</p>
                  </div>
                ))}
              </div>
            ) : null}

            <h2 className="mt-10 font-display text-2xl uppercase text-r8-white">Reviews</h2>
            <p className="mt-3 text-sm text-r8-secondary">
              Review content is mocked for layout only. Replace with verified customer reviews before launch.
            </p>
          </div>
        </div>

        <h2 className="mt-16 font-display text-3xl uppercase text-r8-white">Suggested Products</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAdd={() =>
                addItem({
                  id: item.id,
                  slug: item.slug,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  type: "product",
                })
              }
            />
          ))}
        </div>
      </div>

      <Modal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} title="Size Guide">
        <p className="text-sm text-r8-secondary">
          Size chart placeholder. Add exact measurements from the apparel manufacturer before launch.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-r8-muted">
                <th className="py-2 pr-4">Size</th>
                <th className="py-2 pr-4">Chest</th>
                <th className="py-2">Waist</th>
              </tr>
            </thead>
            <tbody className="text-r8-secondary">
              {[
                ["S", "34–36", "28–30"],
                ["M", "38–40", "32–34"],
                ["L", "42–44", "36–38"],
                ["XL", "46–48", "40–42"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-r8-border">
                  {row.map((cell) => (
                    <td key={cell} className="py-2 pr-4">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
      <div className="h-20" />
    </div>
  );
}
