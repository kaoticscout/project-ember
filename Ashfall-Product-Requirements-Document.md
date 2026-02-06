# Ashfall — Product Requirements Document (PRD)

Project Codename: **Ashfall**  
Product Type: **Multiplayer Survival Action RPG (Embodied Third-Person)**  
Cadence: **One-month reset loop** with **meta progression** that carries across resets; rotating content and challenges per month; optional weekly objectives/events within the month (no RTS “match” framing)

## 1. Vision
Ashfall is a multiplayer survival **action RPG** where you play a **hero**: you level up, gear up, and take on escalating enemies and bosses with **WoW-inspired combat** (quick movement, hotbar abilities, cooldown windows, readable telegraphs, satisfying AoE). Exploration is fast and fluid thanks to **mounted traversal** and quick dismount-to-fight pacing.

Base building exists, but it is **secondary**: a Valheim-like homestead that supports crafting, storage, comfort buffs, and travel convenience—without turning the primary gameplay loop into an RTS/colony economy.

The game is differentiated by a **one-month reset loop** (push as hard and as far as you can each month; the world or progression layer resets on a fixed cadence), **meta progression** that carries over (long-term talent tree, customizable unlocks earned by how far you pushed), **solo progress with group dominance** (co-op moments and ways to show off loot and progress), **guild halls** as the social glue (meet people, guild leaderboards and quests, building the guild space together), and **scaling expeditions + seasonal leaderboards** (infinitely or deeply scaling runs that rank groups by depth reached—push, rank, reset, repeat).

## 2. Product Pillars (Non-Negotiables)
1. **Spotlight Moments**
   - The game must reliably generate **clip-worthy, streamable moments** that players remember for weeks.
   - Moment-to-moment gameplay should be **splashy** (high impact visuals/audio/readability) without becoming unreadable chaos.
2. **Core Player Time Budget (3–4 hours, 3 days/week)**
   - The product must feel “complete” for a core player who can play **~9–12 hours/week**.
   - Hardcore enthusiasts should have **more to do**, but not in a way that **invalidates** or **overrides** core-player progress.
3. **Embodied Hero Adventure**
   - Players are physically present and vulnerable; the default activity is adventuring and combat.
4. **WoW-Inspired Combat + Movement**
   - Quick, responsive traversal; hotbar ability combat with cooldowns, AoE, defensives, interrupts, and curated CC.
5. **Progression & Buildcraft**
   - Leveling, talents/runes, and gear upgrades meaningfully change playstyle and power.
6. **Mounted Exploration**
   - The world is meant to be traveled; mounts make exploration fast and satisfying.
7. **Homestead Building as Survival Support**
   - Valheim-like base building that supports the adventure loop (crafting, comfort, storage, travel) and long-term survival without turning into an RTS/colony economy.
8. **PvE Survival & Biome Mastery (Core)**
   - Survival systems (hunger, stamina, temperature, weather, biome rules) create tension and identity for each region; mastering a biome is a long-term PvE goal.
9. **Solo & Co-op Exploration with Optional Competitive Structure**
   - The core gameplay must feel great **solo and in co-op**. When players choose to group up, the experience shines as cooperative PvE exploration and progression; optional ladders/events can exist as an overlay but are not framed as required “war” or siege play.

## 2B. Core Differentiators (Design Spine)
These elements define Ashfall's position in the market and must be reflected in all major systems.

1. **One-Month Reset Loop + Meta Progression**
   - The world (or the relevant progression layer) resets on a **one-month cycle**. Everyone runs against the same clock; you're racing a known finish line, not grinding into the void. Each month is a fresh run with a defined arc—start, push, peak, reset.
   - **Rotating content and challenges**: biomes, events, bosses, or modifiers shift month over month; objectives and difficulty curves tune per season so the meta stays fresh. A shared "this month" / "this wipe" identity gives players a common story and healthy stakes.
   - **Meta progression** carries across resets: performance in the month (depth reached, bosses downed, milestones hit) converts into meta currency or progress. A **long-term talent tree** (or equivalent) unlocks across many seasons; **customizable unlocks** let players choose what to unlock so builds stay personal. No other major survival RPG combines short predictable resets, rotating content, and meaningful meta progression in one package.

