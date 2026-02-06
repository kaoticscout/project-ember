"use client";

import Image from "next/image";
import { Hero } from "@/components/site/Hero";
import { OrnamentDivider } from "@/components/site/OrnamentDivider";
import { withBasePath } from "@/lib/withBasePath";
import {
  CURRENT_SEASON_LABEL,
  SOLO_EXPEDITION_LEADERBOARD,
  GROUP_EXPEDITION_LEADERBOARD,
  SEASONAL_CHALLENGES,
  ALL_TIME_RANK_LEADERBOARD,
} from "@/lib/leaderboards";
import type { SoloExpeditionEntry, GroupExpeditionEntry } from "@/lib/leaderboards";

/** Cinematic strip: full-width image + gradient + headline (like HeroSpotlight) */
function LeaderboardHeroStrip(props: {
  eyebrow: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[color:color-mix(in_oklab,var(--border-subtle)_70%,transparent)] bg-[color:var(--bg-2)]">
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
        <div className="absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--bg-0)_50%,transparent)] via-[color:color-mix(in_oklab,var(--bg-0)_78%,transparent)] to-[color:var(--bg-0)]" />
        <div className="absolute inset-0 bg-[radial-gradient(720px_420px_at_70%_40%,color-mix(in_oklab,var(--accent-gold)_14%,transparent),transparent_60%)]" />
      </div>
      <div className="relative">
        <div className="mx-auto max-w-[1320px] px-4 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="rounded-full border border-[color:color-mix(in_oklab,var(--border-subtle)_75%,transparent)] bg-[color:color-mix(in_oklab,var(--bg-2)_55%,transparent)] px-3 py-1 text-[10px] font-extrabold tracking-[0.28em] text-[color:var(--text-1)]">
                {props.eyebrow.toUpperCase()}
              </span>
              <h2 className="ember-display mt-4 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl lg:text-5xl">
                {props.title}
              </h2>
              <p className="mt-3 text-pretty text-base leading-relaxed text-[color:var(--text-1)] sm:text-lg">
                {props.subtitle}
              </p>
            </div>
            <div className="text-right text-xs tracking-[0.32em] text-[color:var(--text-2)]">
              {CURRENT_SEASON_LABEL}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Podium row: #1 gets gold glow, #2/#3 get subtle tier styling */
function SoloRow({ entry, isPodium }: { entry: SoloExpeditionEntry; isPodium: boolean }) {
  const tier = entry.rank === 1 ? "gold" : entry.rank === 2 ? "silver" : entry.rank === 3 ? "bronze" : null;
  return (
    <li
      className={`flex items-center justify-between gap-4 border-b border-[color:var(--border-subtle)] py-4 last:border-0 ${
        isPodium ? "px-4 rounded-xl border border-[color:color-mix(in_oklab,var(--accent-gold)_18%,var(--border-subtle))] bg-[color:color-mix(in_oklab,var(--accent-gold)_6%,transparent)]" : "pb-3"
      }`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`tabular-nums ${
            tier === "gold"
              ? "ember-display text-2xl text-[color:var(--accent-gold)]"
              : tier === "silver"
                ? "ember-display text-xl text-[color:var(--text-1)]"
                : tier === "bronze"
                  ? "text-lg font-semibold text-[color:var(--text-1)]"
                  : "w-8 text-xs tracking-[0.32em] text-[color:var(--text-2)]"
          }`}
        >
          #{entry.rank}
        </span>
        <div className="min-w-0">
          <div className="ember-display text-[color:var(--text-0)]">{entry.name}</div>
          <div className="mt-0.5 text-xs text-[color:var(--text-2)]">
            {entry.class}
            {entry.guild && (
              <>
                <span className="mx-1.5 text-[color:var(--border-subtle)]">·</span>
                <span className="text-[color:var(--accent-gold)]">{entry.guild}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <span className="ember-display tabular-nums text-[color:var(--accent-gold)]">
        {entry.depth}
      </span>
    </li>
  );
}

function GroupRow({ entry, isPodium }: { entry: GroupExpeditionEntry; isPodium: boolean }) {
  const tier = entry.rank === 1 ? "gold" : entry.rank === 2 ? "silver" : entry.rank === 3 ? "bronze" : null;
  return (
    <li
      className={`flex flex-col gap-1 border-b border-[color:var(--border-subtle)] py-4 last:border-0 ${
        isPodium ? "px-4 rounded-xl border border-[color:color-mix(in_oklab,var(--accent-gold)_18%,var(--border-subtle))] bg-[color:color-mix(in_oklab,var(--accent-gold)_6%,transparent)]" : "pb-3"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span
            className={`tabular-nums ${
              tier === "gold"
                ? "ember-display text-2xl text-[color:var(--accent-gold)]"
                : tier === "silver"
                  ? "ember-display text-xl text-[color:var(--text-1)]"
                  : tier === "bronze"
                    ? "text-lg font-semibold text-[color:var(--text-1)]"
                    : "w-8 text-xs tracking-[0.32em] text-[color:var(--text-2)]"
            }`}
          >
            #{entry.rank}
          </span>
          <div className="min-w-0">
            <div className="ember-display text-[color:var(--text-0)]">{entry.squadName}</div>
            <div className="mt-0.5 text-xs text-[color:var(--text-2)]">
              {entry.memberCount} players
              {entry.guild && (
                <>
                  <span className="mx-1.5 text-[color:var(--border-subtle)]">·</span>
                  <span className="text-[color:var(--accent-gold)]">{entry.guild}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <span className="ember-display tabular-nums text-[color:var(--accent-gold)]">
          {entry.depth}
        </span>
      </div>
      {entry.note && (
        <div className="ml-14 text-sm text-[color:var(--text-1)]">{entry.note}</div>
      )}
    </li>
  );
}

/** Expedition column with background atmosphere */
function ExpeditionColumn(props: {
  title: string;
  metricLabel: string;
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-2)]">
      <div className="absolute inset-0">
        <Image
          src={withBasePath(props.imageSrc)}
          alt={props.imageAlt}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover opacity-25"
          priority={false}
        />
        <div className="ember-bg-noise absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[color:color-mix(in_oklab,var(--bg-0)_88%,transparent)]" />
      </div>
      <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="ember-display text-xl text-[color:var(--text-0)]">{props.title}</h3>
          <span className="text-xs tracking-[0.22em] text-[color:var(--text-2)]">
            {props.metricLabel}
          </span>
        </div>
      </div>
      <ul className="relative space-y-2 px-5 py-4">{props.children}</ul>
    </div>
  );
}

/** Challenge card with cinematic frame (radial gradient + noise) */
function ChallengeCard(props: {
  name: string;
  description: string;
  metricLabel: string;
  entries: { rank: number; name: string; value: number | string; subLabel?: string; guild?: string }[];
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[color:color-mix(in_oklab,var(--accent-arcane)_22%,var(--border-subtle))] bg-[color:var(--bg-2)]">
      <div className="absolute inset-0">
        <div className="ember-bg-noise absolute inset-0 opacity-60" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(400px 300px at 80% 20%, color-mix(in oklab, var(--accent-arcane) 12%, transparent), transparent 70%), linear-gradient(180deg, color-mix(in oklab, var(--bg-0) 50%, transparent) 0%, color-mix(in oklab, var(--bg-0) 92%, transparent) 100%)",
          }}
        />
      </div>
      <div className="relative p-5">
        <h3 className="ember-display text-lg text-[color:var(--text-0)]">{props.name}</h3>
        <p className="mt-2 text-xs leading-relaxed text-[color:var(--text-1)]">
          {props.description}
        </p>
        <div className="mt-4 border-t border-[color:var(--border-subtle)] pt-4">
          <div className="mb-2 text-[10px] tracking-[0.22em] text-[color:var(--text-2)]">
            {props.metricLabel.toUpperCase()}
          </div>
          <ul className="space-y-2">
            {props.entries.map((e) => (
              <li
                key={e.rank}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[color:var(--text-2)]">#{e.rank}</span>
                    <span className="truncate font-medium text-[color:var(--text-0)]">
                      {e.name}
                    </span>
                  </div>
                  {(e.subLabel || e.guild) && (
                    <div className="mt-0.5 text-[10px] text-[color:var(--text-2)]">
                      {e.subLabel}
                      {e.guild && (
                        <>
                          {e.subLabel && <span className="mx-1 text-[color:var(--border-subtle)]">·</span>}
                          <span className="text-[color:var(--accent-gold)]">{e.guild}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 tabular-nums text-[color:var(--accent-gold)]">
                  {e.value}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** All-time: top 5 as large cards, 6–10 as compact list */
function AllTimeHall(props: { entries: typeof ALL_TIME_RANK_LEADERBOARD }) {
  const top5 = props.entries.slice(0, 5);
  const rest = props.entries.slice(5);
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[color:color-mix(in_oklab,var(--accent-arcane)_28%,var(--border-subtle))] bg-[color:var(--bg-2)]">
      <div className="absolute inset-0">
        <Image
          src={withBasePath("/assets/Zones/Emberwastes.png")}
          alt=""
          fill
          sizes="1320px"
          className="object-cover opacity-20"
          priority={false}
        />
        <div className="ember-bg-noise absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--bg-0)_40%,transparent)] via-[color:color-mix(in_oklab,var(--bg-0)_75%,transparent)] to-[color:var(--bg-0)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_30%_20%,color-mix(in_oklab,var(--accent-gold)_10%,transparent),transparent_65%)]" />
      </div>

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
              ALL-TIME RANK
            </div>
            <h2 className="ember-display mt-2 text-2xl text-[color:var(--text-0)] sm:text-3xl">
              Highest rank across all seasons
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[color:var(--text-1)]">
              Best rank you&apos;ve ever achieved in any season. Legacy board—never resets.
            </p>
          </div>
        </div>

        {/* Top 5 as spotlight cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {top5.map((entry) => (
            <div
              key={entry.rank}
              className="relative overflow-hidden rounded-xl border border-[color:color-mix(in_oklab,var(--accent-gold)_20%,var(--border-subtle))] bg-[color:color-mix(in_oklab,var(--bg-0)_60%,transparent)] p-5"
            >
              <div className="absolute right-2 top-2 text-4xl font-black tabular-nums leading-none text-[color:var(--text-2)] opacity-30">
                {entry.rank}
              </div>
              <div className="relative">
                <div className="ember-display text-lg text-[color:var(--text-0)]">
                  {entry.name}
                </div>
                <div className="mt-1 text-xs text-[color:var(--text-2)]">
                  {entry.class}
                  {entry.guild && (
                    <>
                      <span className="mx-1.5 text-[color:var(--border-subtle)]">·</span>
                      <span className="text-[color:var(--accent-gold)]">{entry.guild}</span>
                    </>
                  )}
                </div>
                <div className="mt-3">
                  <span className="inline-block rounded border border-[color:color-mix(in_oklab,var(--accent-gold)_35%,var(--border-subtle))] bg-[color:color-mix(in_oklab,var(--accent-gold)_14%,transparent)] px-3 py-1.5 text-sm font-semibold text-[color:var(--accent-gold)]">
                    {entry.peakRank}
                  </span>
                </div>
                <div className="mt-2 text-xs text-[color:var(--text-1)]">
                  {entry.peakSeasonId}
                  {entry.seasonsAtPeak > 1 && (
                    <span className="text-[color:var(--text-2)]">
                      {" "}· {entry.seasonsAtPeak}×
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 6–10 compact list */}
        {rest.length > 0 && (
          <div className="mt-6 border-t border-[color:var(--border-subtle)] pt-6">
            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)]">
              RANKS 6–10
            </div>
            <ul className="mt-3 space-y-2">
              {rest.map((entry) => (
                <li
                  key={entry.rank}
                  className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border-subtle)] pb-3 last:border-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="w-6 text-sm text-[color:var(--text-2)]">{entry.rank}</span>
                      <span className="ember-display text-[color:var(--text-0)]">{entry.name}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-[color:var(--text-2)]">
                      {entry.class}
                      {entry.guild && (
                        <>
                          <span className="mx-1.5 text-[color:var(--border-subtle)]">·</span>
                          <span className="text-[color:var(--accent-gold)]">{entry.guild}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="rounded border border-[color:var(--border-subtle)] bg-[color:var(--bg-1)] px-2 py-1 text-sm font-semibold text-[color:var(--accent-gold)]">
                    {entry.peakRank}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <div>


      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0">
          <div className="ember-bg-noise absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--accent-arcane)_10%,transparent)] via-[color:color-mix(in_oklab,var(--bg-0)_84%,transparent)] to-[color:var(--bg-0)]" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-4">
          {/* Cinematic season strip */}
          <LeaderboardHeroStrip
            eyebrow="THIS SEASON"
            title="Key metric: depth."
            subtitle="Scaling expeditions are the spine. Push as far as you can, rank by deepest floor, reset next month. Solo and group (2–4) run on separate boards."
            imageSrc="/assets/Zones/Silvershade.png"
            imageAlt="Expedition into the depths"
          />

          {/* Expedition leaderboards with atmosphere + podium */}
          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                EXPEDITION LEADERBOARDS
              </div>
              <div className="text-xs tracking-[0.22em] text-[color:var(--text-2)]">
                SOLO · GROUP (2–4)
              </div>
            </div>
            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              <ExpeditionColumn
                title="Solo Expedition"
                metricLabel="FLOOR"
                imageSrc="/assets/Zones/Ironwood.png"
                imageAlt="Solo run"
              >
                {SOLO_EXPEDITION_LEADERBOARD.map((entry) => (
                  <SoloRow
                    key={entry.rank}
                    entry={entry}
                    isPodium={entry.rank <= 3}
                  />
                ))}
              </ExpeditionColumn>
              <ExpeditionColumn
                title="Group Expedition (2–4)"
                metricLabel="FLOOR"
                imageSrc="/assets/Zones/VoidReach.png"
                imageAlt="Squad run"
              >
                {GROUP_EXPEDITION_LEADERBOARD.map((entry) => (
                  <GroupRow
                    key={entry.rank}
                    entry={entry}
                    isPodium={entry.rank <= 3}
                  />
                ))}
              </ExpeditionColumn>
            </div>
          </div>

          <OrnamentDivider className="mt-14 opacity-80" />

          {/* Seasonal challenges: cinematic cards */}
          <div className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                  SEASONAL CHALLENGES
                </div>
                <h2 className="ember-display mt-2 text-2xl text-[color:var(--text-0)]">
                  This season&apos;s challenges
                </h2>
                <p className="mt-2 max-w-xl text-sm text-[color:var(--text-1)]">
                  Each challenge has its own leaderboard. Compete in one or all.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {SEASONAL_CHALLENGES.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  name={challenge.name}
                  description={challenge.description}
                  metricLabel={challenge.metricLabel}
                  entries={challenge.entries}
                />
              ))}
            </div>
          </div>

          <OrnamentDivider className="mt-14 opacity-80" />

          {/* All-time: hall of legends */}
          <div className="mt-14">
            <AllTimeHall entries={ALL_TIME_RANK_LEADERBOARD} />
          </div>
        </div>
      </section>
    </div>
  );
}
