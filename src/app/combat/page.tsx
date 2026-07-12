"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TreatedPhoto } from "@/components/ui/TreatedPhoto";
import { formatPrice } from "@/lib/utils";
import {
  combatCategories,
  combatEquipment,
  combatPrograms,
  combatSchedule,
} from "@/data/combat";
import { useUi } from "@/components/providers/UiProvider";
import { useCart } from "@/components/providers/CartProvider";

export default function CombatPage() {
  const { openCheckout, setReserveOpen, pushToast } = useUi();
  const { addItem } = useCart();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-r8-border bg-r8-black pt-28 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(10,132,255,0.2),transparent_50%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-r8-blue-light">Combat Training</p>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.9] text-r8-white sm:text-6xl">
              Train Like a Fighter.
            </h1>
            <p className="mt-5 max-w-xl text-r8-secondary">
              Build speed, power, confidence and conditioning through structured boxing and striking-based workouts
              designed for every experience level.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#programs">Explore Combat Programs</Button>
              <Button href="/coaching" variant="secondary">
                Book Private Training
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <TreatedPhoto
              src="/images/programs/combat-heavy-bag.jpg"
              alt="Rei training boxing combinations on a heavy bag"
              priority
            />
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title="Combat Categories" description="Technique-first training focused on discipline, athleticism, and confidence — not violence." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {combatCategories.map((cat) => (
            <div key={cat.id} className="rounded-xl border border-r8-border bg-r8-elevated p-5 transition hover:border-r8-blue/50">
              <Badge tone="neutral">{cat.level}</Badge>
              <h3 className="mt-3 font-display text-xl uppercase text-r8-white">{cat.title}</h3>
              <p className="mt-2 text-sm text-r8-secondary">{cat.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-r8-border bg-r8-black-2 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Train With Purpose" align="center" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[
              ["Private Boxing Coaching", "One-on-one technical development."],
              ["Small Group Sessions", "Shared energy with coaching attention."],
              ["Youth Training", "Focus, confidence, and fundamentals."],
              ["Women's Self Defense", "Supportive skill-building sessions."],
              ["Athletic Performance", "Conditioning that transfers to sport."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-xl border border-r8-border bg-r8-charcoal p-5">
                <h3 className="font-display text-lg uppercase text-r8-white">{title}</h3>
                <p className="mt-2 text-sm text-r8-secondary">{copy}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" href="/coaching">
                    Book Session
                  </Button>
                  <Button size="sm" variant="ghost" href="#programs">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title="Live Combat Classes" description="Mock weekly schedule — livestream booking connects later." />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {combatSchedule.map((item) => (
            <div key={item.day} className="rounded-xl border border-r8-border bg-r8-elevated p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-r8-muted">{item.day}</p>
              <p className="mt-2 font-display text-xl uppercase text-r8-white">{item.title}</p>
              <p className="mt-1 text-sm text-r8-secondary">{item.time}</p>
              <Button size="sm" className="mt-4" onClick={() => setReserveOpen(true)}>
                Reserve
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section id="programs" className="border-y border-r8-border bg-r8-black-2 py-16">
        <div className="mx-auto max-w-7xl scroll-mt-28 px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Combat Programs" description="Digital programs with video lessons and progress tracking." />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {combatPrograms.map((program) => (
              <article key={program.id} className="overflow-hidden rounded-xl border border-r8-border bg-r8-elevated">
                <div className="relative aspect-[16/10]">
                  <TreatedPhoto src={program.image} alt={program.imageAlt} />
                </div>
                <div className="p-5">
                  <Badge>{program.difficulty}</Badge>
                  <h3 className="mt-3 font-display text-xl uppercase text-r8-white">{program.title}</h3>
                  <p className="mt-2 text-sm text-r8-secondary">{program.summary}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-r8-muted">
                    <div>
                      <dt>Duration</dt>
                      <dd className="text-r8-white">{program.durationWeeks} weeks</dd>
                    </div>
                    <div>
                      <dt>Workouts</dt>
                      <dd className="text-r8-white">{program.workouts}</dd>
                    </div>
                    <div>
                      <dt>Videos</dt>
                      <dd className="text-r8-white">{program.videoLessons}</dd>
                    </div>
                    <div>
                      <dt>Price</dt>
                      <dd className="text-r8-blue-light">{formatPrice(program.price)}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-xs text-r8-muted">Equipment: {program.equipment.join(", ")}</p>
                  <p className="mt-1 text-xs text-r8-muted">Includes progress tracking</p>
                  <Button
                    className="mt-4 w-full"
                    onClick={() => {
                      addItem({
                        id: program.id,
                        slug: program.slug,
                        name: program.title,
                        price: program.price,
                        image: program.image,
                        type: "program",
                      });
                      pushToast(`${program.title} added to cart.`);
                    }}
                  >
                    Add Program
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title="Recommended Equipment" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {combatEquipment.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-xl border border-r8-border bg-r8-elevated">
              <div className="relative aspect-square">
                <TreatedPhoto src={item.image} alt={item.name} />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg uppercase text-r8-white">{item.name}</h3>
                <p className="mt-1 text-sm text-r8-secondary">{item.description}</p>
                <p className="mt-3 text-r8-blue-light">{formatPrice(item.price)}</p>
                <Button
                  size="sm"
                  className="mt-3"
                  onClick={() =>
                    openCheckout("Combat equipment checkout will be connected during payment integration.")
                  }
                >
                  View Details
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-r8-border bg-r8-black-2 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Combat Community"
            description="Discipline, technique, athleticism, and confidence — no cage fighting imagery."
            align="center"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["/images/programs/combat-heavy-bag.jpg", "Heavy bag training"],
              ["/images/combat/boxing-2.jpg", "Boxing class atmosphere"],
              ["/images/community/community-1.jpg", "Athletes training together"],
              ["/images/community/community-3.jpg", "Focused conditioning work"],
            ].map(([src, alt]) => (
              <div key={alt} className="relative aspect-[4/5] overflow-hidden rounded-xl border border-r8-border">
                <TreatedPhoto src={src} alt={alt} />
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-3">
            <Button href="/assessment">Get My Combat Plan</Button>
            <Button href="/membership" variant="secondary">
              Join Membership
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