2. **Progress on Your Own. Dominate Together.**
   - The world is not an isolated sandbox. **Co-op moments** (events, bosses, objectives built for groups) give a reason to link up, not just parallel play. **Shared goals**—take down the big thing, hold the line, race the clock as a squad—are optional, not required; group play is the cherry on top, not a gate.
   - **Show off loot and progress**: cosmetics, titles, base flair, seasonal trophies that signal what you achieved. Your loot and rank have an audience so the grind feels meaningful. When you do group content, the win and bragging rights are shared—progress solo, flex together.

3. **Guild Halls: The Binding Glue**
   - Without a shared home, the world feels empty. **Guild halls** tie everything together: a place to meet people and hang out, form squads, and see each other. Guilds become the way to find runs and regulars.
   - **Guild leaderboards and quests** give the group something to push for (rank, prestige, seasonal placement) and shared reasons to log in and contribute. **Building the guild space** (members contribute resources/effort to upgrade and customize the hall—trophies, amenities, visuals) makes it "ours"; the space reflects guild progress and identity. New month, fresh build—building together again is part of the loop. The sandbox becomes a living world.

4. **Scaling Expeditions + Seasonal Leaderboards**
   - **Expedition runs** that scale infinitely (or by depth/level) are the ideal vehicle for the one-month loop: no ceiling, same format with higher stakes, natural fit for reset (last month's board is history; this month is a new climb).
   - **Seasonal leaderboards** rank groups (or guilds, or solo) by deepest level reached, highest floor cleared, or equivalent—one clear metric per season. Players form squads to chase the board; rewards and bragging rights attach to placement. **Loop**: within the month, groups run expeditions and climb the board; meta progression can reward how far you got; at reset, the board and run state reset; repeat. Scaling expeditions give the seasonal game a spine—one activity always available, always pushable, tied directly to leaderboards and reset. They answer "what do we do this month?" with "push the expedition and see how high we can rank."

## 3. Target Player Experience
- **Session size**: 30–90 minutes “meaningful progress”; 3+ hour marathons optional.
- **Social**: solo or factions (2–6). Temporary alliances allowed; betrayal supported.
- **Streaming-friendly**: fights, raids, and defenses should be understandable to viewers and exciting in short clips.
 - **Time-budget fit**: a core player can meaningfully compete and contribute with ~3 sessions/week.

## 4. Core Gameplay Loops
### 4.1 Moment-to-Moment Loop
Choose objective → travel (mount) → fight → loot + XP → upgrade build/gear → craft/rest at home (optional) → repeat.

### 4.2 One-Month Macro Loop (Primary Cadence)
The primary cadence is a **one-month reset**: push as hard and as far as you can each month; the world (or the relevant progression layer) resets on a fixed cycle. Within the month:
- **Early**: scout, establish home/guild presence, clear early content, form squads.
- **Mid**: contested and elite content ramps; expedition pushes and leaderboard climbing; guild quests and convergence events.
- **Late**: high-threat windows, finale events, last push for expedition depth and leaderboard placement.
- **Reset**: board and run state reset; meta progression (talent tree, unlocks) carries over; new month, new race.

Scaling **expedition runs** (go in, push depth/level, get out) are the spine: always available, always pushable, directly tied to seasonal leaderboards and the reset.

### 4.3 Optional Weekly Sub-Cadence
If the game uses a weekly cadence within the month, it should be framed as **refreshing adventure incentives** (events, objectives), not a second wipe:
- early week: new objectives + accessible events
- mid week: contested elite content ramps
- late week: finale event + rewards/leaderboards

## 5. Requirements — Spotlight Moments (New Core Pillar)
The game should systematically produce “Rust highlight” moments across PvP, PvE, base play, and traversal.

### 5.1 Moment Design Requirements
- **High stakes**: valuable objectives require exposure (loot runs, relic components, boss camps).
- **High clarity**: viewers must understand what happened (who won, what was at stake, why it mattered).
- **High punch**: impactful audio/visual feedback for kills, defenses, breaches, hero ultimates, and last-second saves.
- **Emergence**: systems should allow unplanned outcomes (third-party fights, betrayals, clutch defenses).
- **Narrative closure**: the week ends with a definitive “war story” resolution.

### 5.2 Clip-Worthy Moment Sources (Must Exist)
- **Loot run escapes**: sprinting home with rare resources while chased.
- **Boss/elite clutch wins**: last-second defensives, interrupt saves, AoE clears.
- **Hero duels**: readable 1v1/2v2 hero fights that look skillful.
- **Contested objective fights**: multiple groups collide at a world event or elite POI.
- **World events**: scheduled “finale” encounters, roaming threats, rare spawns.
- **Betrayal/alliances**: diplomacy decisions that flip outcomes.

### 5.3 Combat & Presentation Requirements (Support “Splashy”)
- Combat must remain **weighty + readable** even at high intensity.
- Abilities should have:
  - distinct silhouettes/telegraphs
  - strong hit feedback
  - “moment peaks” (e.g., ult windows) tuned for highlights
- Important events should generate:
  - clear UI callouts (base under attack, breach detected, boss engaged)
  - strong audio cues (global/local)

## 5B. Requirements — Time Budget & Anti-Grind Dominance
This pillar exists to ensure the game rewards dedication without becoming “whoever played 12 hours/day wins.”

### 5B.1 Core Time Budget Targets
- In **~3–4 hours per session**, a core player should be able to:
  - stabilize a base state appropriate to the current week phase
  - complete at least one meaningful “risk run” (strategic resource/camp objective)
  - participate in at least one meaningful conflict (defense, raid, camp contest, hero duel)
- Missing a day should not permanently doom competitive relevance (week is an arc, not a daily chore checklist).

### 5B.2 Hardcore Motivation (Must Exist)
Hardcore players should have additional goals that are primarily:
- **prestige/leaderboard optimization** (pushing score, consistency, execution)
- **cosmetics/seasonal status** (non-power rewards)
- **variety/mastery** (alternate builds, different hero archetypes, optional objectives)
- **social leadership** (organizing raids/defenses, diplomacy)

### 5B.3 Anti-Grind Dominance Guardrails (Must Exist)
Systems must avoid “time played = unstoppable power.” Examples of acceptable constraints:
- **diminishing returns** on repeatable farming loops (rate limits, escalating costs, contested node depletion)
- **strategic choke points** that require risk/coordination (not solo grind in safety)
- **periodic refresh** (events/objectives) keeps runaway compounding in check
- **power ceilings** where extra hours produce marginal gains (optimization > raw stat inflation)
- **catch-up paths** for core players (clear milestones, event participation value, salvage paths)

### 5B.4 Offline/Asynchronous Considerations
- Offline base productivity should help time-budget players, but cannot create unstoppable offline snowballing.
- Systems should preserve:
  - meaningful defense (architecture + guards)
  - meaningful counterplay (raids require commitment/risk; defenders have tools)

## 6. Systems Requirements (Core)
### 6.1 Player Lifecycle
- Start as a capable **hero** (basic kit online immediately).
- Progress into **specialization** (talents/runes/augments) and gear tiers.
- Reach **endgame mastery** via elite content, buildcraft, and optional competitive layers.
- All core lifecycle stages (early progression → specialization → endgame mastery) must be fully achievable **solo**, with co-op acting as an efficiency/variety multiplier rather than a hard requirement.

### 6.2 Combat & Controls
- Third-person, **WASD movement**
- Ability hotbar
- Dodge/mobility
- Mount summon/dismount (fast)
- Combat inspiration: **WoW-like kit** (cooldowns, AoE, interrupts, defensives) with clarity-first telegraphs

### 6.3 Death & Risk
- Death is punishing, not deleting:
  - drop carried inventory/crafting mats to a recoverable “tombstone” (Valheim-like)
  - respawn timer at home/nearest shrine
  - optional short injury debuff
  - optional corpse run / retrieval tension, but **no extraction-style hard loss of character or long-term progression**

### 6.4 Base Building
- Valheim-like snap + blueprint placement
- Base is **secondary**: crafting stations, storage, comfort buffs, farming, trophies, travel convenience

### 6.5 Convenience Automation (Optional)
- If included, “helpers” should be bounded (crafting queues, simple tasks) and must not become an RTS micro layer.

### 6.6 Economy & Resources
- Resources exist to support crafting/consumables/gear upgrades.
- Valuable materials come from **adventure risk** (bosses, elite POIs, contested events).

### 6.7 NPC Camps
- Escalation gates + PvP hotspots
- Tiered camps: bandits → fortified → bosses → world events, with difficulty bands that support both solo and small-group play

### 6.8 Territory / Optional PvP
- The default product experience is **PvE-focused**:
  - contested objectives are primarily about PvE bosses, events, and rare resources.
  - territory is “soft” (influence and travel routes) rather than hard ownership that must be defended 24/7.
- PvP, if enabled, is:
  - **opt-in** (server rules, flags, or specific zones)
  - scoped to **skirmishes, duels, or temporary objectives**, not permanent base destruction or mandatory sieges.

### 6.9 Optional PvP Feature Requirements
If PvP modes are shipped, they must:
- be **clearly signposted** (players always know if they are in a PvP-enabled context).
- avoid making PvP participation mandatory for core progression or access to biomes.
- focus rewards on **cosmetics, status, or sidegrades**, not irreplaceable progression.
- preserve homesteads primarily as **social and survival hubs**, not siege targets.

### 6.10 Guild Systems
- **Guild halls**: shared social space (not just a menu)—place to meet people, hang out, form squads, find runs. The hall is the binding glue that turns the sandbox into a living world.
- **Guild leaderboards and quests**: shared stakes (rank, prestige, seasonal placement) and reasons to log in and contribute as a group.
- **Building the guild space**: members contribute resources/effort to upgrade and customize the hall (trophies, amenities, visuals); the space reflects guild progress and identity. New month, fresh build—building together again is part of the loop.

### 6.11 Scaling Expeditions & Seasonal Leaderboards
- **Expedition runs**: content that scales infinitely (or by depth/level)—go in, push depth, get out. No ceiling; same format with higher stakes; natural fit for the one-month reset (last month's board is history; this month is a new climb).
- **Seasonal leaderboards**: rank groups (or guilds, or solo) by deepest level reached, highest floor cleared, or equivalent—one clear metric per season. Rewards and bragging rights attach to placement. This is the spine of the seasonal game: one activity always available, always pushable, tied directly to leaderboards and reset.

## 7. Progression & Competitive Structure
### 7.1 Character Progression (Within-Month / Reset-Bound)
Within each one-month cycle, players progress:
- hero levels
- build unlocks (talents/runes/augments for the run)
- gear progression (as designed for the season)

At **reset**, the world or the relevant progression layer resets; character power and run state do not carry over. This creates a defined arc each month—start, push, peak, reset.

### 7.2 Meta-Progression (Persists Across Resets)
**Must persist** across monthly resets:
- **Long-term talent tree** (or equivalent): unlocks earned across many seasons; progression is permanent and visible.
- **Customizable unlocks**: players choose what to unlock (builds stay personal); unlocks are earned by **how far you pushed** (depth reached, bosses downed, milestones hit) in the month.
- cosmetics, blueprint unlocks, starting bonuses, prestige ranks
- commander traits (if applicable)

Performance in the month converts into meta currency or progress so that every run contributes to the long-term account.

### 7.3 Seasons (One-Month Cadence) + Battle-Pass Style Progression
- **Season cadence**: **one month** (primary reset loop). Everyone runs against the same clock; each month is a fresh run with a defined arc.
- **Season structure**:
  - rotating content and challenges (biomes, events, bosses, or modifiers can shift month over month)
  - optional weekly refreshes inside the month (objectives, events)
  - season objectives that encourage engagement across the month
  - battle-pass style progression track (free + premium lanes optional; never pay-to-win)

#### 7.3.0 Season Rewards (Examples / Target Catalog)
Season rewards should be primarily cosmetic/customization-based, including:
- **Base customization** (themes, materials/skins, props, banners, lighting, decor)
- **Defense customization** (tower skins, trap skins, wall/door cosmetics, VFX on defenses)
- **Character cosmetics** (armor skins, capes/cloaks, helmets, silhouettes that remain readable)
- **Ability/effect customization** (spell VFX, trails, kill effects; tuned to preserve combat clarity)
- **Mount cosmetics** (mount skins, saddles, barding, particle accents)
- **Emotes / titles / badges** (prestige identity)

#### 7.3.1 Season Objectives (Must Exist)
Each season (month) must include:
- **season-long objectives** (goals across the month) that provide long-tail engagement and tie into meta progression
- **optional weekly objectives** that refresh each week (encourage “come back for new objectives” without requiring daily login)
- objectives should push players into:
  - contested zones / strategic resources
  - PvE camp progression and **expedition depth** (scaling runs, leaderboard climb)
  - guild quests and convergence events
  - faction conflict/defense participation (when playing with others)
  - finale / event-arc participation

Design constraints:
- objectives must be completable on the core time budget (3–4 hours, 3 days/week)
- wherever possible, objectives should have **solo-achievable variants** and **small-squad variants** (same fantasy, scaled demands)
- objectives should promote spotlight moments, not chores (quality > quantity)
- avoid “must log in daily” pressure; monthly cadence is primary, weekly is optional refresh

#### 7.3.2 Battle Pass Progress Sources (Preferred)
Battle-pass XP should come from:
- participating in month arc milestones (mid-month conflicts, month finale)
- accomplishing “spotlight moment” actions (boss clears, base defense, raid success/repel)
- completing season objectives
- optional bonus for winning/placing, without making pass completion dependent on victory

Battle-pass constraints:
- rewards must be **non-power** (cosmetic/customization/prestige)
- VFX rewards must preserve **readability** (no pay-for-clarity disadvantage)

### 7.4 Seasonal Ranking & Leaderboards
- **Season length**: **one month** (aligned to the primary reset loop). At reset, the board and run state reset; meta progression carries over.
- **Expedition leaderboards** (core): rank groups, guilds, or solo by **deepest level reached** or highest floor cleared—one clear metric per season. Players form squads to chase the board; rewards and bragging rights attach to placement. Scaling expeditions are the spine: push, rank, reset, repeat.
- **Additional ladder sources** (if present) should bias toward **PvE accomplishment**:
  - NPC camp clears, boss kills, world event participation
  - exploration milestones (biomes mastered, POIs discovered)
  - base/homestead and **guild** development milestones
  - optional PvP victories (if enabled), without being the dominant score source
- Rank tiers example: Bronze → Iron → Silver → Gold → Mythic → Legend

## 8. MVP Scope (Prototype)
- 1 biome
- 20–30 player shard
- Tier 1 base building (camp + crafting + comfort)
- hero prototype (6–8 abilities incl. AoE/interrupt/defensive/mobility) + WoW-like movement feel
- mount traversal prototype
- NPC camps/POIs tier 1–2 + 1 boss encounter
- optional event objective prototype (1–2 events)
- (Post-MVP / roadmap: one-month reset loop, meta progression, guild halls, scaling expeditions + seasonal leaderboards)

Goal: validate **combat feel + travel pacing + adventure loop + spotlight moments**. Later phases validate **one-month loop + meta progression + guilds + expedition leaderboards**.

## 9. Key Risks
- snowballing factions
- offline raiding frustration
- complexity barrier
- server cost for multi-day simulation
- burnout from monthly cadence
- “splashy” combat becoming unreadable

## 10. Success Criteria (What We’d Measure)
(Initial targets to refine later.)
- Players can recall and share highlight moments after a week.
- Month finale participation remains high (final stand is a strong draw).
- New players can reach “Hero Ascension” within the first week via clear onboarding.

