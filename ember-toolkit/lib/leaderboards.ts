/**
 * Leaderboard data and types for Ashfall.
 * Expeditions are the spine; solo and group have separate boards.
 * Seasonal challenges each have independent leaderboards.
 * All-time rank tracks best rank achieved across all seasons.
 */

export type LeaderboardMetric = "depth" | "time" | "count" | "rank";

/** Solo expedition: one player, deepest level this season */
export interface SoloExpeditionEntry {
  rank: number;
  name: string;
  class: string;
  guild?: string; // for leaderboard promo
  depth: number; // floor/level reached
  seasonId: string;
}

/** Group expedition: 2–4 players, squad name, deepest level this season */
export interface GroupExpeditionEntry {
  rank: number;
  squadName: string;
  guild?: string; // guild backing the squad, for promo
  memberCount: number;
  depth: number;
  seasonId: string;
  note?: string;
}

/** A seasonal challenge has its own metric and independent leaderboard */
export interface SeasonalChallenge {
  id: string;
  name: string;
  description: string;
  metric: LeaderboardMetric;
  metricLabel: string; // e.g. "Deepest floor", "Time", "Boss kills"
  seasonId: string;
  entries: ChallengeLeaderboardEntry[];
}

export interface ChallengeLeaderboardEntry {
  rank: number;
  name: string; // player or squad name
  value: number | string; // score (number) or formatted string (e.g. "0:12:44")
  subLabel?: string; // e.g. class or "2 players"
  guild?: string; // for leaderboard promo
}

/** All-time: best rank a player ever achieved across any season */
export interface AllTimeRankEntry {
  rank: number; // 1 = best peak rank ever
  name: string;
  class: string;
  guild?: string; // for leaderboard promo
  peakRank: string; // e.g. "Legend", "Mythic"
  peakSeasonId: string;
  seasonsAtPeak: number; // how many seasons they hit that tier
}

// ——— Example / mock data ———

export const CURRENT_SEASON_ID = "ASH-04";
export const CURRENT_SEASON_LABEL = "Season 4 • ASH-04";

export const SOLO_EXPEDITION_LEADERBOARD: SoloExpeditionEntry[] = [
  { rank: 1, name: "VoidKestrel", class: "Voidmancer", guild: "Cinder Crown", depth: 47, seasonId: CURRENT_SEASON_ID },
  { rank: 2, name: "AshRider", class: "Hunter", guild: "Ironwood Pact", depth: 44, seasonId: CURRENT_SEASON_ID },
  { rank: 3, name: "BannerFang", class: "Warlord", guild: "Banner Company", depth: 42, seasonId: CURRENT_SEASON_ID },
  { rank: 4, name: "StoneHalo", class: "Mystic", guild: "Stone Circle", depth: 41, seasonId: CURRENT_SEASON_ID },
  { rank: 5, name: "GateWarden", class: "Warden", guild: "Ember Guard", depth: 39, seasonId: CURRENT_SEASON_ID },
  { rank: 6, name: "ForgeKite", class: "Architect", guild: "Rune Wardens", depth: 38, seasonId: CURRENT_SEASON_ID },
  { rank: 7, name: "EmberVeil", class: "Voidmancer", guild: "Void Pact", depth: 37, seasonId: CURRENT_SEASON_ID },
  { rank: 8, name: "CinderMark", class: "Hunter", guild: "Cinder Crown", depth: 36, seasonId: CURRENT_SEASON_ID },
  { rank: 9, name: "RuneBreaker", class: "Warlord", guild: "Rune Wardens", depth: 35, seasonId: CURRENT_SEASON_ID },
  { rank: 10, name: "ShadowHearth", class: "Mystic", guild: "Stone Circle", depth: 34, seasonId: CURRENT_SEASON_ID },
];

export const GROUP_EXPEDITION_LEADERBOARD: GroupExpeditionEntry[] = [
  { rank: 1, squadName: "Cinder Crown", guild: "Cinder Crown", memberCount: 4, depth: 62, seasonId: CURRENT_SEASON_ID, note: "Full clear to 62, clean extract." },
  { rank: 2, squadName: "Ironwood Pact", guild: "Ironwood Pact", memberCount: 3, depth: 58, seasonId: CURRENT_SEASON_ID, note: "Owned rotation routes." },
  { rank: 3, squadName: "Silvershade Six", guild: "Silvershade Six", memberCount: 4, depth: 56, seasonId: CURRENT_SEASON_ID, note: "Boss chain + clean pulls." },
  { rank: 4, squadName: "Deep Delvers", guild: "Deep Delvers", memberCount: 2, depth: 52, seasonId: CURRENT_SEASON_ID, note: "Duo push, zero deaths." },
  { rank: 5, squadName: "Ashwalkers", guild: "Ashwalkers", memberCount: 4, depth: 51, seasonId: CURRENT_SEASON_ID, note: "Week 2 surge." },
  { rank: 6, squadName: "Banner Company", guild: "Banner Company", memberCount: 3, depth: 49, seasonId: CURRENT_SEASON_ID },
  { rank: 7, squadName: "Void Pact", guild: "Void Pact", memberCount: 2, depth: 46, seasonId: CURRENT_SEASON_ID },
  { rank: 8, squadName: "Ember Guard", guild: "Ember Guard", memberCount: 4, depth: 45, seasonId: CURRENT_SEASON_ID },
  { rank: 9, squadName: "Rune Wardens", guild: "Rune Wardens", memberCount: 3, depth: 44, seasonId: CURRENT_SEASON_ID },
  { rank: 10, squadName: "Stone Circle", guild: "Stone Circle", memberCount: 2, depth: 42, seasonId: CURRENT_SEASON_ID },
];

