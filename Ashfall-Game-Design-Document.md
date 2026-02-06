# Ember — Game Design Document (Comprehensive Draft)

Project Codename: **Ember**  
Genre: **Multiplayer Survival Action RPG (Embodied Third-Person)**

## 1. High Concept
Ember is a multiplayer survival **action RPG** set in a **vast, mysterious continent**. You play a **hero character** who **levels up**, unlocks a **splashy ability kit**, gears up, and takes on escalating enemies and bosses while pushing ever deeper into unknown biomes. Moment-to-moment play is fast and responsive (WoW-like movement/combat), with **mounted exploration** and **expedition tools** for long-range traversal and roaming between far-flung points of interest.

Base building exists, but it is **secondary**: a personal/faction homestead that supports crafting, storage, comfort buffs, and travel convenience—without turning the core loop into colony/RTS management.

**Core differentiators**: a **one-month reset loop** (push as far as you can each month; the world or progression layer resets on a fixed cycle); **meta progression** that carries over (long-term talent tree, customizable unlocks earned by how far you pushed); **progress on your own, dominate together** (co-op moments and ways to show off loot and progress); **guild halls** as the social glue (meet people, guild leaderboards and quests, building the guild space together); and **scaling expeditions + seasonal leaderboards** (runs that scale by depth, ranked by how far you got—push, rank, reset, repeat).

## 2. Design Goals (What Must Be True)
- **Spotlight moments**: the game reliably generates clip-worthy, streamable moments players remember for weeks.
- **Time-budget fit**: core players (3–4 hours, ~3 days/week) can meaningfully compete; hardcore play adds depth without invalidating core progress.
- **Embodied tension**: leaving safety is risky; returning home is relief and preparation.
- **Hero-first play**: the default activity is **adventuring and fighting**, not managing production chains.
- **Fast traversal**: movement feels quick and fluid; mounts make the world feel large without feeling slow.
- **Predictable escalation, unpredictable outcomes**: the month’s arc is known; player stories aren’t.
- **One-month reset + meta progression**: content and the run reset on a one-month cycle; meta progression (talent tree, unlocks) carries over and is earned by how far you pushed; no RTS “war sim.”

## 3. Core Pillars
1. **Spotlight Moments**: clip-worthy, streamable moments with splashy minute-to-minute gameplay.
2. **Core Player Time Budget**: designed around ~3–4 hour sessions, ~3 days/week; hardcore motivation exists without grind dominance.
3. **Embodied Hero Adventure**: WASD, third-person; you are the hero and the action happens in the world.
4. **Vast, Mysterious World (Core Differentiator)**: the continent should feel huge, layered, and a little scary; the first dozens of hours are driven by “what’s over that horizon?” as much as “what can I craft next?”.
5. **WoW-Inspired Combat Kit**: hotbar abilities, cooldown windows, readable telegraphs, satisfying AoE, and skill-expressive play.
6. **Mounted Exploration & Expedition Tools**: fast traversal, limited fast travel, and support vehicles that make long-range expeditions (solo or co-op) feel like real journeys, not teleports between nodes.
7. **Progression & Buildcraft**: leveling, talents/runes, gear upgrades, and crafting that meaningfully change playstyle.
8. **Homestead Building (Core Survival Support)**: Valheim-like building focused on crafting, comfort, storage, and travel that directly supports long-term survival and exploration.
9. **PvE Survival & Biome Mastery (Core)**: hunger, temperature, weather, and biome-specific threats that make each region a meaningful survival and progression challenge.
10. **Solo & Co-op Exploration & World Events (Core)**: large, dangerous open-world regions with bosses, dungeons, and dynamic events that are fully playable solo and scale naturally for small-group PvE play; optional PvP is supported but not required.
11. **One-Month Reset Loop + Meta Progression (Core Differentiator)**: the world (or progression layer) resets on a one-month cycle; rotating content and challenges each month; meta progression (long-term talent tree, customizable unlocks) carries across resets and is earned by how far you pushed.
12. **Progress on Your Own. Dominate Together.**: co-op moments (events, bosses, group objectives) and ways to show off loot and progress (cosmetics, titles, trophies); group play optional; progress solo, flex together.
13. **Guild Halls (Binding Glue)**: shared social space to meet people, form squads, find runs; guild leaderboards and quests; members build/upgrade the guild space (trophies, amenities); the sandbox becomes a living world.
14. **Scaling Expeditions + Seasonal Leaderboards (Spine)**: expedition runs that scale by depth/level; seasonal leaderboards rank by deepest level reached; push, rank, reset, repeat—one always-available, always-pushable activity tied to leaderboards and reset.

