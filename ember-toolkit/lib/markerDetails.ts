/**
 * Rich detail for map markers (events, world bosses, strongholds).
 * Keyed by marker id; used by the zone map side panel when a marker is selected.
 */

export type RewardRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export type RewardItem = {
  name: string;
  rarity?: RewardRarity;
  /** Optional icon URL for Wowhead-style display. */
  icon?: string;
};

export type MarkerDetail = {
  /** Full description for the side panel. */
  description: string;
  /** Notable rewards (drops, currency, crafting mats). Can be strings or items with rarity. */
  rewards?: (string | RewardItem)[];
  /** Gameplay mechanics (phases, telegraphs, objectives). */
  mechanics?: string[];
  /** Survival / RPG tips for players. */
  tips?: string[];
  /** Difficulty tier for quick scan. */
  difficulty?: "Low" | "Medium" | "High" | "Extreme";
  /** Optional lore or flavor. */
  lore?: string;
  /** For events: typical duration (e.g. "12 min", "15–20 min"). */
  duration?: string;
  /** For bosses: "World boss" vs "Stronghold boss" etc. */
  category?: string;
};

export const markerDetails: Record<string, MarkerDetail> = {
  // —— Emberwastes ——
  "poi-ember-cinder-bastion": {
    description:
      "A fortress POI with layered walls, ballista nests, and vault room routes. The main stronghold in the Emberwastes; controlling it gives access to high-grade salvage and a defensible fallback.",
    mechanics: [
      "Layered outer and inner walls with chokepoints",
      "Ballista nests overlook approach lanes",
      "Vault rooms require coordination to clear",
    ],
    rewards: ["Heavy salvage", "Reinforcement mats", "Gate tech"],
    tips: [
      "Approach from the east during ash squalls for better cover",
      "Bring repair mats—ballista fire wears down gates quickly",
    ],
    difficulty: "High",
    category: "Stronghold",
  },
  "poi-ember-meltworks": {
    description:
      "Industrial ruins packed with dense scrap and elite patrols. Fights are noisy and resets are fast; ideal for squads that want quick engagements and don’t mind third-party attention.",
    mechanics: [
      "Tight corridors and machinery create close-quarters fights",
      "Elite patrols respawn on a short timer",
      "Scrap piles can be harvested under pressure",
    ],
    rewards: ["Scrap metal", "Rare components", "Explosives mats"],
    tips: [
      "Clear one wing at a time to avoid pulling multiple elites",
      "Use the central furnace room as a fallback—single entrance.",
    ],
    difficulty: "Medium",
    category: "Stronghold",
  },
  "poi-ember-ashgate-pass": {
    description:
      "The main chokepoint and caravan lane through the wastes. Ambush-friendly terrain and high traffic make it the go-to for escort events and intercepts.",
    mechanics: [
      "Narrow pass with limited flank routes",
      "Caravan events run through here on a schedule",
      "Cliff overlooks allow ranged control",
    ],
    rewards: ["Convoy loot", "Repair mats", "Rare components (attackers)"],
    tips: [
      "Scout the pass before committing to an escort",
      "Exit via the northern cliffs if you need to disengage.",
    ],
    difficulty: "Medium",
    category: "Chokepoint",
  },
  "event-ember-ash-squall-surge": {
    description:
      "A storm rolls in and visibility drops sharply. For about 12 minutes, bonus cinderstone nodes spawn across the zone. Harvest windows open—but so do ambush windows.",
    mechanics: [
      "Visibility reduced; sound and tracks matter more",
      "Bonus cinderstone nodes spawn in clusters",
      "Storm clears on a fixed timer",
    ],
    rewards: ["Cinderstone ore", "Cinderheart cores (elite spawns)", "Phoenix resin (rare)"],
    tips: [
      "Ride the perimeter during the surge to avoid central fights",
      "Extract before the storm clears—sightlines return and campers get advantage",
    ],
    difficulty: "Medium",
    duration: "~12 min",
  },
  "event-ember-salvage-convoy": {
    description:
      "Escort or ambush event: a convoy moves along a set route. Defenders earn repair mats; attackers can score rare components. Highly contested and timing-dependent.",
    mechanics: [
      "Convoy follows a fixed path; spawn points are predictable",
      "Defenders escort; attackers intercept at chokepoints",
      "Convoy has a health bar and can be delayed or destroyed",
    ],
    rewards: ["Repair mats (defenders)", "Rare components (attackers)", "Salvage crates"],
    tips: [
      "Pick one role—escort or ambush—and commit",
      "Ashgate Pass is the prime intercept zone.",
    ],
    difficulty: "High",
    duration: "~10–15 min",
  },
  "event-ember-breach-drill": {
    description:
      "Timed objective: complete the drill to earn a powerful crafting catalyst. Weekly lockout; coordinate with your squad to secure the objective before others.",
    mechanics: [
      "Fixed objective location; channel to complete",
      "Enemies and players can interrupt the channel",
      "Success grants a weekly catalyst reward",
    ],
    rewards: ["Crafting catalyst (weekly)", "Cinderheart cores", "Gate tech"],
    tips: [
      "Run during Ash Squall for slightly less visibility pressure",
      "One dedicated defender on the channel often wins the fight.",
    ],
    difficulty: "High",
    duration: "~8–12 min",
  },
  "boss-ember-furnace-wyrm": {
    description:
      "World boss of the Emberwastes. Telegraphed flame lanes and collapsing cover define the fight. Drops Cinderheart cores and high-tier salvage. Expect other squads when the Wyrm is active.",
    mechanics: [
      "Flame lanes sweep the arena; move between safe zones",
      "Cover spots collapse over time—reposition constantly",
      "Add phases draw aggro; tanks need to hold the boss",
    ],
    rewards: ["Cinderheart cores", "Phoenix resin", "High-tier salvage", "Prestige cosmetics"],
    tips: [
      "Stay mobile; never plant in one spot for long",
      "Third-party squads often show up—save cooldowns for the last 10%.",
    ],
    difficulty: "Extreme",
    category: "World boss",
    lore: "Something old stirs under the ash. The Wyrm has burned a hundred expeditions; today it might burn one more.",
  },
  "boss-ember-castellan": {
    description:
      "Stronghold boss of Cinder Bastion. Shield phases and gate mechanics reward coordinated pushes. Drops gate tech and base banners.",
    mechanics: [
      "Shield phases require focused damage to break",
      "Adds spawn from gate positions—control the doors",
      "Phase transitions change the arena layout",
    ],
    rewards: ["Gate tech", "Base banners", "Reinforcement blueprints"],
    tips: [
      "Assign one player to interrupt adds during shield phase",
      "Clear the ballista nests before pulling if you want a clean run.",
    ],
    difficulty: "High",
    category: "Stronghold boss",
  },

  // —— Ironwood ——
  "poi-iron-rootgate": {
    description:
      "Ancient fort built into the trees; vertical fights and multiple levels. Ideal for ambush squads that know the shortcuts and can control high ground.",
    mechanics: [
      "Vertical layout: bridges, platforms, and root climbs",
      "Ambush points at every tier",
      "Limited sightlines favor stealth and traps",
    ],
    rewards: ["Ironwood heartwood", "Defensive blueprints", "Groveheart seeds (boss)"],
    tips: [
      "Use creekbed approach to avoid road patrols",
      "Ridge shortcut from the east saves time.",
    ],
    difficulty: "High",
    category: "Stronghold",
  },
  "poi-iron-hollow-market": {
    description:
      "Neutral-ish trading hub with stalls and guard threats. High player density; good for banking, intel, and picking up escort contracts. Not a place for a quiet fight.",
    mechanics: [
      "Neutral guards attack aggressors",
      "Trading stalls offer limited buffs and repairs",
      "Dense foot traffic—fights draw attention fast",
    ],
    rewards: ["Trades", "Intel", "Escort contracts", "Repair access"],
    tips: [
      "Don’t start fights inside the market—guards will turn on you",
      "Use it as a waypoint, not a base.",
    ],
    difficulty: "Low",
    category: "POI",
  },
  "poi-iron-old-road": {
    description:
      "Long lane through the canopy; the main route for escorts and intercepts. Predictable path and chokepoints make it the go-to for convoy events and ambushes.",
    mechanics: [
      "Linear lane with few alternate routes",
      "Escort events run on a schedule",
      "Canopy bridges and creek crossings create natural holds",
    ],
    rewards: ["Convoy loot", "Stag-king antler (if Hunt crosses)", "Whisper-bark"],
    tips: [
      "Hold chokepoints during Timberfall for maximum value",
      "Canopy bridges are escape routes—and kill zones.",
    ],
    difficulty: "Medium",
    category: "Lane",
  },
  "event-iron-stag-king": {
    description:
      "Trackable roaming elite. The Stag-King moves along a patrol route; finding and defeating it rewards antlers and stealth mats. Popular for solo and small-group play.",
    mechanics: [
      "Roaming patrol; position is trackable via clues",
      "High damage, telegraphed charges",
      "Flees at low health if not rooted",
    ],
    rewards: ["Stag-king antler", "Stealth mats", "Whisper-bark (rare)"],
    tips: [
      "Track from a distance—don’t spook it early",
      "Save a root or stun for the execute phase.",
    ],
    difficulty: "Medium",
    duration: "Variable",
  },
  "event-iron-timberfall": {
    description:
      "Mass harvesting window: node density spikes across the zone. Noise from harvesting draws squads; high reward, high risk. Plan your route and extract before the crowd converges.",
    mechanics: [
      "Harvest nodes spawn in clusters for a set duration",
      "Harvesting creates sound cues that others can track",
      "Best routes are along creekbeds and ridge shortcuts",
    ],
    rewards: ["Ironwood heartwood", "Verdant fiber", "Shadowleaf herbs", "Sapstone"],
    tips: [
      "Don’t overfarm—noise escalates and third parties show up",
      "One ritual fight is enough; leave with full bags.",
    ],
    difficulty: "Medium",
    duration: "~15–20 min",
  },
  "event-iron-wardstone": {
    description:
      "Hold circles to claim a temporary zone buff. Options include vision, stamina, or stealth. Contested—other squads will push to break your hold.",
    mechanics: [
      "Multiple circles; hold to channel and claim",
      "Buff type is chosen at the start of the event",
      "Enemy players can interrupt and flip the circle",
    ],
    rewards: ["Zone buff (vision / stamina / stealth)", "Groveheart seeds", "Ward mats"],
    tips: [
      "Pick one circle and commit; don’t split the squad",
      "Stealth buff is strongest for extraction runs.",
    ],
    difficulty: "High",
    duration: "~10 min",
  },
  "boss-iron-briar-matron": {
    description:
      "World boss of Ironwood. Root snares and summoned adds control the arena. Drops Groveheart seeds and defensive mats. Movement and add control are key.",
    mechanics: [
      "Root snares lock players in place—dodge or cleanse",
      "Add waves spawn from the edges; clear or kite",
      "Phase transitions increase snare density",
    ],
    rewards: ["Groveheart seeds", "Whisper-bark", "Defensive blueprints", "Stag-king antler (rare)"],
    tips: [
      "Bring a cleanse or mobility skill for roots",
      "Designate an add-clear role so the tank can hold the Matron.",
    ],
    difficulty: "Extreme",
    category: "World boss",
    lore: "She has been here longer than the road. The roots remember every trespass.",
  },
  "boss-iron-rootgate-warden": {
    description:
      "Stronghold boss of Rootgate Keep. Patrol callouts and vertical mechanics. Rewards defensive blueprints and gate tech.",
    mechanics: [
      "Patrol phases—boss moves between platforms",
      "Callouts telegraph big hits; reposition or block",
      "Adds spawn from gate doors",
    ],
    rewards: ["Defensive blueprints", "Gate tech", "Groveheart seeds"],
    tips: [
      "Use the vertical layout to los adds",
      "Patrol callouts are your cue to move.",
    ],
    difficulty: "High",
    category: "Stronghold boss",
  },

  // —— Silvershade ——
  "poi-silver-abbey": {
    description:
      "Dungeon-like POI with shrine rooms and puzzle doors. High relic density; prime target for relic runners and ritual events. The Abbot holds the inner sanctum.",
    mechanics: [
      "Shrine rooms contain relics and puzzle mechanics",
      "Puzzle doors require keys or sequences",
      "Abbey Bell Toll event opens bonus rooms",
    ],
    rewards: ["Relic shards", "Relic lens", "Quietstar ink", "Ritual upgrades"],
    tips: [
      "Hit one shrine cluster per run to avoid overstay",
      "Abbey Bell Toll is the best window for full clears.",
    ],
    difficulty: "High",
    category: "Stronghold",
  },
  "poi-silver-bridge": {
    description:
      "Iconic landmark and event lane. Prime defense and ambush fights; avoid when you don’t want PvP. The bridge is the fastest route—and the most watched.",
    mechanics: [
      "Long sightlines; ranged control is strong",
      "Relic Procession and other events cross here",
      "River below offers an alternate (slower) path",
    ],
    rewards: ["Event loot", "Relic shards", "Silver oathband (rare)"],
    tips: [
      "Avoid the bridge when events are active unless you want a fight",
      "Riverbank trails are the safe extract route.",
    ],
    difficulty: "High",
    category: "Landmark",
  },
  "poi-silver-wharf": {
    description:
      "River trade hub; contested when relic events are active. Good for banking and regrouping. Fights here tend to snowball—don’t overcommit.",
    mechanics: [
      "Central extraction and banking point",
      "Relic events often start or end here",
      "Multiple entry points make it hard to hold",
    ],
    rewards: ["Bank access", "Trade goods", "Relic shards (during events)"],
    tips: [
      "Bank during lull windows; don’t linger",
      "Use the wharf as a waypoint, not a hold.",
    ],
    difficulty: "Medium",
    category: "Extraction hub",
  },
  "event-silver-procession": {
    description:
      "Escort event: protect a relic cart as it moves. Defenders earn ward mats; attackers get relic shards. The route often crosses the Silver Bridge—expect a fight.",
    mechanics: [
      "Relic cart follows a set path",
      "Defenders escort; attackers intercept",
      "Cart can be slowed or destroyed",
    ],
    rewards: ["Ward mats (defenders)", "Relic shards (attackers)", "Relic lens (rare)"],
    tips: [
      "Scout the route before committing",
      "Bridge crossing is the highest-risk segment.",
    ],
    difficulty: "High",
    duration: "~12–15 min",
  },
  "event-silver-convergence": {
    description:
      "Ritual event: hold runes to channel. Elite waves spawn; completing the ritual rewards lenses and arcane mats. Highly contested.",
    mechanics: [
      "Multiple rune circles; hold to channel",
      "Elite waves spawn on a timer",
      "Other players can interrupt and flip runes",
    ],
    rewards: ["Relic lens", "Moonreed", "Quietstar ink", "Lumen herbs"],
    tips: [
      "Start with Convergence for lenses, then push Abbey",
      "Don’t hold every rune—one or two is enough for good rewards.",
    ],
    difficulty: "High",
    duration: "~15 min",
  },
  "event-silver-bell-toll": {
    description:
      "Timed dungeon surge: extra rooms open in Gloamspire Abbey for about 15 minutes. Bonus loot and relic density; best run during a lull to avoid PvP.",
    mechanics: [
      "Bonus rooms unlock for a fixed duration",
      "Higher relic and elite density inside",
      "Abbot and other bosses remain in play",
    ],
    rewards: ["Relic shards", "Ritual upgrades", "Abbot loot (if cleared)", "Silver oathband (rare)"],
    tips: [
      "Coordinate with your squad—15 minutes is tight for a full clear",
      "Leave via riverbank when done; bridge will be camped.",
    ],
    difficulty: "High",
    duration: "~15 min",
  },
  "boss-silver-pale-duchess": {
    description:
      "World boss of Silvershade. Charm and fear telegraphs; drops oathbands and arcane mats. Cleanse and positioning are essential.",
    mechanics: [
      "Charm and fear effects—bring cleanse or resist",
      "Telegraphed aoes; move or block",
      "Add phases with priority targets",
    ],
    rewards: ["Silver oathband", "Relic lens", "Quietstar ink", "Prestige cosmetics"],
    tips: [
      "Designate a cleanser for charm/fear",
      "Save burst for the last phase—other squads may push in.",
    ],
    difficulty: "Extreme",
    category: "World boss",
    lore: "She was a queen once. Now she is a monument to what the moon can take.",
  },
  "boss-silver-abbot": {
    description:
      "Stronghold boss of Gloamspire Abbey. Phase switches and ritual mechanics. Rewards ritual upgrades and high-tier arcane mats.",
    mechanics: [
      "Phase switches change attack patterns",
      "Ritual circles appear—stand in or avoid by phase",
      "Adds spawn from shrine doors",
    ],
    rewards: ["Ritual upgrades", "Relic lens", "Quietstar ink", "Abbey blueprints"],
    tips: [
      "Learn the phase order; cooldowns matter on transitions",
      "Clear shrine rooms first for a clean pull.",
    ],
    difficulty: "High",
    category: "Stronghold boss",
  },

  // —— Voidreach ——
  "poi-void-riftworks": {
    description:
      "Industrial void complex with puzzle gates and elite patrols. Best loot in the zone, worst exits. Only push in with a coordinated squad and an extraction plan.",
    mechanics: [
      "Puzzle gates block progress; keys or sequences required",
      "Elite patrols respawn quickly",
      "Multiple levels; vertical and horizontal routes",
    ],
    rewards: ["Voidstone", "Rift key fragments", "Singularity shards (rare)", "High-tier blueprints"],
    tips: [
      "Map your exit before you go deep",
      "One puzzle gate at a time—don’t overpull.",
    ],
    difficulty: "Extreme",
    category: "Stronghold",
  },
  "poi-void-obsidian-spire": {
    description:
      "Vertical stronghold with knockback hazards. High skill expression; positioning and movement win fights. The Spire Architect holds the top.",
    mechanics: [
      "Knockback hazards on every tier",
      "Vertical movement is key",
      "Limited safe spots during boss mechanics",
    ],
    rewards: ["Fracture crystal", "Blueprint shards", "Spire Architect loot"],
    tips: [
      "Save mobility for knockback recovery",
      "Clear the spire in stages—don’t rush the top.",
    ],
    difficulty: "Extreme",
    category: "Stronghold",
  },
  "poi-void-causeway": {
    description:
      "The main lane through Voidreach; most contested fights happen here. Ambush-friendly terrain and constant traffic. Use fracture ledges to bypass when the causeway is camped.",
    mechanics: [
      "Linear lane with alternate fracture-ledges routes",
      "High PvP and PvE density",
      "Gate Breach and other events touch this lane",
    ],
    rewards: ["Voidstone", "Rift key fragments", "Event loot", "Echo sigils"],
    tips: [
      "Don’t chain brawls on the causeway",
      "Exit via fracture ledges when the main lane is hot.",
    ],
    difficulty: "High",
    category: "Main lane",
  },
  "event-void-rift-tide": {
    description:
      "World event: safe lanes rotate as the rift shifts. Nodes and objectives spawn in dangerous pockets. Map knowledge and timing decide who gets out alive.",
    mechanics: [
      "Safe lanes rotate on a timer",
      "Hazard zones deal damage or apply debuffs",
      "Node and objective spawns follow the safe lanes",
    ],
    rewards: ["Voidstone", "Rift key fragments", "Aether thread", "Fracture crystal"],
    tips: [
      "Farm on the edge during Rift Tide; don’t overcommit",
      "One safe-lane fight only—extract when you have a key fragment.",
    ],
    difficulty: "High",
    duration: "~15–20 min",
  },
  "event-void-echo-storm": {
    description:
      "Hold objectives while debuffed. Rewards echo sigils and fracture crystals. Coordination and cleanse management are essential.",
    mechanics: [
      "Debuffs apply to players in the zone",
      "Hold circles or nodes to earn progress",
      "Debuff intensity scales with time",
    ],
    rewards: ["Echo sigils", "Fracture crystal", "Nullbloom", "Voidstone"],
    tips: [
      "Bring cleanse or resist consumables",
      "Rotate who holds so no one stays debuffed too long.",
    ],
    difficulty: "High",
    duration: "~12–15 min",
  },
  "event-void-gate-breach": {
    description:
      "Server-scale moment: sealed doors open for about 20 minutes. Bosses and high-tier loot inside. Coordinate with your squad and possibly the server to maximize the window.",
    mechanics: [
      "Sealed doors open for a fixed duration",
      "Bosses and elites inside",
      "Multiple squads can participate; competition is high",
    ],
    rewards: ["Singularity shards", "Rift key fragments", "Boss loot", "Legendary-tier mats"],
    tips: [
      "Coordinate a Gate Breach window with your team",
      "Split roles: objective holders + intercept squad. Exit via fracture ledges if causeway is camped.",
    ],
    difficulty: "Extreme",
    duration: "~20 min",
  },
  "boss-void-null-titan": {
    description:
      "World raid boss of Voidreach. Arena hazards and add waves. Drops singularity shards (very rare) and pinnacle loot. The ultimate test of squad coordination.",
    mechanics: [
      "Arena hazards rotate—safe zones move",
      "Add waves require dedicated clear or kite",
      "Phase transitions increase hazard density",
    ],
    rewards: ["Singularity shards", "Echo sigils", "Fracture crystal", "Pinnacle cosmetics"],
    tips: [
      "Assign roles: tank, add clear, hazard caller",
      "Save cooldowns for the final phase—other squads will push.",
    ],
    difficulty: "Extreme",
    category: "World raid boss",
    lore: "It does not hate you. It does not notice you. It simply is—and you are in the way.",
  },
  "boss-void-spire-architect": {
    description:
      "Stronghold boss of Obsidian Spire. Geometry attacks and vertical mechanics. Rewards high-tier blueprint shards and fracture crystals.",
    mechanics: [
      "Geometry attacks reshape the arena",
      "Vertical movement required to avoid damage",
      "Knockback and platform shifts",
    ],
    rewards: ["Blueprint shards", "Fracture crystal", "Spire gear", "Rift key fragments"],
    tips: [
      "Stay mobile; the arena is the real boss",
      "Use the vertical layout to los and reposition.",
    ],
    difficulty: "Extreme",
    category: "Stronghold boss",
  },
};

