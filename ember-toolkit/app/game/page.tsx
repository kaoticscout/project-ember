import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/withBasePath";

type Accent = "ember" | "arcane" | "gold";

type DifferentiatorSpotlight = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  accent: Accent;
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string;
};

const ACCENT_TO_CSS_VAR: Record<Accent, string> = {
  ember: "var(--accent-ember)",
  arcane: "var(--accent-arcane)",
  gold: "var(--accent-gold)",
};

const DIFFERENTIATORS: DifferentiatorSpotlight[] = [
  {
    id: "one-month-loop",
    eyebrow: "Core differentiator",
    title: "One month. One run. Meta that carries over.",
    subtitle:
      "The world resets on a fixed one-month cycle. Everyone runs against the same clock—push as far as you can, then do it again. Your long-term talent tree and unlocks carry over, earned by how far you got.",
    description:
      "Rotating content and challenges keep each month fresh. No other survival RPG combines short predictable resets, seasonal variety, and meaningful meta progression in one package. Start, push, peak, reset; your account keeps growing.",
    accent: "gold",
    imageSrc: "/assets/Zones/Emberwastes.png",
    imageAlt: "Vast world under a seasonal cycle",
  },
  {
    id: "progress-solo-dominate-together",
    eyebrow: "Core differentiator",
    title: "Progress on your own. Dominate together.",
    subtitle:
      "Co-op moments—world bosses, caravan runs, convergence events—give you a reason to link up. Your loot and rank have an audience. Progress solo; flex together.",
    description:
      "The world isn't an isolated sandbox. Shared goals and group content are optional, not required. Cosmetics, titles, and seasonal trophies let you show off what you achieved. When you do group content, the win and bragging rights are shared.",
    accent: "arcane",
    imageSrc: "/assets/Zones/VoidReach.png",
    imageAlt: "Squad taking on a world boss",
    videoSrc: "/assets/Events/Boss.mp4",
  },
  {
    id: "guild-halls",
    eyebrow: "Core differentiator",
    title: "Guild halls: the binding glue",
    subtitle:
      "A shared home to meet people, form squads, and find runs. Guild leaderboards and quests give the group something to push for. Members build the space together—trophies, amenities, identity.",
    description:
      "Without a shared home, the world feels empty. Guild halls turn the sandbox into a living world. New month, fresh build—contributing to the hall is part of the loop. The space reflects who you are as a guild.",
    accent: "ember",
    imageSrc: "/assets/Zones/Ironwood.png",
    imageAlt: "Guild hall as social hub",
  },
  {
    id: "scaling-expeditions",
    eyebrow: "Core differentiator",
    title: "Scaling expeditions + seasonal leaderboards",
    subtitle:
      "Runs that scale by depth. Leaderboards that rank by how far you got. Push within the month, climb the board, reset, repeat. One activity always available and always pushable.",
    description:
      "Expeditions are the spine of the seasonal game: go in, push depth, get out. No ceiling. Same format with higher stakes. Rewards and bragging rights attach to placement. This is what you do this month.",
    accent: "gold",
    imageSrc: "/assets/Zones/Silvershade.png",
    imageAlt: "Expedition pushing into deeper levels",
    videoSrc: "/assets/Events/DungeonDelve.mp4",
  },
];

function CinematicMediaFrame(props: {
  label: string;
  accent: Accent;
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string;
}) {
  const accent = ACCENT_TO_CSS_VAR[props.accent];
  const videoSrc = props.videoSrc ? withBasePath(props.videoSrc) : undefined;
  const imageSrc = withBasePath(props.imageSrc);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-2)]">
      <div className="absolute inset-0">
        <div className="ember-bg-noise absolute inset-0 opacity-80" />
        <div
          className="absolute inset-0"
          style={{
            background:
              `radial-gradient(900px 520px at 18% 12%, color-mix(in oklab, ${accent} 18%, transparent), transparent 62%), ` +
              `linear-gradient(180deg, color-mix(in oklab, var(--bg-0) 38%, transparent) 0%, color-mix(in oklab, var(--bg-0) 84%, transparent) 62%, var(--bg-0) 100%)`,
          }}
        />
      </div>

      <div className="relative pb-[56.25%]">
        {videoSrc ? (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-95"
            src={videoSrc}
            playsInline
            muted
            loop
            autoPlay
            controls
            preload="metadata"
          />
        ) : (
          <div className="absolute inset-0">
            <Image
              src={imageSrc}
              alt={props.imageAlt}
              fill
              sizes="(min-width: 1024px) 1320px, 100vw"
              className="object-cover opacity-90"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:color-mix(in_oklab,var(--bg-0)_60%,transparent)]" />
          </div>
        )}
      </div>
    </div>
  );
}