## 4. Target Experience
- **Session length**: 30–90 min “meaningful progress”; 3+ hour optional marathons.
- **Exploration feel**: the world should feel large and a bit intimidating—early play is about charting coastlines, discovering landmarks, and slowly pushing your visible map edge outward.
- **Drop-in/drop-out**: your base continues functioning while offline, but is not invulnerable.
- **Social shape**: solo or small factions (2–6); temporary alliances; betrayal supported.
- **Core cadence**: a core player should feel competitive with ~3 sessions/week (~3–4 hours each); hardcore play should primarily increase options/optimization, not invalidate others.

## 5. Game Structure
### 5.1 World Shards
- **40–80 players** per shard (MVP: 20–30).
- **Factions**: 1–6 players.
- **Cadence**: **one-month reset** (primary); rotating content and challenges per month; optional weekly objectives/events within the month (refreshing incentives, not mandatory “wipe” gameplay).

### 5.1.1 World Scale & Traversal (Exploration-First)
- The overland world should feel **meaningfully large** even after many hours:
  - sparse, high-impact fast-travel options (waystones, ships, etc.), earned through play rather than given up front.
  - traversal progression: on foot → basic mount → advanced mounts/support vehicles (field workshops, caravans, signal towers).
- Mapping and navigation are **activities**, not just UI:
  - fog-of-war on the world map; players reveal terrain, POIs, and routes by physically exploring.
  - optional “survey” mechanics (e.g., climbing towers, building watchposts, or crafting maps) that extend visibility and add long-range goals.
- Landmarks and vistas:
  - every biome should have strong silhouettes visible from afar (mountain spires, world trees, storm walls, ruins) that tease destinations hours away.
  - some content (late biomes, deep dungeons) should be reachable only after crossing multiple regions, preserving a sense of distance.

### 5.2 The One-Month Arc (Primary Macro Loop)
The primary cadence is a **one-month reset**: push as hard and as far as you can each month; the world (or the relevant progression layer) resets on a fixed cycle. Within the month:
- **Early**: scout, establish home/guild presence, clear early content, form squads.
- **Mid**: contested and elite content ramps; expedition pushes and leaderboard climbing; guild quests and convergence events.
- **Late**: high-threat windows, finale events, last push for expedition depth and leaderboard placement.
- **Reset**: board and run state reset; meta progression (talent tree, unlocks) carries over; new month, new race.

**Scaling expedition runs** (go in, push depth/level, get out) are the spine: always available, always pushable, directly tied to seasonal leaderboards and the reset.

### 5.3 The Month Arc (Phases)
The arc spans the **month** to align with the reset window. It should feel like an **adventure chapter**, not an RTS war:
- **Early month (Week 1–2): Scouting & First Clears** — explore, unlock travel routes, clear early POIs/bosses, establish home/guild presence
- **Mid month (Week 3): Escalation & Rivalry** — contested POIs, stronger elites, faction skirmishes, dungeon-style objectives, expedition pushes
- **Late month (Week 4): High Threat & Finale** — dangerous roaming events, elite boss chains, risk runs; culminating world event / boss convergence with scoring/rewards and leaderboard lock

### 5.4 World Escalation Modifiers (Examples)
- **Mid month**: “Blood Moon” — monsters attack bases.
- **Late month**: “Resource decay” — scarcity pressure.
- **Late month**: “Storm zone shrink” — map pressure/forced conflict.
- **Month finale**: “Apocalypse” — hard convergence + scoring push.

## 6. Core Gameplay Loop (Moment-to-Moment)
1. Choose an objective (quest, POI, dungeon-like run, boss)
2. Travel fast (mounted exploration, quick pathing, instant dismount to engage)
3. Fight (WoW-like hotbar combat: cooldowns, AoE, interrupts, defensives)
4. Loot + XP (gear, crafting materials, currency)
5. Upgrade (levels, talents/runes, gear, consumables)
6. Return home when useful (craft, rest/comfort buffs, storage, travel setup)
7. Repeat with harder biomes/encounters and higher stakes

## 7. Player Lifecycle
### 7.1 Phase 1 — Adventurer
- start as a capable hero (basic kit online immediately)
- learn the world, clear early POIs, get your first gear upgrades
- establish a simple home base for crafting/storage (optional but recommended)