/** Example seasonal challenges, each with its own leaderboard */
export const SEASONAL_CHALLENGES: SeasonalChallenge[] = [
  {
    id: "first-light-sprint",
    name: "First Light Sprint",
    description: "Fastest time to clear floor 5 in the first 24 hours of the season.",
    metric: "time",
    metricLabel: "Time",
    seasonId: CURRENT_SEASON_ID,
    entries: [
      { rank: 1, name: "AshRider", value: "0:42:18", subLabel: "Hunter", guild: "Ironwood Pact" },
      { rank: 2, name: "VoidKestrel", value: "0:44:02", subLabel: "Voidmancer", guild: "Cinder Crown" },
      { rank: 3, name: "BannerFang", value: "0:45:31", subLabel: "Warlord", guild: "Banner Company" },
      { rank: 4, name: "GateWarden", value: "0:47:12", subLabel: "Warden", guild: "Ember Guard" },
      { rank: 5, name: "ForgeKite", value: "0:48:55", subLabel: "Architect", guild: "Rune Wardens" },
    ],
  },
  {
    id: "boss-rush",
    name: "Boss Rush",
    description: "Most boss kills in a single expedition run this season.",
    metric: "count",
    metricLabel: "Boss kills",
    seasonId: CURRENT_SEASON_ID,
    entries: [
      { rank: 1, name: "Cinder Crown", value: 12, subLabel: "4 players", guild: "Cinder Crown" },
      { rank: 2, name: "Ironwood Pact", value: 11, subLabel: "3 players", guild: "Ironwood Pact" },
      { rank: 3, name: "VoidKestrel", value: 9, subLabel: "Solo", guild: "Cinder Crown" },
      { rank: 4, name: "Silvershade Six", value: 9, subLabel: "4 players", guild: "Silvershade Six" },
      { rank: 5, name: "AshRider", value: 8, subLabel: "Solo", guild: "Ironwood Pact" },
    ],
  },
  {
    id: "no-death-run",
    name: "No Death Run",
    description: "Deepest floor reached with zero party deaths in one run.",
    metric: "depth",
    metricLabel: "Floor",
    seasonId: CURRENT_SEASON_ID,
    entries: [
      { rank: 1, name: "Deep Delvers", value: 52, subLabel: "2 players", guild: "Deep Delvers" },
      { rank: 2, name: "StoneHalo", value: 41, subLabel: "Solo", guild: "Stone Circle" },
      { rank: 3, name: "VoidKestrel", value: 40, subLabel: "Solo", guild: "Cinder Crown" },
      { rank: 4, name: "Cinder Crown", value: 38, subLabel: "4 players", guild: "Cinder Crown" },
      { rank: 5, name: "GateWarden", value: 36, subLabel: "Solo", guild: "Ember Guard" },
    ],
  },
  {
    id: "week-one-dive",
    name: "Week One Dive",
    description: "Deepest floor reached by end of season week 1.",
    metric: "depth",
    metricLabel: "Floor",
    seasonId: CURRENT_SEASON_ID,
    entries: [
      { rank: 1, name: "VoidKestrel", value: 28, subLabel: "Voidmancer", guild: "Cinder Crown" },
      { rank: 2, name: "AshRider", value: 26, subLabel: "Hunter", guild: "Ironwood Pact" },
      { rank: 3, name: "BannerFang", value: 25, subLabel: "Warlord", guild: "Banner Company" },
      { rank: 4, name: "Cinder Crown", value: 24, subLabel: "4 players", guild: "Cinder Crown" },
      { rank: 5, name: "StoneHalo", value: 23, subLabel: "Mystic", guild: "Stone Circle" },
    ],
  },
];

export const ALL_TIME_RANK_LEADERBOARD: AllTimeRankEntry[] = [
  { rank: 1, name: "VoidKestrel", class: "Voidmancer", guild: "Cinder Crown", peakRank: "Legend", peakSeasonId: "ASH-02", seasonsAtPeak: 2 },
  { rank: 2, name: "AshRider", class: "Hunter", guild: "Ironwood Pact", peakRank: "Legend", peakSeasonId: "ASH-03", seasonsAtPeak: 1 },
  { rank: 3, name: "BannerFang", class: "Warlord", guild: "Banner Company", peakRank: "Mythic", peakSeasonId: "ASH-04", seasonsAtPeak: 3 },
  { rank: 4, name: "StoneHalo", class: "Mystic", guild: "Stone Circle", peakRank: "Mythic", peakSeasonId: "ASH-03", seasonsAtPeak: 2 },
  { rank: 5, name: "GateWarden", class: "Warden", guild: "Ember Guard", peakRank: "Mythic", peakSeasonId: "ASH-04", seasonsAtPeak: 1 },
  { rank: 6, name: "ForgeKite", class: "Architect", guild: "Rune Wardens", peakRank: "Gold", peakSeasonId: "ASH-04", seasonsAtPeak: 4 },
  { rank: 7, name: "EmberVeil", class: "Voidmancer", guild: "Void Pact", peakRank: "Gold", peakSeasonId: "ASH-03", seasonsAtPeak: 2 },
  { rank: 8, name: "CinderMark", class: "Hunter", guild: "Cinder Crown", peakRank: "Gold", peakSeasonId: "ASH-04", seasonsAtPeak: 1 },
  { rank: 9, name: "RuneBreaker", class: "Warlord", guild: "Rune Wardens", peakRank: "Silver", peakSeasonId: "ASH-02", seasonsAtPeak: 3 },
  { rank: 10, name: "ShadowHearth", class: "Mystic", guild: "Stone Circle", peakRank: "Silver", peakSeasonId: "ASH-04", seasonsAtPeak: 2 },
];
