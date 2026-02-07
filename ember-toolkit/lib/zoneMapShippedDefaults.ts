/**
 * Shipped default settings for zone maps. These are used as the initial state for
 * every first-time visitor; localStorage overrides them when present.
 *
 * Defaults are loaded from ./zoneMapDefaults.json so you can update first-time
 * settings without editing TypeScript:
 * 1. On the map, open OPTIONS → tune layers/sizes/zoom/positions → click "COPY FOR NEW SESSIONS".
 * 2. Paste the copied JSON into lib/zoneMapDefaults.json (replace the "layers", "tuning",
 *    "mapOpacity", "mapScale" object). Optionally add "markerPositions": { "zoneId": { "marker-id": { "x", "y" }, ... }, ... }.
 * 3. Save the file; next build or refresh will use these values for anyone opening the page for the first time.
 */

import type { ZoneMapId } from "./zoneMaps";
import defaultsJson from "./zoneMapDefaults.json";

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

const FALLBACK_DEFAULTS: ShippedDefaults = {
  layers: { harvest: true, event: true, raidBoss: true, base: false },
  tuning: {
    harvest: { hue: 145, nodeSize: 1.0, nodeRadius: 1.0, outerEnabled: true },
    event: { hue: 45, nodeSize: 1.0, nodeRadius: 1.0, outerEnabled: true, zoneRadius: 1.0, areaOpacity: 0.14 },
    raidBoss: { hue: 0, nodeSize: 1.0, nodeRadius: 1.0, outerEnabled: true, zoneRadius: 1.0, areaOpacity: 0.12 },
    base: { hue: 38, size: 1.0, radius: 1.0 },
  },
  mapOpacity: 0.92,
  mapScale: 1.0,
};

function isShippedDefaultsLike(
  v: unknown
): v is { layers?: unknown; tuning?: unknown; mapOpacity?: unknown; mapScale?: unknown } {
  return typeof v === "object" && v !== null;
}

/** Defaults loaded from zoneMapDefaults.json; used for all first-time visitors. */
export const SHIPPED_DEFAULTS: ShippedDefaults = (() => {
  if (!isShippedDefaultsLike(defaultsJson)) return FALLBACK_DEFAULTS;
  const j = defaultsJson as Record<string, unknown>;
  const layers = j.layers && typeof j.layers === "object" ? (j.layers as ShippedDefaults["layers"]) : FALLBACK_DEFAULTS.layers;
  const tuning = j.tuning && typeof j.tuning === "object" ? (j.tuning as ShippedTuning) : FALLBACK_DEFAULTS.tuning;
  const mapOpacity = typeof j.mapOpacity === "number" ? j.mapOpacity : FALLBACK_DEFAULTS.mapOpacity;
  const mapScale = typeof j.mapScale === "number" ? j.mapScale : FALLBACK_DEFAULTS.mapScale;
  return { layers, tuning, mapOpacity, mapScale };
})();

/** Per-zone marker positions from zoneMapDefaults.json (optional "markerPositions" key). */
export const SHIPPED_MARKER_POSITIONS: Partial<
  Record<ZoneMapId, Record<string, { x: number; y: number }>>
> = (() => {
  const j = defaultsJson as { markerPositions?: Partial<Record<string, Record<string, { x: number; y: number }>>> };
  if (!j.markerPositions || typeof j.markerPositions !== "object") return {};
  return j.markerPositions as Partial<Record<ZoneMapId, Record<string, { x: number; y: number }>>>;
})();

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