### 7.2 Phase 2 — Specialization
- unlock build-defining mechanics (talents/runes/ability augments)
- acquire movement options and class identity (mobility, AoE kit, defensives)
- begin targeting elite objectives (bosses, contested events, dungeon-style runs)

### 7.3 Phase 3 — Endgame Mastery
- optimized buildcraft + gear chasing
- high-skill combat against elite threats
- optional competitive layers (PvP hotspots, ladders, timed events)

## 8. Controls, Camera, and Combat
### 8.1 Controls
- **WASD movement**
- **Third-person camera** with mouse look/aim
- **Ability hotbar**
- **Dodge/mobility**
- Optional **soft lock / tab target assist**
- **Mount summon/dismount** (fast, combat-aware)

### 8.2 Combat Goals
Combat must feel:
- **responsive and quick**
- **readable**
- **skill-expressive**
- **splashy without visual noise**

### 8.3 Combat Model (High-Level)
Target: **WoW-like ability combat** in a third-person controller.
- core hotbar abilities on cooldowns (with clear roles: ST, AoE, defensive, mobility, utility)
- readable enemy telegraphs (cones, circles, ground effects)
- interrupts/CC exist but are curated (no “MMO bloat”)
- strong hit feedback and VFX silhouettes (clarity-first)

Example kit shape (illustrative):
- Q: dash slash
- E: shield stance
- R: area stun
- Passive: rally nearby allied units

## 9. Death & Risk
### 9.1 Death Outcomes (Default)
Default target is closer to **Valheim risk** than loot-shooter deletion:
- drop carried inventory/crafting mats into a recoverable “tombstone”
- respawn at home/nearest shrine after a timer
- optional temporary injury debuff (short-lived)

Design intent: **Death is punishing, not deleting.** Your character build/gear progression should not be routinely destroyed.

### 9.2 Optional Late-Game “Hero Core” Stakes
In special events:
- hero enters wounded state on death
- recover fallen core within time to avoid severe penalty
Creates legendary moments without permanent identity deletion.

## 10. Base Building
### 10.1 Building Style
Inspired by Valheim/Rust:
- snap placement
- blueprint ghost previews
- physical placement in space
- crafting stations and storage
- comfort/home buffs (rested-style bonuses)
- optional travel convenience (waystones/portals if supported)

### 10.2 Base Tiers
These tiers should represent **adventure support**, not strategic dominance:
- **Tier 1 — Camp**: basic crafting + storage + bed/rest bonus
- **Tier 2 — Homestead**: advanced stations, farming, stronger comfort buffs, travel setup
- **Tier 3 — Hall**: prestige base, trophy displays, high-end crafting, convenience upgrades

## 11. Companions & Convenience Automation (Optional)
If Ember includes “helpers,” they should support the hero loop without turning the game into RTS management:
- optional gather/craft conveniences (e.g., station queues, simple follower tasks)
- no army micro as a primary skill test
- anything automated should be **bounded** so adventuring remains the best use of player time

## 12. PvE Content (What You Fight)
Ember’s content should be structured around clear adventure targets:
- roaming enemy populations by biome
- POIs/camps (repeatable, tiered difficulty)
- elite/boss encounters (build checks and mechanic checks)
- dynamic world events (time windows that create social convergence)

## 13. Loot, Crafting, and Economy (Adventure-First)
- resources exist to support crafting/consumables/gear upgrades, not to feed a production RTS
- valuable materials come from **adventure risk** (bosses, elite POIs, contested events)
- travel and returning home still matter (getting back to safety with loot is a story engine), but the loop should stay hero-forward and primarily PvE-focused

## 14. Survival Systems (Foundational Pressure)
From the original PRD draft:
- hunger / stamina / temperature
- weather hazards
- biome-specific survival rules

Design intent:
- Survival pressure should **increase vulnerability** (especially in PvP), not become busywork.

## 15. NPC Camps & PvE Escalation
### 15.1 Purpose
NPC camps are escalation gates that act as:
- PvE challenge
- PvP hotspots
- strategic resource choke points

### 15.2 Camp Tiers (Example)
1. **Bandit camps** (scrap, basic components)
2. **Fortified outposts** (traps, stronger raiders)
3. **Boss strongholds** (relic cores, hero milestones)
4. **World event zones** (endgame components, score drivers)