export function getMarkerDetail(markerId: string): MarkerDetail | undefined {
  return markerDetails[markerId];
}

function stripRaritySuffix(s: string): string {
  return s.replace(/\s*\((?:rare|epic|legendary|uncommon|common)\)\s*$/i, "").trim();
}

const RARITY_ORDER: RewardRarity[] = ["common", "uncommon", "rare", "epic", "legendary"];

function atLeastRarity(rarity: RewardRarity, minRarity: RewardRarity): RewardRarity {
  const a = RARITY_ORDER.indexOf(rarity);
  const b = RARITY_ORDER.indexOf(minRarity);
  return b > a ? minRarity : rarity;
}

/** Normalize reward to { name, rarity } for display. Infers rarity from string (e.g. "(rare)" → rare). */
export function normalizeReward(
  item: string | RewardItem,
  options?: { minRarity?: RewardRarity }
): { name: string; rarity: RewardRarity } {
  let result: { name: string; rarity: RewardRarity };
  if (typeof item === "string") {
    const lower = item.toLowerCase();
    if (lower.includes("legendary") || lower.includes("pinnacle") || lower.includes("prestige"))
      result = { name: stripRaritySuffix(item), rarity: "legendary" };
    else if (lower.includes("(rare)") || lower.includes(" rare)") || lower.endsWith("(rare)"))
      result = { name: stripRaritySuffix(item), rarity: "rare" };
    else if (lower.includes("epic") || lower.includes("singularity") || lower.includes("cinderheart"))
      result = { name: stripRaritySuffix(item), rarity: "epic" };
    else if (lower.includes("uncommon") || lower.includes("blueprint") || lower.includes("fragment"))
      result = { name: stripRaritySuffix(item), rarity: "uncommon" };
    else
      result = { name: stripRaritySuffix(item), rarity: "uncommon" };
  } else {
    result = {
      name: stripRaritySuffix(item.name),
      rarity: item.rarity ?? "uncommon",
    };
  }
  if (options?.minRarity) {
    result = { ...result, rarity: atLeastRarity(result.rarity, options.minRarity) };
  }
  return result;
}
