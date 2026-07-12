"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SafeMedia } from "@/components/ui/SafeMedia";
import { formatPrice } from "@/lib/utils";
import type { Program } from "@/types";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-r8-border bg-r8-elevated transition hover:border-white/40"
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
        <SafeMedia
          src={program.image}
          alt={program.imageAlt ?? program.title}
          title={program.title}
          className="transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 z-10">
          <Badge>{program.type}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl uppercase leading-none text-r8-white">{program.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-r8-secondary">{program.summary}</p>
        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-r8-muted">
          <div>
            <dt className="uppercase tracking-wider">Difficulty</dt>
            <dd className="mt-0.5 text-r8-white">{program.level}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-wider">Duration</dt>
            <dd className="mt-0.5 text-r8-white">{program.durationWeeks} weeks</dd>
          </div>
          <div>
            <dt className="uppercase tracking-wider">Workouts</dt>
            <dd className="mt-0.5 text-r8-white">{program.workouts}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-wider">Price</dt>
            <dd className="mt-0.5 text-r8-secondary">{formatPrice(program.price)}</dd>
          </div>
        </dl>
        <Button href={`/programs/${program.slug}`} className="mt-5 w-full" variant="secondary">
          View Program
        </Button>
      </div>
    </motion.article>
  );
}

export function ProductCard({
  product,
  onAdd,
  onQuickView,
}: {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    category: string;
    badges?: string[];
    inventoryLabel?: string;
  };
  onAdd?: () => void;
  onQuickView?: () => void;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-r8-border bg-r8-elevated transition hover:border-white/35">
      <Link href={`/shop/${product.slug}`} className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#0a0c10]">
        <SafeMedia
          src={product.image}
          alt={product.name}
          title={product.name}
          className="transition duration-500 group-hover:scale-105"
        />
        {product.badges?.[0] ? (
          <div className="absolute left-3 top-3 z-10">
            <Badge>{product.badges[0]}</Badge>
          </div>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-r8-muted">{product.category}</p>
        <Link
          href={`/shop/${product.slug}`}
          className="mt-1 font-display text-xl uppercase text-r8-white hover:text-r8-secondary"
        >
          {product.name}
        </Link>
        <p className="mt-2 text-r8-secondary">{formatPrice(product.price)}</p>
        {product.inventoryLabel ? <p className="mt-1 text-xs text-r8-muted">{product.inventoryLabel}</p> : null}
        <div className="mt-4 flex gap-2">
          <Button className="flex-1" size="sm" onClick={onAdd}>
            Add to Cart
          </Button>
          {onQuickView ? (
            <Button variant="secondary" size="sm" onClick={onQuickView}>
              Quick View
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