### 15.3 PvE Escalation Over the Month
- Camps become more aggressive/dangerous as the month progresses.
- Some escalations should specifically pressure bases (e.g., “Blood Moon”).

## 16. Solo & Co-op Play, Optional PvP, and Social Conflict
Ember is first and foremost a **PvE survival action RPG** that must feel great **solo and in co-op**. **Progress on your own. Dominate together.**: the world is not an isolated sandbox—co-op moments (events, bosses, group objectives) give a reason to link up; show off loot and progress (cosmetics, titles, trophies) so the grind has an audience; group play is optional, but when you do group content, the win and bragging rights are shared. When players choose to group up, the primary social experience is:
- teaming up to explore dangerous biomes
- tackling dungeons, bosses, and world events together
- sharing homesteads or small settlements (and **guild halls**) as social hubs

Solo players should be able to:
- clear appropriately tiered biomes, POIs, and bosses
- progress their homestead, gear, and buildcraft at a satisfying pace
- participate in events with solo-friendly difficulty bands or roles

PvP exists as an **optional layer** that:
- is **never required** for core progression
- is **opt-in** via server rules, modes, or explicit flags
- focuses on **small-scale skirmishes and duels**, not mandatory base sieges

### 16.1 Solo & Co-op Focus
- Core content (biomes, dungeons, bosses, world events) is tuned for **solo → small group play**, with clear difficulty bands.
- Homesteads can be played as a **personal base** or shared by friends/factions (2–6 players) as a co-op base of operations.
- Group roles (tank/control, sustain, burst, support, etc.) emerge naturally from the class/build system, but every archetype should have at least one solo-viable build.

### 16.2 Optional PvP Modes (Examples)
If PvP is enabled on a server or shard, it should be clearly signposted and rules-based, for example:
- **Dueling**: consensual 1v1/2v2 challenges near settlements or arenas.
- **Opt-in PvP Zones**: specific regions or events where PvP is enabled and rewards skew more toward cosmetics/status than raw power.
- **Faction Skirmishes**: limited-scale conflicts over temporary objectives (e.g., a roaming world boss spawn or relic site), without permanent base destruction.

Design intent:
- PvP is there for players who want extra tension and rivalry.
- PvE survival, exploration, and progression must remain fully satisfying for players who **never** engage in PvP.

### 16.3 Guild Halls (Binding Glue)
Without a shared home, the world feels empty. **Guild halls** tie everything together:
- **Hang out and meet people**: a place to form squads, find runs, and see each other; guilds become the way to find regulars.
- **Guild leaderboards and quests**: shared stakes (rank, prestige, seasonal placement) and reasons to log in and contribute as a group.
- **Build the guild space**: members contribute resources/effort to upgrade and customize the hall (trophies, amenities, visuals); the space reflects guild progress and identity. New month, fresh build—building together again is part of the loop.
The sandbox becomes a living world.

## 17. Progression Layers
### 17.1 One-Month Reset + Optional Weekly Refresh
The primary cadence is a **one-month reset**: the world (or the relevant progression layer) resets each month; run state and character power for the season do not carry over. Optional weekly refresh within the month: objectives/events rotate, leaderboards roll over, world states may shift—without a second wipe of your hero.

### 17.2 Meta Progression (Persists Across Resets)
**Must persist** across monthly resets:
- **Long-term talent tree** (or equivalent): unlocks earned across many seasons; progression is permanent and visible.
- **Customizable unlocks**: players choose what to unlock; unlocks are earned by **how far you pushed** (depth reached, bosses downed, milestones hit) in the month.
- cosmetics, blueprint unlocks, strategic starting bonuses, prestige ranks / seasonal identity
- commander traits (if applicable)

Examples of seasonal cosmetic reward categories:
- base customization (themes, props, banners)
- defense customization (tower/trap skins, wall/door cosmetics)
- character armor/effect customization (armor skins, ability VFX; readability-safe)
- mount skins (and related tack cosmetics)
- titles/emotes/badges (prestige identity)

### 17.3 Season Objectives + Battle-Pass Style Progress
Seasons run **one month** (primary reset loop). Each month is a fresh run with a defined arc; rotating content and challenges keep the meta fresh.

Requirements:
- optional weekly objectives (push participation without daily-chore or second-wipe pressure)
- season-long objectives that give long-tail goals across the month and tie into meta progression
- battle-pass style progression track (free + premium lanes optional; never pay-to-win)