function DifferentiatorSection(props: { differentiator: DifferentiatorSpotlight; flip?: boolean }) {
  const d = props.differentiator;
  const accent = ACCENT_TO_CSS_VAR[d.accent];
  const align = props.flip ? "lg:justify-end" : "lg:justify-start";
  const textAlign = props.flip ? "lg:text-right" : "";
  const labelAlign = props.flip ? "lg:justify-end" : "";

  return (
    <section id={d.id} className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-3xl border border-[color:color-mix(in_oklab,var(--border-subtle)_70%,transparent)] bg-[color:var(--bg-2)]">
        <div className="absolute inset-0">
          <div className="ember-bg-noise absolute inset-0 opacity-70" />
          <div
            className="absolute inset-0"
            style={{
              background:
                `radial-gradient(900px 520px at 18% 12%, color-mix(in oklab, ${accent} 14%, transparent), transparent 62%), ` +
                `linear-gradient(180deg, color-mix(in oklab, var(--bg-0) 55%, transparent) 0%, color-mix(in oklab, var(--bg-0) 88%, transparent) 62%, var(--bg-0) 100%)`,
            }}
          />
        </div>

        <div className="relative p-6 sm:p-10">
          <CinematicMediaFrame
            label={d.title}
            accent={d.accent}
            imageSrc={d.imageSrc}
            imageAlt={d.imageAlt}
            videoSrc={d.videoSrc}
          />

          <div className="mt-8 flex justify-center">
            <div className="h-px w-full max-w-3xl bg-[color:color-mix(in_oklab,var(--border-subtle)_70%,transparent)]" />
          </div>

          <div className="mt-8">
            <div className={`flex ${align}`}>
              <div className={`w-full max-w-3xl ${textAlign}`}>
                <div className={`flex flex-wrap items-center gap-2 ${labelAlign}`}>
                  <span
                    className="rounded-full border border-[color:color-mix(in_oklab,var(--border-subtle)_75%,transparent)] bg-[color:color-mix(in_oklab,var(--bg-2)_55%,transparent)] px-3 py-1 text-[10px] font-extrabold tracking-[0.28em] text-[color:var(--text-1)]"
                    style={{
                      boxShadow: `0 0 0 1px color-mix(in oklab, ${accent} 28%, transparent), 0 0 18px 0 color-mix(in oklab, ${accent} 14%, transparent)`,
                    }}
                  >
                    {d.eyebrow.toUpperCase()}
                  </span>
                </div>

                <h2 className="ember-display mt-4 text-balance text-4xl text-[color:var(--text-0)] sm:text-5xl">
                  {d.title}
                </h2>
                <p className="mt-4 text-pretty text-base leading-relaxed text-[color:var(--text-1)] sm:text-lg">
                  {d.subtitle}
                </p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-[color:var(--text-1)]">
                  {d.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSpotlight(props: {
  eyebrow: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  flip?: boolean;
}) {
  const align = props.flip ? "lg:justify-end" : "lg:justify-start";
  const textAlign = props.flip ? "lg:text-right" : "";
  const labelAlign = props.flip ? "lg:justify-end" : "";

  return (
    <section>
      <div className="relative overflow-hidden rounded-3xl border border-[color:color-mix(in_oklab,var(--border-subtle)_70%,transparent)] bg-[color:var(--bg-2)]">
        <div className="absolute inset-0">
          <Image
            src={withBasePath(props.imageSrc)}
            alt={props.imageAlt}
            fill
            sizes="(min-width: 1024px) 1320px, 100vw"
            className="object-cover"
            priority={false}
          />
          <div className="ember-bg-noise absolute inset-0 opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--bg-0)_55%,transparent)] via-[color:color-mix(in_oklab,var(--bg-0)_75%,transparent)] to-[color:var(--bg-0)]" />
          <div className="absolute inset-0 bg-[radial-gradient(720px_420px_at_20%_30%,color-mix(in_oklab,var(--accent-gold)_16%,transparent),transparent_65%)]" />
        </div>

        <div className="relative">
          <div className="mx-auto max-w-[1320px] px-4 py-14 sm:py-20 lg:py-24">
            <div className={`flex ${align}`}>
              <div className={`w-full max-w-2xl ${textAlign}`}>
                <div className={`flex flex-wrap items-center gap-2 ${labelAlign}`}>
                  <span className="rounded-full border border-[color:color-mix(in_oklab,var(--border-subtle)_75%,transparent)] bg-[color:color-mix(in_oklab,var(--bg-2)_55%,transparent)] px-3 py-1 text-[10px] font-extrabold tracking-[0.28em] text-[color:var(--text-1)]">
                    {props.eyebrow.toUpperCase()}
                  </span>
                </div>

                <h2 className="ember-display mt-4 text-balance text-4xl text-[color:var(--text-0)] sm:text-5xl lg:text-6xl">
                  {props.title}
                </h2>
                <p className="mt-4 text-pretty text-base leading-relaxed text-[color:var(--text-1)] sm:text-lg">
                  {props.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GamePage() {
  return (
    <div>
      <section id="what-makes-ember-different" className="scroll-mt-24 pb-16 pt-10 sm:pt-14">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            WHAT MAKES EMBER DIFFERENT
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            Four pillars that define the experience
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
            Ember isn't just another survival RPG. These core differentiators—one-month loop, meta progression, guild halls, and scaling expeditions—shape every system and every moment.
          </p>

          <div className="mt-10 space-y-8 sm:space-y-10">
            {DIFFERENTIATORS.map((d, idx) => (
              <DifferentiatorSection key={d.id} differentiator={d} flip={idx % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <HeroSpotlight
        eyebrow="The fantasy"
        title="Ride into the unknown, come home with a story."
        subtitle="You wake at the edge of the world with a half‑remembered kit and a broken map. Every night you push the fog back a little further—new biomes, stranger enemies, and raid‑scale threats buried deep in the wilds."
        imageSrc="/assets/Zones/Emberwastes.png"
        imageAlt="Hero riding across a stormy wasteland"
      />

      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0">
          <Image
            src={withBasePath("/assets/Zones/VoidReach.png")}
            alt="Solo and co-op gameplay"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority={false}
          />
          <div className="ember-bg-noise absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--accent-ember)_10%,transparent)] via-[color:color-mix(in_oklab,var(--bg-0)_86%,transparent)] to-[color:var(--bg-0)]" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-4">
          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            SOLO OR TOGETHER
          </div>
          <h2 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            Log in alone. Link up later. The world stays meaningful.
          </h2>
          <p className="mt-4 max-w-4xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
            Ashfall is built to respect both playstyles: you can treat it as a lonely expedition game or as a small‑squad
            raid sandbox—and move between those modes without feeling like you're in a different game.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-2)]">
              <div className="absolute inset-0">
                <Image
                  src={withBasePath("/assets/Zones/Ironwood.png")}
                  alt="Solo exploration"
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover opacity-30"
                  priority={false}
                />
                <div className="ember-bg-noise absolute inset-0 opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[color:color-mix(in_oklab,var(--bg-0)_90%,transparent)]" />
              </div>
              <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                  Solo fantasy
                </div>
              </div>
              <div className="relative px-5 py-4 text-sm text-[color:var(--text-1)]">
                Chart coastlines, test builds, and clear scaled‑down versions of world bosses at your own pace. Your
                homestead grows with you, and the map you've revealed is there when friends show up.
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-2)]">
              <div className="absolute inset-0">
                <Image
                  src={withBasePath("/assets/Zones/VoidReach.png")}
                  alt="Co-op raid"
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover opacity-30"
                  priority={false}
                />
                <div className="ember-bg-noise absolute inset-0 opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[color:color-mix(in_oklab,var(--bg-0)_90%,transparent)]" />
              </div>
              <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                  Small‑squad raids
                </div>
              </div>
              <div className="relative px-5 py-4 text-sm text-[color:var(--text-1)]">
                Grab 1–3 friends and treat the world like a raid instance you live in: role compositions, planned
                expeditions, shared homesteads, and world events designed to feel like "that night" stories.
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/game/zones"
              className="ember-button-primary rounded-md px-5 py-3 text-sm font-medium text-[color:var(--text-0)]"
            >
              Dive into the game details →
            </Link>
            <Link
              href="/seasons"
              className="ember-button-secondary rounded-md px-5 py-3 text-sm font-medium text-[color:var(--text-1)] hover:text-[color:var(--text-0)]"
            >
              See seasons & rewards →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
