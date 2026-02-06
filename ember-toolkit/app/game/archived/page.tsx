import Link from "next/link";
import { Hero } from "@/components/site/Hero";
import { OrnamentDivider } from "@/components/site/OrnamentDivider";
import { ZoneCarousel } from "@/components/site/ZoneCarousel";

export default function GameArchivedPage() {
  return (
    <div>
      <div className="border-b border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_80%,transparent)] px-4 py-3">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold tracking-[0.2em] text-[color:var(--text-2)]">
            ARCHIVED — Previous game index (not linked from nav)
          </span>
          <Link
            href="/game"
            className="text-sm font-medium text-[color:var(--accent-gold)] hover:text-[color:var(--text-0)]"
          >
            ← Back to Game
          </Link>
        </div>
      </div>

      <Hero
        eyebrow="The game"
        title="How Ember plays"
        subtitle="A survival action RPG about deep hero builds, multi-person world raids, and long, scary journeys across a vast continent."
        background="world"
      >
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="ember-button-cta inline-flex items-center justify-center rounded-xl px-7 py-4 text-center text-sm font-extrabold tracking-[0.18em] opacity-60 cursor-not-allowed sm:px-8 sm:py-4 sm:text-base"
          >
            SIGNUP CLOSED
          </button>
          <Link
            href="/"
            className="ember-button-secondary rounded-md px-4 py-3 text-sm font-medium text-[color:var(--text-1)] hover:text-[color:var(--text-0)]"
          >
            ← Home
          </Link>
        </div>
      </Hero>

      <section className="pt-10 pb-4">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="ember-panel">
            <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
              <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                THE GAME
              </div>
              <div className="ember-display mt-2 text-2xl text-[color:var(--text-0)]">
                Explore these stubs
              </div>
            </div>
            <div className="relative px-5 py-5">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    href: "/game/zones",
                    title: "Zones",
                    desc: "Biome identity, routes, POIs, and hotspots.",
                  },
                  {
                    href: "/game/siege-vehicles",
                    title: "Support vehicles",
                    desc: "Caravans, field rigs, and support tools for long runs.",
                  },
                  {
                    href: "/game/events",
                    title: "Events",
                    desc: "World bosses, rifts, caravans, and other convergence moments.",
                  },
                  {
                    href: "/game/building-progression",
                    title: "Building progression",
                    desc: "Tier ladder, defenses, comforts, and upgrades.",
                  },
                ].map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="group rounded-2xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_65%,transparent)] p-4 hover:border-[color:var(--border-accent)]"
                  >
                    <div className="text-xs font-extrabold tracking-[0.22em] text-[color:var(--text-2)]">
                      {x.title.toUpperCase()}
                    </div>
                    <div className="mt-2 text-sm text-[color:var(--text-1)] group-hover:text-[color:var(--text-0)]">
                      {x.desc}
                    </div>
                    <div className="mt-4 text-sm text-[color:var(--accent-gold)] opacity-0 transition-opacity group-hover:opacity-100">
                      Open →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <OrnamentDivider className="mt-10 opacity-70" />
        </div>
      </section>

      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0">
          <div className="ember-bg-noise absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--accent-arcane)_10%,transparent)] via-[color:color-mix(in_oklab,var(--bg-0)_88%,transparent)] to-[color:var(--bg-0)]" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-4">
          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            EXPLORATION SYSTEMS
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            A continent that stays big and scary.
          </h2>
          <p className="mt-4 max-w-4xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
            Ember's world is built to feel huge for dozens of hours: limited fast travel, long overland routes, and
            fog-of-war that only lifts as you ride, sail, and climb your way across the map.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="ember-panel">
              <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                  Fog-of-war & mapping
                </div>
              </div>
              <div className="relative px-5 py-5 text-sm text-[color:var(--text-1)]">
                The world map starts mostly unknown. You reveal terrain, routes, and POIs only by physically reaching them, with
                optional survey tools (towers, watchposts, crafted maps) that extend your knowledge over time.
              </div>
            </div>

            <div className="ember-panel">
              <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                  Traversal progression
                </div>
              </div>
              <div className="relative px-5 py-5 text-sm text-[color:var(--text-1)]">
                Start on foot, then earn faster mounts and support vehicles. Field workshops, pack wagons, and signal towers
                let solo players and small squads push deeper into dangerous territory without trivializing distance.
              </div>
            </div>

            <div className="ember-panel">
              <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                  Landmarks & far-off goals
                </div>
              </div>
              <div className="relative px-5 py-5 text-sm text-[color:var(--text-1)]">
                Biomes are stitched together with visible landmarks—spires, storm walls, ancient ruins—that sit hours away on the horizon.
                Some late-game dungeons and bosses are only reachable after crossing multiple regions, preserving a sense of journey.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-4 ">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            GAME STYLE
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            Survival Heroes — World of Warcraft Collides with Valheim
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                k: "EXPLORATION & MOVEMENT (WoW-inspired)",
                v: "Mounted travel across a giant continent—routes, biomes, and \u201Cride out\u201D decisions.",
              },
              {
                k: "WORLD & DESTINATIONS (WoW-inspired)",
                v: "Distinct zones with dungeons, strongholds, boss arenas, and hotspots that pull squads together.",
              },
              {
                k: "HOMEBASE (Valheim-inspired)",
                v: "Gather materials, upgrade workbenches, and build a homestead that fuels crafting, comfort, and travel.",
              },
              {
                k: "COMBAT (V Rising–inspired)",
                v: "High-tempo action with a few key abilities—less rotation, more aim, timing, and spacing.",
              },
              {
                k: "HEROES (Heroes of the Storm–inspired)",
                v: "Strong identities and clear roles—each hero feels different to play and to fight against.",
              },
              {
                k: "SEASONS & EVENTS (Optional)",
                v: "An event calendar and seasonal goals that reshape incentives without wiping your world or hero.",
              },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_35%,transparent)] px-5 py-4"
              >
                <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                  {x.k}
                </div>
                <div className="mt-2 text-sm text-[color:var(--text-1)]">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            PRINCIPLES
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            Built for moments. Protected from misery.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                k: "Hero-first gameplay",
                v: "The default activity is adventuring and combat—not spreadsheets and chores.",
              },
              {
                k: "Time-budget friendly",
                v: "Big progress in a few sessions/week. More hours = more options, not unstoppable power.",
              },
              {
                k: "Clarity under chaos",
                v: "Readable telegraphs, strong silhouettes, and fights that look good in clips.",
              },
              {
                k: "High stakes, not deletion",
                v: "Wins matter. Losses sting. Your identity isn't erased every time you log off.",
              },
              {
                k: "Survival tension, not misery",
                v: "Hunger, weather, and biome rules create pressure—but never turn into endless chores.",
              },
              {
                k: "Co-op first, optional PvP",
                v: "Bosses, dungeons, and events are tuned for solo and small groups; PvP is an opt-in layer, not a requirement.",
              },
            ].map((x) => (
              <div key={x.k} className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    {x.k}
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <div className="text-sm text-[color:var(--text-1)]">{x.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-10 pb-10 sm:pb-14">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                CORE LOOP
              </div>
              <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
                Loot. Level. Survive. Explore the frontier.
              </h2>
              <p className="mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
                Pick an objective, ride out fast, overcome the threats, and bring your spoils home. Your homestead is where you craft, rest, and plan the next push deeper into the world.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    What you're doing every session
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    High signal. No fluff.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ol className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    {[
                      "Choose a target (boss, dungeon, event, or resource run).",
                      "Ride out. Fight fast. Manage your survival needs.",
                      "Gather loot and materials — then decide how deep to push.",
                      "Return to your homestead to craft, upgrade, and rest.",
                      "Plan the next expedition into a tougher biome or encounter.",
                    ].map((x, i) => (
                      <li
                        key={x}
                        className="flex items-start gap-3 rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_55%,transparent)] px-4 py-3"
                      >
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-2)_70%,transparent)] text-xs font-semibold text-[color:var(--text-0)]">
                          {i + 1}
                        </span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <OrnamentDivider className="mt-10 opacity-70" />
        </div>
      </section>

      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0">
          <div className="ember-bg-noise absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--accent-arcane)_12%,transparent)] via-[color:color-mix(in_oklab,var(--bg-0)_86%,transparent)] to-[color:var(--bg-0)]" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-4">
          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            TARGETS
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            Leave the fire. Pick a target. Make it back alive.
          </h2>
          <p className="mt-4 max-w-4xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
            Your homestead is safety. Everything valuable is outside, often many minutes or even biomes away. The game is choosing the right
            target for your gear (solo or with friends)—then surviving the journey there and back.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    The expedition loop
                  </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      Prepare, venture out, and return stronger.
                    </div>
                </div>
                <div className="relative px-5 py-5">
                  <ol className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    {[
                      "Bank what you can. Bring what you need.",
                      "Pick a target and ride out fast.",
                      "Handle the survival pressure (hunger, weather, injuries).",
                      "Win the fight (or disengage and regroup).",
                      "Return home with what you earned and upgrade your build.",
                    ].map((x, i) => (
                      <li key={x} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-2)_70%,transparent)] text-xs font-semibold text-[color:var(--text-0)]">
                          {i + 1}
                        </span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    k: "Rifts (dynamic events)",
                    v: "Timed spawns that pull squads into the same moment. Clear waves, close the tear, cash out—then fight the third party.",
                  },
                  {
                    k: "Dungeons",
                    v: "Short, repeatable runs with boss mechanics, build checks, and high-end crafting drops.",
                  },
                  {
                    k: "Strongholds",
                    v: "Fortified PvE outposts: choke points, traps, elites. Crack it clean or get stalled long enough to be contested.",
                  },
                  {
                    k: "Conflict modes (optional PvP)",
                    v: "Opt-in duels, skirmish events, and contested hotspots for players who want extra tension—with cosmetic-forward rewards.",
                  },
                  {
                    k: "Contested hotspots",
                    v: "Elite POIs, roaming events, and resource choke points that reliably generate fights and stories.",
                  },
                ].map((x) => (
                  <div key={x.k} className="ember-panel">
                    <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                      <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                        {x.k}
                      </div>
                    </div>
                    <div className="relative px-5 py-5">
                      <div className="text-sm text-[color:var(--text-1)]">{x.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <OrnamentDivider className="mt-12 opacity-70" />

          <div className="mt-12 text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            HIGH VALUE TARGETS
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            Band Together and Prove Your Strength
          </h2>
          <p className="mt-4 max-w-4xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
            World Raid Bosses are marquee end-game targets: you rally with other players to take down a raid-scale monster.
            During the encounter it's pure cooperation—no PvP—and every player earns their own rewards.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    Why they matter in the month arc
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    A mid/late-month focal point with shard-wide gravity.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    <li>
                      <span className="text-[color:var(--text-0)] font-semibold">Scheduled pressure</span>: predictable windows that create convergence.
                    </li>
                    <li>
                      <span className="text-[color:var(--text-0)] font-semibold">Mechanic checks</span>: telegraphs, role coordination, and execution.
                    </li>
                    <li>
                      <span className="text-[color:var(--text-0)] font-semibold">Loot injection</span>: high-end crafting components that fuel builds and progression.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-4">
                <div className="ember-panel">
                  <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                    <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                      Rules of engagement
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      Co-op clarity.
                    </div>
                  </div>
                  <div className="relative px-5 py-5">
                    <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Non‑PvP encounter</span>: you're here to fight the boss together.
                      </li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Personal loot</span>: every player gets their own drop.
                      </li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Big telegraphs</span>: readable, cinematic mechanics.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="ember-panel">
                  <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                    <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                      The real test
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      Kill it… then get home.
                    </div>
                  </div>
                  <div className="relative px-5 py-5">
                  <div className="text-sm text-[color:var(--text-1)]">
                    The boss is co-op. The world isn't. The win is making it back to camp with the reward and turning it into power.
                  </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0">
          <div className="ember-bg-noise absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--accent-gold)_10%,transparent)] via-[color:color-mix(in_oklab,var(--bg-0)_88%,transparent)] to-[color:var(--bg-0)]" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-4">
          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            LEVELING
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            Pick a hero. Level up. Build your kit.
          </h2>
          <p className="mt-4 max-w-4xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
            You choose a hero archetype to adventure with—your role, your strengths, your playstyle.
            Then you earn experience by taking targets, completing runs, and winning high-stakes moments.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    How you earn XP
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    Adventure-first. Always tied to targets.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <div className="grid gap-3 text-sm text-[color:var(--text-1)] sm:grid-cols-2">
                    {[
                      "Rift clears and dynamic events",
                      "Dungeon and stronghold completions",
                      "World raid boss kills",
                      "Successful high-risk runs and clutch recoveries",
                      "Objective holds in hotspots",
                    ].map((x) => (
                      <div
                        key={x}
                        className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_55%,transparent)] px-4 py-3"
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-xs tracking-[0.22em] text-[color:var(--text-2)]">
                    Your power comes from doing the hard stuff—not hiding in safety.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    What leveling unlocks
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    More options. More identity.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    <li>Build-defining upgrades (talents/runes/augments).</li>
                    <li>Better gear and stronger consumables.</li>
                    <li>More tools for survival and co-op play: burst windows, survivability, mobility.</li>
                    <li>Clear hero identity: you bring a role to the squad.</li>
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/game/classes"
                      className="ember-button-primary rounded-md px-4 py-2 text-sm font-medium text-[color:var(--text-0)]"
                    >
                      Browse heroes
                    </Link>
                    <Link
                      href="/progression"
                      className="ember-button-secondary rounded-md px-4 py-2 text-sm font-medium text-[color:var(--text-1)] hover:text-[color:var(--text-0)]"
                    >
                      See progression
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <OrnamentDivider className="my-12 opacity-70" />

          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            OPTIONAL PVP MODES
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            If you want conflict, take it on your terms.
          </h2>
          <p className="mt-4 max-w-4xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
            Ember is first and foremost a co-op PvE survival RPG. PvP, when enabled, is an optional layer: duels, skirmishes, and contested events that never erase your long-term progression or turn the game into a 24/7 war sim.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    Example conflict mode (if enabled)
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    Think "event-based skirmishes", not mandatory base raids.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ol className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    {[
                      "Flag yourself for PvP or enter a clearly marked conflict zone.",
                      "Fight over a temporary objective (event, relic, caravan, or arena).",
                      "Earn rewards that skew toward cosmetics and bragging rights.",
                      "Go back to adventuring without losing your homestead or hero.",
                    ].map((x, i) => (
                      <li
                        key={x}
                        className="flex items-start gap-3 rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_55%,transparent)] px-4 py-3"
                      >
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-2)_70%,transparent)] text-xs font-semibold text-[color:var(--text-0)]">
                          {i + 1}
                        </span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-4">
                <div className="ember-panel">
                  <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                    <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                      Win conditions
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      Status and stories, not deletion.
                    </div>
                  </div>
                  <div className="relative px-5 py-5">
                    <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Event rewards</span>: cosmetics, titles, and small sidegrades.
                      </li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Bragging rights</span>: leaderboard lines, badges, and clips.
                      </li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">No hard wipes</span>: your homestead and progression remain intact.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="ember-panel">
                  <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                    <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                      Fair-play guardrails
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      High stakes, not misery.
                    </div>
                  </div>
                  <div className="relative px-5 py-5">
                    <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Opt-in only</span>: you always know when you're in PvP space.
                      </li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Bounded windows</span>: no 24/7 pressure or mandatory attendance.</li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Clear reads</span>: UI and map callouts make fights understandable.</li>
                    </ul>
                    <div className="mt-4 text-xs tracking-[0.22em] text-[color:var(--text-2)]">
                      The goal is extra spice on top of the survival RPG—not something you're forced into.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <OrnamentDivider className="my-12 opacity-70" />

          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            HOMESTEADING
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            Build a home that makes adventures better.
          </h2>
          <p className="mt-4 max-w-4xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
            Homesteading is the heart of the survival loop: your layout, workbenches, and comforts are what
            keep you supplied and rested. A good base doesn't make you invincible—it makes every expedition deeper, safer, and more rewarding.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="grid gap-4">
                <div className="ember-panel">
                  <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                    <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                      What "defense" means in Ember
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      Time is a resource. You're buying it.
                    </div>
                  </div>
                  <div className="relative px-5 py-5">
                    <div className="grid gap-3 text-sm text-[color:var(--text-1)] sm:grid-cols-2">
                      {[
                        "Walls and doors that control entry paths",
                        "Turrets that punish obvious approaches",
                        "Traps and alarms that create warning and chaos",
                        "Wards/detectors to spot infiltrators and sappers",
                        "Choke points and fallback rooms for layered defense",
                        "Vault placement that forces commitment to reach",
                      ].map((x) => (
                        <div
                          key={x}
                          className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_55%,transparent)] px-4 py-3"
                        >
                          {x}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-xs tracking-[0.22em] text-[color:var(--text-2)]">
                      The goal: delay the breach long enough for defenders to rally and swing the fight.
                    </div>
                  </div>
                </div>

                <div className="ember-panel">
                  <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                    <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                      Workbench progression (Rust-style)
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      Materials unlock tiers. Tiers unlock power.
                    </div>
                  </div>
                  <div className="relative px-5 py-5">
                    <div className="text-sm text-[color:var(--text-1)]">
                      Your stronghold isn't just "more walls"—it's a tech ladder. As you collect materials and complete
                      upgrades, your workbench tier rises and expands what you can craft: stronger building parts,
                      better defenses, smarter traps, and higher-end frontier counterplay.
                    </div>
                    <ul className="mt-4 grid gap-3 text-sm text-[color:var(--text-1)]">
                      <li>
                      <span className="text-[color:var(--text-0)] font-semibold">Tier upgrades</span>: spend gathered + rare mats to unlock new recipes.
                      </li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Craft gates</span>: the best turrets, walls, and wards require higher tiers.
                      </li>
                      <li>
                      <span className="text-[color:var(--text-0)] font-semibold">Base power scaling</span>: progression turns your homestead into a place worth rallying around.
                      </li>
                    </ul>
                    <div className="mt-4 text-xs tracking-[0.22em] text-[color:var(--text-2)]">
                      Gather → upgrade → craft → fortify → take on tougher events and biomes.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-4">
                <div className="ember-panel">
                  <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                    <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                      Resource collection
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      How you get materials to build.
                    </div>
                  </div>
                  <div className="relative px-5 py-5">
                    <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Gathering</span>: mine ore, harvest timber, and pick up fibers on your runs.
                      </li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Salvage</span>: break down spare gear and base parts into components.
                      </li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Targets</span>: dungeons, strongholds, and bosses drop rare building mats.
                      </li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Risk routes</span>: contested hotspots yield the best returns—but attract raids.
                      </li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Trade</span>: swap surplus resources with other players to finish a build fast.
                      </li>
                    </ul>
                    <div className="mt-4 text-xs tracking-[0.22em] text-[color:var(--text-2)]">
                      Your base is made from what you survive bringing home.
                    </div>
                  </div>
                </div>

                <div className="ember-panel">
                  <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                    <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                      Creativity wins defenses
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      Your layout is a weapon.
                    </div>
                  </div>
                  <div className="relative px-5 py-5">
                    <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Angle denial</span>: force attackers into crossfire.
                      </li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Layered rooms</span>: trade space slowly, not all at once.
                      </li>
                      <li>
                        <span className="text-[color:var(--text-0)] font-semibold">Bait vaults</span>: punish overcommit with traps and collapse routes.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="ember-panel">
                  <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                    <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                      The defensive win
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      Survive the onslaught.
                    </div>
                  </div>
                  <div className="relative px-5 py-5">
                    <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                      <li>Spot incoming threats early—storms, invasions, or roaming elites.</li>
                      <li>Use your layout, traps, and wards to blunt the first hit.</li>
                      <li>Stabilize at a fallback line, recover, and push back out into the world.</li>
                    </ul>
                    <div className="mt-4 text-xs tracking-[0.22em] text-[color:var(--text-2)]">
                      A good homestead turns emergencies into stories—not resets.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0">
          <div className="ember-bg-noise absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--accent-gold)_12%,transparent)] via-[color:color-mix(in_oklab,var(--bg-0)_86%,transparent)] to-[color:var(--bg-0)]" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-4">
          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            SEASONS & EVENT ARCS
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            Event chapters. Seasonal legacy.
          </h2>
          <p className="mt-4 max-w-4xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
            Ember can run on a cadence of event "chapters": arcs that ramp pressure and create finales,
            while seasons track long-term prestige and cosmetics. The goal is fresh incentives—without turning the game into a wipe-driven job.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              {
                k: "Early chapter",
                v: "Scout routes, gear up, and establish a homestead.",
              },
              {
                k: "Mid chapter",
                v: "Hotspots converge. Bosses and elite events escalate.",
              },
              {
                k: "Late chapter",
                v: "High-threat windows. Big world events and finales.",
              },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_35%,transparent)] px-5 py-4"
              >
                <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                  {x.k.toUpperCase()}
                </div>
                <div className="ember-display mt-2 text-xl text-[color:var(--text-0)]">
                  {x.v}
                </div>
              </div>
            ))}
          </div>

          <OrnamentDivider className="my-12 opacity-70" />

          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            SEASONAL TRIALS
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            Build your legacy. Prove you're the best.
          </h2>
          <p className="mt-4 max-w-4xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
            Each season can introduce a set of ranked challenges designed to surface the best-of-the-best.
            Climb by winning the hardest PvE moments—world bosses, elite dungeons, high-threat runs, and contested objectives—
            then earn special, unique rewards that broadcast your rank everywhere you go.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    What trials measure
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    Offense. Defense. Execution. Under pressure.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <div className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    {[
                      "Boss Trials: down world raid bosses during high-threat windows.",
                      "Dungeon Trials: clear elite dungeons and strongholds without wipes.",
                      "Survival Trials: complete high-value runs under harsh weather or biome modifiers.",
                      "Control Trials: hold objectives in contested zones or events.",
                      "Finale Trials: finish the season's big events strong—late pressure counts.",
                    ].map((x) => (
                      <div
                        key={x}
                        className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_55%,transparent)] px-4 py-3"
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    The promise
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    Competitive prestige without pay-to-win.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <div className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    <div className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_55%,transparent)] px-4 py-3">
                      Trials reward consistency and standout moments—not 24/7 grind.
                    </div>
                    <div className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_55%,transparent)] px-4 py-3">
                      Rewards are cosmetic, prestige, and identity.
                    </div>
                    <div className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_55%,transparent)] px-4 py-3">
                      The week ends. Your legacy doesn't.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0">
          <div className="ember-bg-noise absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--accent-ember)_10%,transparent)] via-[color:color-mix(in_oklab,var(--bg-0)_86%,transparent)] to-[color:var(--bg-0)]" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-4">
          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            COSMETIC LEGACY
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            Your stuff, your style, your story. Make it your own.
          </h2>
          <p className="mt-4 max-w-4xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
            Cosmetics are the long game. Every season you chase moments that turn into identity—permanent unlocks that
            don't get wiped, don't get power-crept, and don't ask you to no-life the game. When the gates open and the
            raid window hits, your look tells a story: where you've been, what you've beaten, and who learned to fear you.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    Why cosmetics drive replayability
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    Power resets. Identity stacks.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    <li>
                      <span className="text-[color:var(--text-0)] font-semibold">Seasonal chase</span>: each season adds new sets, themes, and trophies.
                    </li>
                    <li>
                      <span className="text-[color:var(--text-0)] font-semibold">Skill-locked</span>: the rarest looks come from the hardest moments.
                    </li>
                    <li>
                      <span className="text-[color:var(--text-0)] font-semibold">Always relevant</span>: cosmetics don't get invalidated by new gear tiers.
                    </li>
                    <li>
                      <span className="text-[color:var(--text-0)] font-semibold">Social signal</span>: you can read someone's story at a glance.
                    </li>
                  </ul>
                  <div className="mt-4 text-xs tracking-[0.22em] text-[color:var(--text-2)]">
                    If it looks expensive, it should have a story.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    How you earn them
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    Build a legacy through real play.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <div className="grid gap-3 text-sm text-[color:var(--text-1)] sm:grid-cols-2">
                    {[
                      "Seasonal Trials ranks + milestones",
                      "World raid boss trophies + event clears",
                      "High-threat run streaks and clutch recoveries",
                      "Zone control and contested hotspot wins (if PvP is enabled)",
                      "Event chains and rare destination completions",
                    ].map((x) => (
                      <div
                        key={x}
                        className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_55%,transparent)] px-4 py-3"
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-xs tracking-[0.22em] text-[color:var(--text-2)]">
                    Cosmetics are permanent. The proof is how you got them.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                k: "Base themes",
                v: "Walls, doors, lighting, banners, vault room skins, weathering, and patina.",
              },
              {
                k: "Hero skins",
                v: "Armor sets + silhouette-safe variants per archetype and season.",
              },
              {
                k: "Turret & trap skins",
                v: "Defenses styled to match your base theme—still readable in combat.",
              },
              {
                k: "Support kit skins",
                v: "Caravans, field rigs, and support tools with seasonal identity.",
              },
              {
                k: "Mount variations",
                v: "Mount skins, tack, trails, and prestige trims for parade moments.",
              },
              {
                k: "Ability VFX",
                v: "Clarity-safe spell effects, trails, auras, and finisher flourishes.",
              },
              {
                k: "Titles & banners",
                v: "Season tags, boss-slayer titles, event honors, leaderboard trims.",
              },
              {
                k: "Emotes & victory poses",
                v: "Post-fight flexes and squad rituals that make clips iconic.",
              },
              {
                k: "Base trophies",
                v: "Boss heads, relic plinths, and pennants from big moments—displayed in your homestead.",
              },
            ].map((x) => (
              <div key={x.k} className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    {x.k}
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <div className="text-sm text-[color:var(--text-1)]">{x.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ZoneCarousel
        preface={{
          eyebrow: "THE MAP",
          title: "One continent. Many biomes. Endless destinations.",
          description:
            "Ember takes place on a single massive continent split into distinct biomes—each with its own weather, routes, threats, and must-know destinations. Every zone is built around places worth riding toward: homesteads, strongholds, dungeons, and boss lairs.",
          bullets: [
            "Biome identity: unique hazards, visibility, and traversal.",
            "Landmarks: memorable POIs that become story magnets.",
            "Destinations: dungeons, strongholds, homesteads, and world-boss arenas.",
            "Routes: safe paths, fast paths, and risky paths.",
            "Resource pockets: materials you can build a base from.",
            "Choke points: places where ambushes and big set-piece fights make sense.",
          ],
        }}
      />
    </div>
  );
}
