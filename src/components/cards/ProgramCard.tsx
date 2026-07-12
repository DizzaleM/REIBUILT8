"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatPrice } from "@/lib/utils";
import type { Program } from "@/types";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-r8-border bg-r8-elevated"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ImagePlaceholder
          src={program.image}
          alt={program.title}
          label="Add Program Photo"
          fill
          className="transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge>{program.type}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl uppercase text-r8-white">{program.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-r8-secondary">{program.summary}</p>
        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-r8-muted">
          <div>
            <dt className="uppercase tracking-wider">Level</dt>
            <dd className="text-r8-white">{program.level}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-wider">Duration</dt>
            <dd className="text-r8-white">{program.durationWeeks} weeks</dd>
          </div>
          <div>
            <dt className="uppercase tracking-wider">Workouts</dt>
            <dd className="text-r8-white">{program.workouts}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-wider">Price</dt>
            <dd className="text-r8-blue-light">{formatPrice(program.price)} one-time</dd>
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
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-r8-border bg-r8-elevated">
      <Link href={`/shop/${product.slug}`} className="relative aspect-square overflow-hidden">
        <ImagePlaceholder
          src={product.image}
          alt={product.name}
          label="Add Product Photo"
          fill
          className="transition duration-500 group-hover:scale-105"
        />
        {product.badges?.[0] ? (
          <div className="absolute left-3 top-3">
            <Badge>{product.badges[0]}</Badge>
          </div>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-r8-muted">{product.category}</p>
        <Link href={`/shop/${product.slug}`} className="mt-1 font-display text-xl uppercase text-r8-white hover:text-r8-blue-light">
          {product.name}
        </Link>
        <p className="mt-2 text-r8-blue-light">{formatPrice(product.price)}</p>
        {product.inventoryLabel ? <p className="mt-1 text-xs text-r8-muted">{product.inventoryLabel}</p> : null}
        <div className="mt-4 flex gap-2">
          <Button className="flex-1" size="sm" onClick={onAdd}>
            Add to Cart
          </Button>
          <Button variant="secondary" size="sm" onClick={onQuickView}>
            Quick View
          </Button>
        </div>
      </div>
    </article>
  );
}