Design intent:
- objectives should bias players toward **spotlight moments** (raids, defenses, boss camps, **expedition depth**, month finale)
- objectives must fit the core cadence (3–4 hours, ~3 days/week)
- avoid daily-chore pressure; monthly cadence is primary, weekly is optional refresh

Meta progression principles (from PRD):
- reward skill and varied playstyles; meta earned by how far you pushed
- avoid pay-to-win
- keep competitive skill expression meaningful each month

## 18. Seasonal Structure & Competitive Ranking
### 18.1 Season Format (One-Month)
Each season is **one month**. At season end: ranks lock, rewards distribute, board and run state reset; meta progression carries over; new month, new race.

Each season contains:
- **one-month cadence** (optional weekly refreshes within the month)
- **cumulative ranking system** with leaderboard visibility
- cosmetic + prestige rewards

### 18.2 Expedition Leaderboards (Spine)
**Scaling expeditions** (runs that scale by depth/level) are the spine of the seasonal game. **Seasonal leaderboards** rank groups, guilds, or solo by **deepest level reached** or highest floor cleared—one clear metric per season. Loop: push within the month, rank, reset, repeat. Rewards and bragging rights attach to placement. This answers "what do we do this month?" with "push the expedition and see how high we can rank."

### 18.3 Additional Scoring Categories (If Present)
Other point sources can include:
- NPC camp clears, boss kills, world event participation
- exploration milestones, base/homestead and **guild** development milestones
- optional PvP victories (if enabled), without being the dominant score source

### 18.4 Rank Tiers (Example)
Bronze → Iron → Silver → Gold → Mythic → Legend

Design intent: ranks represent **strategic mastery** and expedition depth, not only kill count.

## 19. Social Structure & Diplomacy
- factions capped at small sizes (1–6); **guild halls** provide the shared social home (see 16.3)
- temporary alliances allowed
- betrayal is supported as part of the drama
- in-game diplomacy tools (lightweight, readable; details TBD)

## 20. UX / UI (Experience Requirements)
### 20.1 Key Modes
- **Exploration/combat**: default third-person, WASD
- **Build mode**: snap/ghost placement, rotate, place
- **Command mode**: in-world tactical overlay (no top-down camera)

### 20.2 Clarity Requirements (Because Complexity Risk Is High)
- Complex systems should unlock gradually via onboarding and level-appropriate pacing
- UI must make “what to do next” obvious (especially early month)
- clear warnings for: raid risk, contested zones, escalation events, base under attack

## 21. Monetization (Optional Direction)
From PRD direction:
- cosmetic skins
- commander cosmetics
- seasonal passes
- **no direct competitive advantages sold**

## 22. MVP Scope (Prototype Validation)
Prototype scope from conversation:
- 1 biome
- 20–30 player shard
- Tier 1 base building (camp + crafting stations + comfort buff)
- hero prototype (WoW-like movement + 6–8 abilities including AoE/interrupt/defensive/mobility)
- mount prototype (summon/dismount, travel feel)
- POIs/camps tier 1–2 + 1 boss encounter
- optional event cadence prototype (1–2 scheduled events)

Prototype goal: **validate combat feel + travel pacing + adventure loop** (fight → loot → upgrade → repeat). Post-MVP / roadmap: one-month reset loop, meta progression (talent tree, unlocks), guild halls, scaling expeditions + seasonal leaderboards.

## 23. Key Risks & Mitigation Targets
Risks called out in the draft:
- snowball factions
- offline raiding frustration
- system overload / complexity creep
- complexity intimidation barrier
- server cost / persistence simulation cost
- burnout from monthly or weekly cadence

Mitigation themes:
- careful pacing + onboarding
- event pacing / escalation calendar
- rubber-banding (non-feels-bad)
- strong UI clarity

## 24. Technical / Production Notes (High-Level)
These are implied requirements based on the design:
- shard-based server model supporting multi-day persistence
- server-authoritative combat (PvP tension + loot risk)
- base simulation running while players are offline
- visibility/notification systems for attacks/escalations

## 25. Content Roadmap Hooks (Next Design Docs)
The conversation explicitly flagged these as follow-ups:
- hero class roster + ability trees
- (optional) event calendar (weekly cadence)
- loot/crafting economy model (spreadsheet)
- combat system spec (WoW-like kit rules, targeting, GCD/cooldowns, telegraphs)
- UI wireframes (combat HUD, class/talent UI, map/POI UI)
- networking/server architecture outline
- tutorial flow + onboarding
- example 1-week narrative “war story”
