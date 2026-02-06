/**
 * Shipped default settings for zone maps. These are used as the initial state for
 * every visitor; localStorage overrides them when present (user has saved their own).
 *
 * To use your own defaults:
 * 1. Open the site, tune layers/sizes/positions, then "Save as default" (and optionally "Apply to all zones").
 * 2. In DevTools → Application → Local Storage, copy the values for:
 *    - ember:zoneMapDefaults:v1:global (layers, tuning, mapOpacity, mapScale)
 *    - ember:markerPositions:v1:<zoneId> for each zone (e.g. emberwastes, ironwood, silvershade, voidreach, bc07_zangarmarsh)
 * 3. Paste below: replace SHIPPED_DEFAULTS with the parsed JSON for global defaults,
 *    and SHIPPED_MARKER_POSITIONS with an object keyed by zoneId, each value being the parsed marker positions.
 */

import type { ZoneMapId } from "./zoneMaps";

export type LayerId = "harvest" | "event" | "raidBoss" | "base";

type NodeLayerTuning = {
  hue: number;
  nodeSize: number;
  nodeRadius: number;
  outerEnabled: boolean;
};

type ZoneLayerTuning = NodeLayerTuning & {
  zoneRadius: number;
  areaOpacity: number;
};

type BaseLayerTuning = {
  hue: number;
  size: number;
  radius: number;
};

export type ShippedTuning = {
  harvest: NodeLayerTuning;
  event: ZoneLayerTuning;
  raidBoss: ZoneLayerTuning;
  base: BaseLayerTuning;
};

export type ShippedDefaults = {
  layers: Record<LayerId, boolean>;
  tuning: ShippedTuning;
  mapOpacity: number;
  mapScale: number;
};

/** Default layers, tuning, opacity, and scale used for all users when they have no saved settings. */
export const SHIPPED_DEFAULTS: ShippedDefaults = {
  layers: {
    harvest: true,
    event: true,
    raidBoss: true,
    base: false,
  },
  tuning: {
    harvest: { hue: 145, nodeSize: 1.0, nodeRadius: 1.0, outerEnabled: true },
    event: {
      hue: 45,
      nodeSize: 1.0,
      nodeRadius: 1.0,
      outerEnabled: true,
      zoneRadius: 1.0,
      areaOpacity: 0.14,
    },
    raidBoss: {
      hue: 0,
      nodeSize: 1.0,
      nodeRadius: 1.0,
      outerEnabled: true,
      zoneRadius: 1.0,
      areaOpacity: 0.12,
    },
    base: { hue: 38, size: 1.0, radius: 1.0 },
  },
  mapOpacity: 0.92,
  mapScale: 1.0,
};

/** Per-zone marker position overrides. Replace with your own from localStorage (ember:markerPositions:v1:<zoneId>). */
export const SHIPPED_MARKER_POSITIONS: Partial<
  Record<ZoneMapId, Record<string, { x: number; y: number }>>
> = {
  // Example: emberwastes: { "harvest-ember-cinderstone-01": { x: 52, y: 34 }, ... },
};

/** Deep clone of shipped defaults so initial state is not mutated. */
export function getShippedDefaults(): ShippedDefaults {
  return JSON.parse(JSON.stringify(SHIPPED_DEFAULTS));
}

export function getShippedMarkerPositions(
  zoneId: ZoneMapId
): Record<string, { x: number; y: number }> {
  const positions = SHIPPED_MARKER_POSITIONS[zoneId];
  return positions ? { ...positions } : {};
}
