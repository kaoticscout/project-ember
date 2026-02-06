import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/withBasePath";

export default function MapPage() {
  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <div className="relative min-h-0 flex-1 overflow-hidden border-[color:var(--border-subtle)] bg-[color:var(--bg-2)]">
        <div className="relative h-full w-full">
          <Image
            alt="Ember world map"
            src={withBasePath("/assets/ZoneMaps/WorldMap.png")}
            fill
            priority
            sizes="100vw"
            className="select-none object-cover"
            style={{ opacity: 0.96 }}
          />

          {/* Readability / cinematic overlays */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_520px_at_18%_20%,color-mix(in_oklab,var(--accent-gold)_12%,transparent),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_520px_at_85%_25%,color-mix(in_oklab,var(--accent-arcane)_12%,transparent),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--bg-0)_08%,transparent)] via-transparent to-[color:color-mix(in_oklab,var(--bg-0)_58%,transparent)]" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[color:color-mix(in_oklab,var(--accent-gold)_12%,transparent)]" />

          {/* Clickable regions (2×2 overlay matching segmented map) */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            <WorldRegion
              href="/map/ironwood/"
              label="Ironwood"
              hint="Forest canopy, hidden trails"
              className="col-start-1 row-start-1"
            />
            <WorldRegion
              href="/map/silvershade/"
              label="Silvershade"
              hint="Moonlit ruins, cold rivers"
              className="col-start-2 row-start-1"
            />
            <WorldRegion
              href="/map/emberwastes/"
              label="Emberwastes"
              hint="Ash storms, scorched ruins"
              className="col-start-1 row-start-2"
            />
            <WorldRegion
              href="/map/voidreach/"
              label="Voidreach"
              hint="Rift fractures, endgame danger"
              className="col-start-2 row-start-2"
            />
          </div>

          {/* Helper chip */}
          <div className="pointer-events-none absolute left-4 top-4 sm:left-6 sm:top-6">
            <div className="pointer-events-auto rounded-2xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_68%,transparent)] px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
              <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                OVERVIEW
              </div>
              <div className="ember-display mt-1 text-xl text-[color:var(--text-0)] sm:text-2xl">
                Ember World
              </div>
              <div className="mt-1 text-xs text-[color:var(--text-2)]">
                Click a region to open that zone map.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorldRegion(props: {
  href: string;
  label: string;
  hint: string;
  className?: string;
}) {
  return (
    <Link
      href={props.href}
      aria-label={`Open ${props.label} map`}
      className={[
        "group relative",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--border-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-0)]",
        props.className ?? "",
      ].join(" ")}
    >
      <div className="absolute inset-0 transition-colors group-hover:bg-black/5" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="absolute inset-4 rounded-3xl border border-[color:color-mix(in_oklab,var(--border-accent)_55%,transparent)] bg-[color:color-mix(in_oklab,var(--bg-0)_18%,transparent)] shadow-[0_20px_60px_rgba(0,0,0,0.30)] backdrop-blur-[2px]" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[260px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_72%,transparent)] px-4 py-3 text-center shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            ZONE
          </div>
          <div className="ember-display mt-1 text-xl text-[color:var(--text-0)]">
            {props.label}
          </div>
          <div className="mt-1 text-xs text-[color:var(--text-2)]">{props.hint}</div>
        </div>
      </div>
    </Link>
  );
}

