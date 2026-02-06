import Link from "next/link";

export default function DifferentiatorsPage() {
  return (
    <div>
      <section className="pb-16 pt-10 sm:pt-14">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            BRAINSTORM
          </div>
          <h1 className="ember-display mt-3 text-balance text-3xl text-[color:var(--text-0)] sm:text-4xl">
            Differentiator ideas
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
            Concepts that could make Ember meaningfully distinct in a crowded space—Valheim, Enshrouded, Grounded, and beyond.
          </p>

          {/* --- Differentiator: Monthly loop + meta progression --- */}
          <div className="mt-12">
            <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
              DIFFERENTIATOR
            </div>
            <h2 className="ember-display mt-3 text-balance text-2xl text-[color:var(--text-0)] sm:text-3xl">
              One-month reset loop + meta progression
            </h2>
            <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
              No major survival RPG has combined a predictable, short-cycle wipe with seasonal content and permanent meta rewards—Rust has the cadence; Diablo has the meta. Ember can own the intersection.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    The loop
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    Push as hard and as far as you can each month.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Fixed cadence</span>: the world (or the relevant progression layer) resets on a one-month cycle. Everyone runs against the same clock.
                    </li>
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Clear stakes</span>: you're racing a known finish line, not grinding into the void. The deadline focuses effort and creates shared reference points.
                    </li>
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Replayability</span>: each month is a fresh run with a defined arc—start, push, peak, reset—instead of an endless, samey grind.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    Content & challenges
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    What changes month over month.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Rotating content</span>: biomes, events, bosses, or modifiers shift so the world stays fresh. A given month might emphasize a specific region or threat.
                    </li>
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Rotating challenges</span>: objectives, milestones, and difficulty curves tune per season so the meta doesn’t go stale.
                    </li>
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">“This month” identity</span>: “this wipe” or “this season”—a shared reference point—gives players a common story and healthy stakes.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    Meta progression
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    Progress that carries across resets.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Earned by how far you pushed</span>: performance in the month—depth reached, bosses downed, milestones hit—converts into meta currency or progress that carries over.
                    </li>
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Long-term talent tree</span>: a permanent tree (or equivalent) that unlocks across many seasons, so identity and power compound over time.
                    </li>
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Customizable unlocks</span>: players choose what to unlock so builds and goals stay personal rather than one-size-fits-all.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 ember-panel">
            <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
              <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                Why this is unique
              </div>
              <div className="mt-1 text-sm text-[color:var(--text-2)]">
                The gap in the market.
              </div>
            </div>
            <div className="relative px-5 py-5">
              <p className="text-sm text-[color:var(--text-1)]">
                Valheim, Enshrouded, Grounded, and most survival RPGs are either persistent or use long, vague “seasons” with no real wipe. Rust has the wipe cadence but isn’t a progression RPG with deep meta. Diablo has seasons and meta progression but isn’t survival. Ember combines <span className="font-semibold text-[color:var(--text-0)]">short, predictable resets</span>, <span className="font-semibold text-[color:var(--text-0)]">rotating content and challenges</span>, and <span className="font-semibold text-[color:var(--text-0)]">meaningful meta progression</span> in one survival RPG—a clear, explainable position.
              </p>
            </div>
          </div>

          {/* --- Differentiator: Solo progress, together dominance --- */}
          <div className="mt-14">
            <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
              DIFFERENTIATOR
            </div>
            <h2 className="ember-display mt-3 text-balance text-2xl text-[color:var(--text-0)] sm:text-3xl">
              Progress on your own. Dominate together.
            </h2>
            <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
              The world is not an isolated sandbox. It includes moments built for playing together and for showing off loot and progress—solo play and group dominance share the same stage.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    Work together
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    Designed for groups, not just parallel play.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Co-op moments</span>: events, bosses, and objectives built for groups—a reason to link up, not just parallel play.
                    </li>
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Shared goals</span>: moments where "we" matters. Take down the big thing, hold the line, or race the clock as a squad.
                    </li>
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Optional, not required</span>: you can progress on your own; group play is optional—the cherry on top, not a gate.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    Show off loot & progress
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    A stage for what you've earned.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Visible progress</span>: ways to show off what you pushed for—cosmetics, titles, base flair, or seasonal trophies that signal what you achieved.
                    </li>
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Social proof</span>: the game isn't a single-player box; your loot and rank have an audience. That makes the grind feel meaningful.
                    </li>
                    <li>
                      <span className="font-semibold text-[color:var(--text-0)]">Dominate together</span>: when you do group content, the win is shared—and the bragging rights are too. Progress solo, flex together.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
              HOW PLAYERS WORK TOGETHER
            </div>
            <h3 className="ember-display mt-2 text-xl text-[color:var(--text-0)] sm:text-2xl">
              Ideas for co-op moments
            </h3>
            <p className="mt-2 max-w-3xl text-sm text-[color:var(--text-1)]">
              Ways the game can create shared "we did that" moments without requiring a full-time group.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "World / raid bosses",
                  body: "Scheduled or spawn-based bosses that need roles, coordination, and multiple players to take down. Everyone earns rewards; the kill is a shared story.",
                },
                {
                  title: "Caravan or convoy runs",
                  body: "Escort a payload (supplies, relic, NPC) across dangerous territory. One drives or leads; others defend. Success depends on the whole squad making it through.",
                },
                {
                  title: "Stronghold assaults",
                  body: "Attack or defend a fixed objective—breach the gates, hold the point, or survive the wave. Clear start and end; clear win condition for the group.",
                },
                {
                  title: "Timed convergence events",
                  body: "A rift opens, a storm hits, or a high-value target appears. Players in the area (solo or premade) can choose to participate. Those who show up share the objective and the loot.",
                },
                {
                  title: "Expedition deep runs",
                  body: "Push into a deadly biome or dungeon as a squad with shared supplies and one extract point. Go as far as you dare together; get everyone out with what you found. (See below: scaling expeditions + seasonal leaderboards.)",
                },
                {
                  title: "Bounty or hunt boards",
                  body: "Group bounties that scale with party size—harder targets, better rewards. Optional matchmaking or LFG for players who want to fill a squad for one run.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_50%,transparent)] px-5 py-4"
                >
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-1)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* --- Focus: Scaling expeditions + seasonal leaderboards --- */}
            <div className="mt-14">
              <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                FOCUS
              </div>
              <h3 className="ember-display mt-3 text-balance text-2xl text-[color:var(--text-0)] sm:text-3xl">
                Scaling expeditions + seasonal leaderboards
              </h3>
              <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
                Expedition runs are especially powerful in a seasonal game. If they scale infinitely—or by depth/level—they become the ideal vehicle for seasonal leaderboards: players form groups to push the highest level together before the reset. That creates a clear, repeatable, competitive goal that fits the one-month loop.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="ember-panel">
                  <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                    <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                      Why scaling matters
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      No ceiling, no boredom.
                    </div>
                  </div>
                  <div className="relative px-5 py-5">
                    <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                      <li>
                        <span className="font-semibold text-[color:var(--text-0)]">Infinite or deep scaling</span>: each run can go deeper or harder. There is always a "farther" to push—so the activity does not cap out.
                      </li>
                      <li>
                        <span className="font-semibold text-[color:var(--text-0)]">Same format, higher stakes</span>: the loop (go in, push, get out) stays the same; only difficulty and rewards scale. Easy to understand, hard to master.
                      </li>
                      <li>
                        <span className="font-semibold text-[color:var(--text-0)]">Natural fit for seasons</span>: a reset gives everyone a fresh race. Last month's leaderboard is history; this month is a new climb.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="ember-panel">
                  <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                    <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                      Seasonal leaderboards
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      Rank by how far you pushed together.
                    </div>
                  </div>
                  <div className="relative px-5 py-5">
                    <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                      <li>
                        Leaderboards rank groups (or guilds, or solo) by deepest level reached, highest floor cleared, or equivalent—one clear metric per season.
                      </li>
                      <li>
                        Players form squads specifically to chase the board: "we're going for top 10 this month." The goal is explicit and shared.
                      </li>
                      <li>
                        Rewards and bragging rights attach to placement. When the season resets, the race starts again—so the content stays relevant and competitive.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="ember-panel">
                  <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                    <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                      The loop
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-2)]">
                      Push, rank, reset, repeat.
                    </div>
                  </div>
                  <div className="relative px-5 py-5">
                    <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                      <li>
                        <span className="font-semibold text-[color:var(--text-0)]">Within the month</span>: groups run expeditions, push for a higher level, and climb the leaderboard. Meta progression (from the seasonal loop) can reward how far you got.
                      </li>
                      <li>
                        <span className="font-semibold text-[color:var(--text-0)]">Reset</span>: the board and run state reset. Last month's depth is legacy; this month is a new race.
                      </li>
                      <li>
                        <span className="font-semibold text-[color:var(--text-0)]">Repeat</span>: the same format every season keeps the goal readable—"how far did we push?"—while scaling keeps it endlessly chaseable.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-[color:var(--accent-gold)]/25 bg-[color:color-mix(in_oklab,var(--accent-gold)_6%,var(--bg-1))] px-5 py-5">
              <div className="text-xs font-semibold tracking-[0.2em] text-[color:var(--accent-gold)]">
                WHY THIS IS A FOCUS
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-1)]">
                Scaling expeditions give the seasonal game a spine: one activity that is always available, always pushable, and directly tied to leaderboards and the reset. They answer "what do we do this month?" with "push the expedition and see how high we can rank." That clarity is a major differentiator for a one-month wipe game.
              </p>
            </div>
          </div>

          {/* --- Differentiator: Guild halls — the binding glue --- */}
          <div className="mt-14">
            <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
              DIFFERENTIATOR
            </div>
            <h2 className="ember-display mt-3 text-balance text-2xl text-[color:var(--text-0)] sm:text-3xl">
              Guild halls: the binding glue
            </h2>
            <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
              Without a shared home, the world still feels empty. Guild halls tie everything together: a place to meet people and hang out, to compete on guild leaderboards and pursue guild quests, and to contribute to building the guild space. The sandbox becomes a living world.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    Hang out & meet people
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    A social home, not just a menu.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    <li>
                      The guild hall is a place you go—a shared space where members gather between runs, form squads, and see each other.
                    </li>
                    <li>
                      Guilds become the way to find runs and regulars, so the open world is not just a solo grind. New friends, regular runs, and a sense of being in it together.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    Guild leaderboards & quests
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    Shared stakes and bragging rights.
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    <li>
                      Guild leaderboards give the group something to push for—rank, prestige, or seasonal placement. Your progress contributes to "our" standing.
                    </li>
                    <li>
                      Guild quests give members shared reasons to log in and contribute—clear goals, shared rewards, and a sense that the guild is going somewhere.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="ember-panel">
                <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
                  <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                    Build out the guild space
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--text-2)]">
                    Contribute to something that lasts (within the season).
                  </div>
                </div>
                <div className="relative px-5 py-5">
                  <ul className="grid gap-3 text-sm text-[color:var(--text-1)]">
                    <li>
                      Members contribute resources, unlocks, or effort to upgrade and customize the guild hall—trophies, amenities, visuals. It's "ours" because we built it.
                    </li>
                    <li>
                      The space reflects the guild's progress and identity. New month, fresh build—but the act of building together again is part of the loop.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 ember-panel">
            <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
              <div className="ember-display text-sm font-semibold text-[color:var(--text-0)]">
                A breathing world
              </div>
              <div className="mt-1 text-sm text-[color:var(--text-2)]">
                From sandbox to living world.
              </div>
            </div>
            <div className="relative px-5 py-5">
              <p className="text-sm text-[color:var(--text-1)]">
                Guild halls connect solo play and group dominance: you push on your own and converge for bosses and events, with a home base shared by people you are building something with. Leaderboards and quests give a reason to care about the guild; building the space gives a reason to contribute. In combination, that turns a lonely sandbox into a world that feels alive—somewhere you belong, not just survive.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_50%,transparent)] px-5 py-4">
            <div className="text-xs tracking-[0.22em] text-[color:var(--text-2)]">
              NEXT
            </div>
            <p className="mt-2 text-sm text-[color:var(--text-1)]">
              Outline captured here for review. Once locked, fold into the PRD and GDD (seasons, progression, economy, social/co-op content, and guild systems).
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/game"
              className="ember-button-secondary rounded-md px-4 py-3 text-sm font-medium text-[color:var(--text-1)] hover:text-[color:var(--text-0)]"
            >
              ← Back to Game
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
