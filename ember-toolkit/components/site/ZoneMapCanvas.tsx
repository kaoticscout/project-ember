"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/withBasePath";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OrnamentDivider } from "@/components/site/OrnamentDivider";
import { getMarkerDetail, normalizeReward, type RewardRarity } from "@/lib/markerDetails";
import { ZONE_MAP_IDS, getZoneMap, type ZoneMapId, type MapMarker, type MarkerKind } from "@/lib/zoneMaps";

/** Distinct icon character per marker kind for events and bosses. */
const MARKER_KIND_ICONS: Record<MarkerKind, string> = {
  stronghold: "⛫",
  poi: "⌂",
  chokepoint: "⊳",
  lane: "⇄",
  storm: "⛈",
  escort: "◆",
  timed: "⌛",
  hunt: "◎",
  harvest: "⬡",
  ritual: "✧",
  worldBoss: "★",
  strongholdBoss: "⚔",
};

function getMarkerIcon(m: MapMarker): string {
  if (m.markerKind && m.markerKind in MARKER_KIND_ICONS) {
    return MARKER_KIND_ICONS[m.markerKind as MarkerKind];
  }
  return m.type === "raidBoss" ? "★" : "◆";
}

/** Boss icon image for world boss markers (single-point indicator). */
function BossIconImg({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <Image
      src={withBasePath("/assets/Icons/BossIcon_Alt.png")}
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
      aria-hidden
      unoptimized
    />
  );
}

type Props = {
  zoneId: ZoneMapId;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function hsl(hue: number, sat = 78, light = 58, alpha = 1) {
  const h = Math.round(((hue % 360) + 360) % 360);
  return `hsla(${h} ${sat}% ${light}% / ${alpha})`;
}

type LayerId = "harvest" | "event" | "raidBoss" | "base";

type NodeLayerTuning = {
  hue: number; // 0..360
  nodeSize: number; // 0.6..2.4 (inner solid node circle)
  nodeRadius: number; // 0.6..2.4 (outer translucent radius)
  outerEnabled: boolean; // toggles outer translucent ring (and pulse where applicable)
};

type ZoneLayerTuning = NodeLayerTuning & {
  zoneRadius: number; // 0.4..2.4 (big on-map zone circle)
  areaOpacity: number; // 0..0.8 (area fill + outline opacity)
};

type BaseLayerTuning = {
  hue: number; // 0..360
  size: number; // 0.6..2.4 (footprint scale)
  radius: number; // 0.6..2.4 (corner radius)
};

type LayerTuningState = {
  harvest: NodeLayerTuning;
  event: ZoneLayerTuning;
  raidBoss: ZoneLayerTuning;
  base: BaseLayerTuning;
};

const defaultTuning: LayerTuningState = {
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
};

export function ZoneMapCanvas(props: Props) {
  const zone = getZoneMap(props.zoneId);
  const ZONE_SETTINGS_KEY = `ember:zoneMapSettings:v1:${props.zoneId}`;
  const DEFAULT_KEY = `ember:zoneMapDefaults:v1:${props.zoneId}`;
  const GLOBAL_DEFAULT_KEY = "ember:zoneMapDefaults:v1:global";
  const GLOBAL_SEED_ZONE_ID: ZoneMapId = "ironwood";
  const GLOBAL_SETTINGS_KEY = "ember:zoneMapSettings:v1:global";
  const MARKER_POSITIONS_KEY = `ember:markerPositions:v1:${props.zoneId}`;

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [lastStorageAction, setLastStorageAction] = useState<string | null>(null);
  const [storageDebugTick, setStorageDebugTick] = useState(0);
  const [layers, setLayers] = useState<Record<LayerId, boolean>>({
    harvest: true,
    event: true,
    raidBoss: true,
    base: true,
  });

  const [tuning, setTuning] = useState<LayerTuningState>(defaultTuning);
  const [mapOpacity, setMapOpacity] = useState(0.92);
  const [mapScale, setMapScale] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [tooltipAnchor, setTooltipAnchor] = useState<{
    marker: MapMarker;
    anchorX: number;
    anchorY: number;
    containerW: number;
    containerH: number;
  } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [savedMarkerPositions, setSavedMarkerPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [draggingMarkerId, setDraggingMarkerId] = useState<string | null>(null);

  const hasHydratedRef = useRef(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const panStartRef = useRef<{ x: number; y: number; startPanX: number; startPanY: number } | null>(null);
  const dragStartRef = useRef<{ markerId: string; startX: number; startY: number; startMarkerX: number; startMarkerY: number } | null>(null);

  type StoredStateV1 = {
    layers?: Partial<Record<LayerId, boolean>>;
    tuning?: Partial<LayerTuningState>;
    mapOpacity?: number;
    mapScale?: number;
    optionsOpen?: boolean;
  };

  const applyStoredState = useCallback((parsed: StoredStateV1) => {
    if (parsed.layers && typeof parsed.layers === "object") {
      setLayers((prev) => ({
        ...prev,
        ...parsed.layers,
      }));
    }

    if (typeof parsed.mapOpacity === "number") {
      setMapOpacity(clamp(parsed.mapOpacity, 0.4, 1));
    }
    if (typeof parsed.mapScale === "number") {
      setMapScale(clamp(parsed.mapScale, 1, 2));
    }
    if (typeof parsed.optionsOpen === "boolean") {
      setOptionsOpen(parsed.optionsOpen);
    }

    if (parsed.tuning && typeof parsed.tuning === "object") {
      setTuning((prev) => {
        const next: LayerTuningState = {
          harvest: {
            ...prev.harvest,
            ...(parsed.tuning?.harvest ?? {}),
          },
          event: {
            ...prev.event,
            ...(parsed.tuning?.event ?? {}),
          },
          raidBoss: {
            ...prev.raidBoss,
            ...(parsed.tuning?.raidBoss ?? {}),
          },
          base: {
            ...prev.base,
            ...(parsed.tuning?.base ?? {}),
          },
        };

        // Clamp key fields to prevent weird values from older schemas.
        next.harvest.hue = clamp(next.harvest.hue, 0, 360);
        next.harvest.nodeSize = clamp(next.harvest.nodeSize, 0.6, 2.4);
        next.harvest.nodeRadius = clamp(next.harvest.nodeRadius, 0.6, 2.4);
        next.harvest.outerEnabled = Boolean(next.harvest.outerEnabled);

        next.event.hue = clamp(next.event.hue, 0, 360);
        next.event.nodeSize = clamp(next.event.nodeSize, 0.6, 2.4);
        next.event.nodeRadius = clamp(next.event.nodeRadius, 0.6, 2.4);
        next.event.outerEnabled = Boolean(next.event.outerEnabled);
        next.event.zoneRadius = clamp(next.event.zoneRadius, 0.05, 2);
        next.event.areaOpacity = clamp(next.event.areaOpacity, 0, 0.8);

        next.raidBoss.hue = clamp(next.raidBoss.hue, 0, 360);
        next.raidBoss.nodeSize = clamp(next.raidBoss.nodeSize, 0.6, 2.4);
        next.raidBoss.nodeRadius = clamp(next.raidBoss.nodeRadius, 0.6, 2.4);
        next.raidBoss.outerEnabled = Boolean(next.raidBoss.outerEnabled);
        next.raidBoss.zoneRadius = clamp(next.raidBoss.zoneRadius, 0.05, 2);
        next.raidBoss.areaOpacity = clamp(next.raidBoss.areaOpacity, 0, 0.8);

        next.base.hue = clamp(next.base.hue, 0, 360);
        next.base.size = clamp(next.base.size, 0.6, 2.4);
        next.base.radius = clamp(next.base.radius, 0.6, 2.4);

        return next;
      });
    }
  }, []);

  useEffect(() => {
    try {
      const defaultsRaw = localStorage.getItem(DEFAULT_KEY);
      if (defaultsRaw) {
        applyStoredState(JSON.parse(defaultsRaw) as StoredStateV1);
      }

      let globalDefaultsRaw = localStorage.getItem(GLOBAL_DEFAULT_KEY);

      // If global defaults don't exist yet, seed them from the user's tuned Ironwood setup
      // (this lets you pick one "canonical" look and have other zones inherit it).
      if (!globalDefaultsRaw) {
        const seedRaw =
          localStorage.getItem(`ember:zoneMapSettings:v1:${GLOBAL_SEED_ZONE_ID}`) ??
          localStorage.getItem(`ember:zoneMapDefaults:v1:${GLOBAL_SEED_ZONE_ID}`);
        if (seedRaw) {
          globalDefaultsRaw = seedRaw;
          try {
            localStorage.setItem(GLOBAL_DEFAULT_KEY, seedRaw);
          } catch {
            // ignore
          }
        }
      }

      // If there are no per-zone defaults yet, seed them from global defaults (if present).
      // This lets you tune a look once and have new zones inherit it.
      if (!defaultsRaw && globalDefaultsRaw) {
        applyStoredState(JSON.parse(globalDefaultsRaw) as StoredStateV1);
        try {
          localStorage.setItem(DEFAULT_KEY, globalDefaultsRaw);
        } catch {
          // ignore
        }
      }

      // Global settings: used as the "canonical look" across zones.
      // Apply these LAST so they win over any per-zone cached settings.
      let globalSettingsRaw = localStorage.getItem(GLOBAL_SETTINGS_KEY);
      if (!globalSettingsRaw) {
        // Migrate from Ironwood (your canonical tuned zone), falling back to this zone.
        const seedRaw =
          localStorage.getItem(`ember:zoneMapSettings:v1:${GLOBAL_SEED_ZONE_ID}`) ??
          localStorage.getItem(`ember:zoneMapDefaults:v1:${GLOBAL_SEED_ZONE_ID}`) ??
          localStorage.getItem(ZONE_SETTINGS_KEY) ??
          localStorage.getItem(DEFAULT_KEY);
        if (seedRaw) {
          globalSettingsRaw = seedRaw;
          try {
            localStorage.setItem(GLOBAL_SETTINGS_KEY, seedRaw);
          } catch {
            // ignore
          }
        }
      }

      // Per-zone cached settings (older behavior). Apply, but allow global settings to override.
      const zoneRaw = localStorage.getItem(ZONE_SETTINGS_KEY);
      if (zoneRaw && !globalSettingsRaw) {
        // Only apply per-zone settings when there is no global style defined.
        // Once a global style exists, it should consistently win across zones.
        applyStoredState(JSON.parse(zoneRaw) as StoredStateV1);
      }

      // If you already have a tuned/cached setup, promote it to "defaults" once.
      if (!defaultsRaw && !globalDefaultsRaw && zoneRaw) {
        try {
          localStorage.setItem(DEFAULT_KEY, zoneRaw);
        } catch {
          // ignore
        }
      }

      if (globalSettingsRaw) {
        applyStoredState(JSON.parse(globalSettingsRaw) as StoredStateV1);
      }
    } catch {
      // ignore corrupted cache
    } finally {
      hasHydratedRef.current = true;
    }
  }, [DEFAULT_KEY, ZONE_SETTINGS_KEY, applyStoredState]);

  // Load saved marker positions
  useEffect(() => {
    try {
      const saved = localStorage.getItem(MARKER_POSITIONS_KEY);
      if (saved) {
        setSavedMarkerPositions(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, [MARKER_POSITIONS_KEY]);

  const saveMarkerPositions = useCallback((positions: Record<string, { x: number; y: number }>) => {
    try {
      localStorage.setItem(MARKER_POSITIONS_KEY, JSON.stringify(positions));
      setSavedMarkerPositions(positions);
    } catch {
      // ignore
    }
  }, [MARKER_POSITIONS_KEY]);

  const handleMarkerDragStart = useCallback((markerId: string, e: React.MouseEvent) => {
    if (!editMode || !mapContainerRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const container = mapContainerRef.current.getBoundingClientRect();
    const markerEl = (e.currentTarget as HTMLElement).closest('.marker') as HTMLElement;
    if (!markerEl) return;
    const markerRect = markerEl.getBoundingClientRect();
    const currentX = ((markerRect.left + markerRect.width / 2 - container.left) / container.width) * 100;
    const currentY = ((markerRect.top + markerRect.height / 2 - container.top) / container.height) * 100;
    setDraggingMarkerId(markerId);
    dragStartRef.current = {
      markerId,
      startX: e.clientX,
      startY: e.clientY,
      startMarkerX: currentX,
      startMarkerY: currentY,
    };
  }, [editMode]);

  const handleMarkerDrag = useCallback((e: MouseEvent) => {
    const dragStart = dragStartRef.current;
    if (!dragStart || !mapContainerRef.current) return;
    e.preventDefault();
    const container = mapContainerRef.current.getBoundingClientRect();
    // Account for map scale: pixel movement needs to be scaled down
    const dx = ((e.clientX - dragStart.startX) / container.width / mapScale) * 100;
    const dy = ((e.clientY - dragStart.startY) / container.height / mapScale) * 100;
    const newX = clamp(dragStart.startMarkerX + dx, 0, 100);
    const newY = clamp(dragStart.startMarkerY + dy, 0, 100);
    const markerId = dragStart.markerId;
    setSavedMarkerPositions((prev) => ({
      ...prev,
      [markerId]: { x: newX, y: newY },
    }));
  }, [mapScale]);

  const handleMarkerDragEnd = useCallback(() => {
    if (!dragStartRef.current) return;
    setSavedMarkerPositions((prev) => {
      saveMarkerPositions(prev);
      return prev;
    });
    setDraggingMarkerId(null);
    dragStartRef.current = null;
  }, [saveMarkerPositions]);

  useEffect(() => {
    if (draggingMarkerId) {
      document.addEventListener('mousemove', handleMarkerDrag);
      document.addEventListener('mouseup', handleMarkerDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleMarkerDrag);
        document.removeEventListener('mouseup', handleMarkerDragEnd);
      };
    }
  }, [draggingMarkerId, handleMarkerDrag, handleMarkerDragEnd]);

  const saveAsDefaults = () => {
    const payload: StoredStateV1 = { layers, tuning, mapOpacity, mapScale, optionsOpen };
    try {
      const raw = JSON.stringify(payload);
      localStorage.setItem(DEFAULT_KEY, raw);
      // Also align current (per-zone) settings with the new defaults so the user
      // sees the same thing after navigating away/back.
      localStorage.setItem(ZONE_SETTINGS_KEY, raw);
      setLastStorageAction(`Saved defaults for ${props.zoneId}`);
      setStorageDebugTick((n) => n + 1);
    } catch {
      // ignore
    }
  };

  const resetToDefaults = () => {
    try {
      const raw = localStorage.getItem(DEFAULT_KEY);
      if (!raw) return;
      applyStoredState(JSON.parse(raw) as StoredStateV1);
    } catch {
      // ignore
    }
  };

  const saveAsGlobalDefaults = (applyToAllZones = false) => {
    const payload: StoredStateV1 = { layers, tuning, mapOpacity, mapScale, optionsOpen };
    const raw = JSON.stringify(payload);
    try {
      localStorage.setItem(GLOBAL_DEFAULT_KEY, raw);
      localStorage.setItem(GLOBAL_SETTINGS_KEY, raw);
    } catch {
      // ignore
    }

    // Ensure the current view is aligned immediately.
    applyStoredState(payload);
    setLastStorageAction(
      applyToAllZones ? "Applied settings to all zones" : "Saved global defaults",
    );
    setStorageDebugTick((n) => n + 1);

    if (!applyToAllZones) return;
    for (const zoneId of ZONE_MAP_IDS) {
      try {
        // Set BOTH defaults and active settings. Otherwise previously-visited zones
        // will keep showing their cached per-zone settings and it looks like "apply"
        // didn't work.
        localStorage.setItem(`ember:zoneMapDefaults:v1:${zoneId}`, raw);
        localStorage.setItem(`ember:zoneMapSettings:v1:${zoneId}`, raw);
      } catch {
        // ignore
      }
    }
  };

  const applyGlobalDefaults = () => {
    try {
      const raw = localStorage.getItem(GLOBAL_DEFAULT_KEY);
      if (!raw) return;
      applyStoredState(JSON.parse(raw) as StoredStateV1);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (!hasHydratedRef.current) return;

    const payload: StoredStateV1 = { layers, tuning, mapOpacity, mapScale, optionsOpen };

    try {
      const raw = JSON.stringify(payload);
      // Persist per-zone settings as you tune this map.
      localStorage.setItem(ZONE_SETTINGS_KEY, raw);
    } catch {
      // ignore quota / privacy mode
    }
  }, [ZONE_SETTINGS_KEY, layers, tuning, mapOpacity, mapScale, optionsOpen]);

  const activeRaidBoss = useMemo(
    () => zone.markers.find((m) => m.type === "raidBoss" && m.status === "active"),
    [zone.markers],
  );

  const visibleMarkers = useMemo(() => {
    return zone.markers
      .filter((m) => {
        if (m.type === "harvest") return layers.harvest;
        if (m.type === "event") return layers.event;
        if (m.type === "raidBoss") return layers.raidBoss;
        if (m.type === "base") return layers.base;
        return true;
      })
      .map((m) => {
        const saved = savedMarkerPositions[m.id];
        if (saved) {
          return { ...m, x: saved.x, y: saved.y };
        }
        return m;
      });
  }, [layers, zone.markers, savedMarkerPositions]);

  // Zone radii are authored in percent-of-map-width. Keep the base scale neutral so
  // the slider feels predictable (no "everything is huge" defaults).
  const areaScale = 1;
  const eventAreaScale = areaScale * tuning.event.zoneRadius;

  const harvestColor = hsl(tuning.harvest.hue, 72, 62, 1);
  const eventColor = hsl(tuning.event.hue, 78, 58, 1);
  const raidColor = hsl(tuning.raidBoss.hue, 86, 58, 1);
  const baseFill = hsl(tuning.base.hue, 45, 56, 0.42);
  const baseStroke = hsl(tuning.base.hue, 55, 64, 0.55);

  const nodeInnerPx = {
    harvest: Math.round(8 * tuning.harvest.nodeSize),
    event: Math.round(14 * tuning.event.nodeSize),
    raidBoss: Math.round(16 * tuning.raidBoss.nodeSize),
  };
  const nodeOuterRadiusPx = {
    harvest: Math.round(14 * tuning.harvest.nodeRadius),
    event: Math.round(22 * tuning.event.nodeRadius),
    raidBoss: Math.round(28 * tuning.raidBoss.nodeRadius),
  };

  const nodeOuterEnabled = {
    harvest: tuning.harvest.outerEnabled,
    event: tuning.event.outerEnabled,
    raidBoss: tuning.raidBoss.outerEnabled,
  };

  const baseCorner = clamp(6 * tuning.base.radius, 2, 16);
  const baseScale = clamp(tuning.base.size, 0.5, 2.5);
  const baseCellPx = clamp(Math.round(10 * baseScale), 8, 20);

  const ZOOM_MIN = 1;
  const ZOOM_MAX = 2;
  const ZOOM_STEP = 0.1;

  const handleZoomIn = () => setMapScale((s) => clamp(s + ZOOM_STEP, ZOOM_MIN, ZOOM_MAX));
  const handleZoomOut = () => setMapScale((s) => clamp(s - ZOOM_STEP, ZOOM_MIN, ZOOM_MAX));

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setMapScale((s) => clamp(s - e.deltaY * 0.003, ZOOM_MIN, ZOOM_MAX));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const getPanBounds = useCallback(() => {
    const el = mapContainerRef.current;
    if (!el || mapScale <= 1) return { maxX: 0, maxY: 0 };
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    return {
      maxX: (w * (mapScale - 1)) / 2,
      maxY: (h * (mapScale - 1)) / 2,
    };
  }, [mapScale]);

  const clampPan = useCallback(
    (x: number, y: number) => {
      const { maxX, maxY } = getPanBounds();
      return {
        x: clamp(x, -maxX, maxX),
        y: clamp(y, -maxY, maxY),
      };
    },
    [getPanBounds],
  );

  const handlePanStart = useCallback(
    (e: React.MouseEvent) => {
      if (mapScale <= 1) return;
      if (editMode && draggingMarkerId) return; // Don't pan while dragging a marker
      e.preventDefault();
      setIsPanning(true);
      panStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        startPanX: pan.x,
        startPanY: pan.y,
      };
    },
    [mapScale, pan.x, pan.y, editMode, draggingMarkerId],
  );

  useEffect(() => {
    if (!isPanning) return;
    const onMove = (e: MouseEvent) => {
      const start = panStartRef.current;
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      setPan((prev) => {
        const next = clampPan(start.startPanX + dx, start.startPanY + dy);
        return next;
      });
    };
    const onUp = () => {
      panStartRef.current = null;
      setIsPanning(false);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isPanning, clampPan]);

  // Keep pan in bounds when scale changes (e.g. zoom out)
  useEffect(() => {
    if (mapScale <= 1) {
      setPan({ x: 0, y: 0 });
      return;
    }
    setPan((prev) => clampPan(prev.x, prev.y));
  }, [mapScale, clampPan]);

  return (
    <section className="pb-16">
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          {/* Map */}
          <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-2)] shadow-[0_18px_60px_rgba(0,0,0,0.48)]">
            <div
              ref={mapContainerRef}
              className="relative h-[62vh] min-h-[520px] w-full sm:h-[66vh] lg:h-[70vh]"
              style={{
                aspectRatio: `${zone.aspect[0]} / ${zone.aspect[1]}`,
                cursor: mapScale > 1 ? (isPanning ? "grabbing" : "grab") : "default",
              }}
              role="application"
              aria-label="Zone map; scroll to zoom, drag to pan when zoomed in"
              onMouseDown={handlePanStart}
            >
              <div
                className="absolute inset-0"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${mapScale})`,
                  transformOrigin: "50% 50%",
                }}
              >
                <Image
                  alt={`${zone.name} map`}
                  src={withBasePath(zone.imageSrc)}
                  fill
                  priority
                  sizes="100vw"
                  className="select-none object-cover"
                  style={{ opacity: mapOpacity }}
                />

                {/* Readability / cinematic overlays */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_520px_at_18%_20%,color-mix(in_oklab,var(--accent-gold)_14%,transparent),transparent_60%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_520px_at_85%_25%,color-mix(in_oklab,var(--accent-arcane)_14%,transparent),transparent_60%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--bg-0)_12%,transparent)] via-transparent to-[color:color-mix(in_oklab,var(--bg-0)_62%,transparent)]" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[color:color-mix(in_oklab,var(--accent-gold)_12%,transparent)]" />

                {/* Overlays: event areas only (bosses are a single point, not an area) */}
                <div className="absolute inset-0">
                  {visibleMarkers
                    .filter((m) => m.type === "event" && typeof m.areaRadius === "number")
                    .map((m) => {
                      const areaEnabled = tuning.event.outerEnabled;
                      if (!areaEnabled) return null;
                      const scale = eventAreaScale;
                      const rRaw = (m.areaRadius ?? 0) * 2 * scale;
                      // Guardrail: avoid accidental "covers the whole map" circles.
                      const r = clamp(rRaw, 0, 90);
                      const areaOpacity = clamp(tuning.event.areaOpacity, 0, 0.8);
                      const outlineOpacity = areaOpacity;
                      const gradientOpacity = clamp(areaOpacity * 1.4, 0, 0.55);

                      return (
                        <div
                          key={`${m.id}-area`}
                          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                          style={{ left: `${m.x}%`, top: `${m.y}%`, width: `${r}%` }}
                          aria-hidden="true"
                        >
                          <div
                            className="relative rounded-full"
                            style={{
                              aspectRatio: "1 / 1",
                              border: `2px solid ${hsl(tuning.event.hue, 78, 58, outlineOpacity)}`,
                              backgroundColor: hsl(tuning.event.hue, 78, 58, areaOpacity),
                              boxShadow: `0 0 0 1px rgba(0,0,0,0.32) inset, 0 0 80px ${hsl(tuning.event.hue, 85, 58, clamp(areaOpacity * 0.9, 0, 0.55))}`,
                            }}
                          >
                            <div
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: `radial-gradient(circle at 50% 50%, ${hsl(tuning.event.hue, 86, 58, gradientOpacity)}, ${hsl(tuning.event.hue, 86, 58, 0)} 64%)`,
                              }}
                            />
                            <div
                              className="areaPulse absolute inset-0 rounded-full"
                              style={{
                                border: `2px solid ${hsl(tuning.event.hue, 86, 58, clamp(outlineOpacity * 1.6, 0, 0.85))}`,
                                boxShadow: `0 0 0 1px rgba(0, 0, 0, 0.35) inset, 0 0 30px ${hsl(tuning.event.hue, 86, 58, clamp(outlineOpacity * 0.8, 0, 0.5))}`,
                                animationDuration: "1.9s",
                              }}
                            />
                            <div
                              className="areaPulse absolute inset-0 rounded-full"
                              style={{
                                border: `1px solid ${hsl(tuning.event.hue, 86, 58, clamp(outlineOpacity * 1.2, 0, 0.7))}`,
                                animationDuration: "2.2s",
                                animationDelay: "0.4s",
                              }}
                            />
                            <div
                              className="pointer-events-none absolute inset-0 rounded-full"
                              style={{ outline: `1px solid rgba(0,0,0,0.18)` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Overlays: bases */}
                <div className="absolute inset-0">
                  {visibleMarkers
                    .filter((m) => m.type === "base" && Array.isArray(m.cells) && m.cells.length > 0)
                    .map((m) => {
                      const cells = (m.cells ?? []).map((c) => ({ x: c.x, y: c.y }));
                      const minX = Math.min(...cells.map((c) => c.x));
                      const minY = Math.min(...cells.map((c) => c.y));
                      const maxX = Math.max(...cells.map((c) => c.x));
                      const cols = maxX - minX + 1;

                      const normalized = cells.map((c) => ({
                        x: c.x - minX,
                        y: c.y - minY,
                      }));

                      return (
                        <div
                          key={`${m.id}-base`}
                          className="baseOverlay group absolute z-40"
                          style={{ left: `${m.x}%`, top: `${m.y}%` }}
                          onMouseEnter={(e) => {
                            const el = mapContainerRef.current;
                            const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            if (!el) return;
                            const c = el.getBoundingClientRect();
                            setTooltipAnchor({
                              marker: m,
                              anchorX: r.left - c.left + r.width / 2,
                              anchorY: r.top - c.top,
                              containerW: c.width,
                              containerH: c.height,
                            });
                          }}
                          onMouseLeave={() => setTooltipAnchor(null)}
                        >
                          <div className="relative -translate-x-1/2 -translate-y-1/2">
                            <div
                              className="grid gap-[2px]"
                              style={{
                                gridTemplateColumns: `repeat(${cols}, ${baseCellPx}px)`,
                                gridAutoRows: `${baseCellPx}px`,
                                padding: 0,
                                borderRadius: 0,
                                background: "transparent",
                                border: "0",
                              }}
                            >
                              {normalized.map((c, idx) => (
                                <div
                                  key={`${m.id}-cell-${idx}`}
                                  style={{
                                    gridColumnStart: c.x + 1,
                                    gridRowStart: c.y + 1,
                                    borderRadius: Math.max(2, Math.floor(baseCorner / 2)),
                                    background: `linear-gradient(180deg, rgba(255,255,255,0.10), rgba(0,0,0,0.04)), ${baseFill}`,
                                    border: `1px solid ${baseStroke}`,
                                    boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Markers */}
                <div className="absolute inset-0">
                  {visibleMarkers
                    .filter((m) => m.type !== "base")
                    .map((m) => (
                      <MarkerButton
                        key={m.id}
                        marker={m}
                        colors={{ harvest: harvestColor, event: eventColor, raidBoss: raidColor }}
                        nodeInnerPx={nodeInnerPx}
                        nodeOuterRadiusPx={nodeOuterRadiusPx}
                        nodeOuterEnabled={nodeOuterEnabled}
                        isSelected={selectedMarker?.id === m.id}
                        onSelect={
                          m.type === "event" || m.type === "raidBoss"
                            ? () => {
                                setSelectedMarker(m);
                                setOptionsOpen(true);
                              }
                            : undefined
                        }
                        onMouseEnter={(e) => {
                          const el = mapContainerRef.current;
                          const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                          if (!el) return;
                          const c = el.getBoundingClientRect();
                          setTooltipAnchor({
                            marker: m,
                            anchorX: r.left - c.left + r.width / 2,
                            anchorY: r.top - c.top,
                            containerW: c.width,
                            containerH: c.height,
                          });
                        }}
                        onMouseLeave={() => setTooltipAnchor(null)}
                        editMode={editMode}
                        isDragging={draggingMarkerId === m.id}
                        onDragStart={m.type === "event" || m.type === "harvest" || m.type === "raidBoss" ? (e) => handleMarkerDragStart(m.id, e) : undefined}
                      />
                    ))}
                </div>
              </div>

              {/* Floating tooltip layer: outside scaled map so it stays visible when zoomed/panned */}
              {tooltipAnchor ? (() => {
                const m = tooltipAnchor.marker;
                const isBase = m.type === "base";
                const tw = isBase ? 224 : 256;
                const th = 120;
                const x = clamp(tooltipAnchor.anchorX, tw / 2, Math.max(tw / 2, tooltipAnchor.containerW - tw / 2));
                const y = clamp(tooltipAnchor.anchorY, 10 + th, tooltipAnchor.containerH - 10);
                const cells = isBase && Array.isArray(m.cells) ? m.cells : [];
                return (
                  <div
                    className={`pointer-events-none absolute z-30 ${isBase ? "w-56" : "w-64"}`}
                    style={{
                      left: x,
                      top: y,
                      transform: "translate(-50%, calc(-100% - 10px))",
                    }}
                  >
                    {isBase ? (
                      <>
                        <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_78%,transparent)] px-4 py-3 text-[color:var(--text-1)] shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
                          <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">BASE</div>
                          <div className="ember-display mt-1 text-base text-[color:var(--text-0)]">{m.name}</div>
                          <div className="mt-2 text-sm text-[color:var(--text-1)]">
                            {m.detail ? `${m.detail} • ` : ""}
                            {cells.length} cells
                          </div>
                        </div>
                        <div className="mx-auto mt-2 h-2 w-2 rotate-45 border-b border-r border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_78%,transparent)]" />
                      </>
                    ) : (
                      <>
                        <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_78%,transparent)] px-4 py-3 text-[color:var(--text-1)] shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                                {m.type === "harvest" ? "HARVEST" : m.type === "event" ? "EVENT" : "RAID BOSS"}
                              </div>
                              <div className="ember-display mt-1 truncate text-base text-[color:var(--text-0)]">{m.name}</div>
                            </div>
                            <span className="shrink-0 rounded-full border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_40%,transparent)] px-3 py-1 text-[10px] tracking-[0.22em] text-[color:var(--text-1)]">
                              {m.type === "harvest"
                                ? "NODE"
                                : m.type === "event"
                                  ? "SPAWN"
                                  : m.type === "raidBoss" && m.status === "active"
                                    ? "ACTIVE"
                                    : "BOSS"}
                            </span>
                          </div>
                          {m.detail ? <div className="mt-2 text-sm text-[color:var(--text-1)]">{m.detail}</div> : null}
                        </div>
                        <div className="mx-auto mt-2 h-2 w-2 rotate-45 border-b border-r border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_78%,transparent)]" />
                      </>
                    )}
                  </div>
                );
              })() : null}
            </div>

            {/* Zoom controls */}
            <div className="absolute right-4 top-4 z-10 flex flex-col gap-0.5 rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_78%,transparent)] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={mapScale >= ZOOM_MAX}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[color:var(--text-1)] hover:bg-[color:color-mix(in_oklab,var(--bg-1)_50%,transparent)] disabled:opacity-40 disabled:hover:bg-transparent"
                aria-label="Zoom in"
              >
                <span className="text-lg leading-none">+</span>
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={mapScale <= ZOOM_MIN}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[color:var(--text-1)] hover:bg-[color:color-mix(in_oklab,var(--bg-1)_50%,transparent)] disabled:opacity-40 disabled:hover:bg-transparent"
                aria-label="Zoom out"
              >
                <span className="text-lg leading-none">−</span>
              </button>
              <div className="border-t border-[color:var(--border-subtle)] px-2 py-1 text-center text-[10px] tabular-nums text-[color:var(--text-2)]">
                {Math.round(mapScale * 100)}%
              </div>
            </div>

            {/* Edit mode toggle */}
            <div className="absolute right-4 top-[calc(100%-60px)] z-10">
              <button
                type="button"
                onClick={() => setEditMode((prev) => !prev)}
                className={`rounded-xl border px-3 py-2 text-xs font-medium shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors ${
                  editMode
                    ? "border-[color:color-mix(in_oklab,var(--accent-gold)_60%,var(--border-subtle))] bg-[color:color-mix(in_oklab,var(--accent-gold)_20%,color-mix(in_oklab,var(--bg-0)_78%,transparent))] text-[color:var(--text-0)]"
                    : "border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_78%,transparent)] text-[color:var(--text-1)] hover:bg-[color:color-mix(in_oklab,var(--bg-1)_50%,transparent)]"
                }`}
                aria-label={editMode ? "Exit edit mode" : "Enter edit mode"}
              >
                {editMode ? "✓ Edit Mode" : "Edit Events"}
              </button>
            </div>

            {/* Mobile helper */}
            <div className="px-4 py-6 sm:hidden">
              <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">TIP</div>
              <div className="mt-2 text-sm text-[color:var(--text-1)]">
                Tap an <span className="font-semibold">event</span> or <span className="font-semibold">world boss</span> on the map to see full details in the side panel. Open <span className="font-semibold">OPTIONS</span> to tune layers and colors.
              </div>
            </div>
          </div>

          {/* Controls */}
          <aside className="lg:sticky lg:top-24">
            <div
              className={`flex max-h-[72vh] flex-col overflow-hidden rounded-2xl border px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors ${
                selectedMarker && (selectedMarker.type === "event" || selectedMarker.type === "raidBoss")
                  ? selectedMarker.type === "raidBoss"
                    ? "border-[color:color-mix(in_oklab,var(--accent-arcane)_45%,var(--border-subtle))] bg-[color:color-mix(in_oklab,var(--accent-arcane)_8%,color-mix(in_oklab,var(--bg-0)_72%,transparent))]"
                    : "border-[color:color-mix(in_oklab,var(--accent-gold)_45%,var(--border-subtle))] bg-[color:color-mix(in_oklab,var(--accent-gold)_8%,color-mix(in_oklab,var(--bg-0)_72%,transparent))]"
                  : "border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_72%,transparent)]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  {selectedMarker && (selectedMarker.type === "event" || selectedMarker.type === "raidBoss") ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{
                            background: selectedMarker.type === "raidBoss" ? raidColor : eventColor,
                            boxShadow: `0 0 0 4px ${(selectedMarker.type === "raidBoss" ? raidColor : eventColor).replace("/ 1)", "/ 0.25)")}`,
                          }}
                        />
                        <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                          {selectedMarker.type === "raidBoss" ? "WORLD BOSS" : "EVENT"}
                        </div>
                      </div>
                      <div className="ember-display mt-1.5 text-balance text-2xl text-[color:var(--text-0)]">
                        {selectedMarker.name}
                      </div>
                      <div className="mt-1.5 text-sm text-[color:var(--text-1)]">
                        {zone.name} · {getMarkerDetail(selectedMarker.id)?.category ?? (selectedMarker.type === "raidBoss" ? "World boss" : "Event")}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">ZONE MAP</div>
                      <div className="ember-display mt-1 truncate text-2xl text-[color:var(--text-0)]">
                        {zone.name}
                      </div>
                      <div className="mt-1 text-sm text-[color:var(--text-1)]">
                        Layers, tuning, and saved presets.
                      </div>
                    </>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {selectedMarker && (selectedMarker.type === "event" || selectedMarker.type === "raidBoss") ? (
                    <button
                      type="button"
                      onClick={() => setSelectedMarker(null)}
                      className="rounded-full border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_40%,transparent)] px-3 py-1 text-[10px] tracking-[0.22em] text-[color:var(--text-1)] hover:border-[color:var(--border-accent)]"
                    >
                      BACK
                    </button>
                  ) : null}
                  {(!selectedMarker || (selectedMarker.type !== "event" && selectedMarker.type !== "raidBoss")) ? (
                    <button
                      type="button"
                      className="rounded-full border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_40%,transparent)] px-3 py-1 text-[10px] tracking-[0.22em] text-[color:var(--text-1)] hover:border-[color:var(--border-accent)]"
                      onClick={() => setOptionsOpen((v) => !v)}
                    >
                      {optionsOpen ? "CLOSE" : "OPTIONS"}
                    </button>
                  ) : null}
                </div>
              </div>

              {selectedMarker && (selectedMarker.type === "event" || selectedMarker.type === "raidBoss") ? (
                <MarkerDetailContent
                  marker={selectedMarker}
                  detail={getMarkerDetail(selectedMarker.id)}
                  eventColor={eventColor}
                  raidColor={raidColor}
                />
              ) : null}

              {activeRaidBoss && (!selectedMarker || selectedMarker.id !== activeRaidBoss.id) ? (
                <div className="mt-4 rounded-2xl border border-[color:color-mix(in_oklab,rgba(239,68,68,1)_38%,var(--border-subtle))] bg-[color:color-mix(in_oklab,var(--bg-0)_72%,transparent)] px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{
                            background: raidColor,
                            boxShadow: "0 0 0 6px rgba(239,68,68,0.18)",
                          }}
                        />
                        <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                          RAID BOSS ACTIVE
                        </div>
                      </div>
                      <div className="ember-display mt-2 text-balance text-xl text-[color:var(--text-0)]">
                        {activeRaidBoss.name}
                      </div>
                      <div className="mt-2 text-sm text-[color:var(--text-1)]">
                        A raid-scale target is live right now. Expect third parties.
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-[color:color-mix(in_oklab,rgba(239,68,68,1)_40%,var(--border-subtle))] bg-[color:rgba(239,68,68,0.12)] px-3 py-1 text-[10px] tracking-[0.22em] text-[color:var(--text-1)]">
                      HOT
                    </span>
                  </div>
                </div>
              ) : null}

              {(!selectedMarker || (selectedMarker.type !== "event" && selectedMarker.type !== "raidBoss")) ? (
                <div className="mt-4 flex-1 overflow-y-auto pr-1">
                <div className="space-y-3 text-sm text-[color:var(--text-1)]">
                  <LayerToggle
                    label="Harvest nodes"
                    swatch={harvestColor}
                    checked={layers.harvest}
                    onChange={(v) => setLayers((s) => ({ ...s, harvest: v }))}
                  />
                  <LayerToggle
                    label="Event spawns"
                    swatch={eventColor}
                    checked={layers.event}
                    onChange={(v) => setLayers((s) => ({ ...s, event: v }))}
                  />
                  <LayerToggle
                    label="Raid boss"
                    swatch={raidColor}
                    checked={layers.raidBoss}
                    onChange={(v) => setLayers((s) => ({ ...s, raidBoss: v }))}
                  />
                  <LayerToggle
                    label="Player bases"
                    swatch={hsl(tuning.base.hue, 40, 55, 0.9)}
                    checked={layers.base}
                    onChange={(v) => setLayers((s) => ({ ...s, base: v }))}
                    square
                  />
                </div>

                {optionsOpen ? (
                  <>
                    <OrnamentDivider className="mt-5 opacity-70" />

                    <div className="mt-4 grid gap-2">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={saveAsDefaults}
                          className="rounded-full border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_40%,transparent)] px-3 py-1 text-[10px] tracking-[0.22em] text-[color:var(--text-1)] hover:border-[color:var(--border-accent)]"
                        >
                          SAVE AS DEFAULTS
                        </button>
                        <button
                          type="button"
                          onClick={resetToDefaults}
                          className="rounded-full border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_30%,transparent)] px-3 py-1 text-[10px] tracking-[0.22em] text-[color:var(--text-1)] hover:border-[color:var(--border-accent)]"
                        >
                          RESET TO DEFAULTS
                        </button>
                        <button
                          type="button"
                          onClick={() => saveAsGlobalDefaults(false)}
                          className="rounded-full border border-[color:color-mix(in_oklab,var(--accent-gold)_40%,var(--border-subtle))] bg-[color:color-mix(in_oklab,var(--accent-gold)_10%,transparent)] px-3 py-1 text-[10px] tracking-[0.22em] text-[color:var(--text-1)] hover:border-[color:var(--border-accent)]"
                        >
                          SAVE AS GLOBAL
                        </button>
                        <button
                          type="button"
                          onClick={applyGlobalDefaults}
                          className="rounded-full border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_30%,transparent)] px-3 py-1 text-[10px] tracking-[0.22em] text-[color:var(--text-1)] hover:border-[color:var(--border-accent)]"
                        >
                          APPLY GLOBAL
                        </button>
                        <button
                          type="button"
                          onClick={() => saveAsGlobalDefaults(true)}
                          className="rounded-full border border-[color:color-mix(in_oklab,var(--accent-arcane)_34%,var(--border-subtle))] bg-[color:color-mix(in_oklab,var(--accent-arcane)_14%,transparent)] px-3 py-1 text-[10px] tracking-[0.22em] text-[color:var(--text-1)] hover:border-[color:var(--border-accent)]"
                        >
                          APPLY TO ALL ZONES
                        </button>
                      </div>
                      <div className="text-[10px] leading-relaxed text-[color:var(--text-2)]">
                        Defaults apply when you clear settings or reset. Global defaults can seed new zones.
                      </div>
                      {lastStorageAction ? (
                        <div className="mt-2 text-[10px] leading-relaxed text-[color:color-mix(in_oklab,var(--accent-gold)_70%,var(--text-2))]">
                          {lastStorageAction}
                        </div>
                      ) : null}

                      <details className="mt-3 rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_22%,transparent)] px-3 py-3">
                        <summary className="cursor-pointer list-none select-none">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)]">
                              STORAGE DEBUG
                            </div>
                            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)]">
                              {props.zoneId.toUpperCase()}
                            </div>
                          </div>
                        </summary>
                        <StorageDebug
                          zoneId={props.zoneId}
                          keys={{
                            zoneSettings: ZONE_SETTINGS_KEY,
                            zoneDefaults: DEFAULT_KEY,
                            globalSettings: GLOBAL_SETTINGS_KEY,
                            globalDefaults: GLOBAL_DEFAULT_KEY,
                          }}
                          tick={storageDebugTick}
                        />
                      </details>
                    </div>

                    <div className="mt-4 grid gap-3">
                      <details className="group rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_28%,transparent)] px-3 py-3">
                        <summary className="cursor-pointer list-none select-none">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                              HARVEST NODES
                            </div>
                            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)] group-open:hidden">
                              EXPAND
                            </div>
                            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)] hidden group-open:block">
                              COLLAPSE
                            </div>
                          </div>
                        </summary>
                        <div className="mt-3">
                          <NodeOptionsSection
                            title="Harvest nodes"
                            hue={tuning.harvest.hue}
                            nodeSize={tuning.harvest.nodeSize}
                            nodeRadius={tuning.harvest.nodeRadius}
                            outerEnabled={tuning.harvest.outerEnabled}
                            onChange={(next) =>
                              setTuning((s) => ({ ...s, harvest: { ...s.harvest, ...next } }))
                            }
                          />
                        </div>
                      </details>

                      <details open className="group rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_28%,transparent)] px-3 py-3">
                        <summary className="cursor-pointer list-none select-none">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                              EVENT SPAWNS
                            </div>
                            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)] group-open:hidden">
                              EXPAND
                            </div>
                            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)] hidden group-open:block">
                              COLLAPSE
                            </div>
                          </div>
                        </summary>
                        <div className="mt-3">
                          <NodeOptionsSection
                            title="Event spawns"
                            hue={tuning.event.hue}
                            nodeSize={tuning.event.nodeSize}
                            nodeRadius={tuning.event.nodeRadius}
                            zoneRadius={tuning.event.zoneRadius}
                            areaOpacity={tuning.event.areaOpacity}
                            outerEnabled={tuning.event.outerEnabled}
                            showNodeRadius={false}
                            onChange={(next) =>
                              setTuning((s) => ({ ...s, event: { ...s.event, ...next } }))
                            }
                          />
                        </div>
                      </details>

                      <details open className="group rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_28%,transparent)] px-3 py-3">
                        <summary className="cursor-pointer list-none select-none">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                              RAID BOSS
                            </div>
                            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)] group-open:hidden">
                              EXPAND
                            </div>
                            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)] hidden group-open:block">
                              COLLAPSE
                            </div>
                          </div>
                        </summary>
                        <div className="mt-3">
                          <NodeOptionsSection
                            title="Raid boss"
                            hue={tuning.raidBoss.hue}
                            nodeSize={tuning.raidBoss.nodeSize}
                            nodeRadius={tuning.raidBoss.nodeRadius}
                            zoneRadius={tuning.raidBoss.zoneRadius}
                            areaOpacity={tuning.raidBoss.areaOpacity}
                            outerEnabled={tuning.raidBoss.outerEnabled}
                            showNodeRadius={false}
                            onChange={(next) =>
                              setTuning((s) => ({ ...s, raidBoss: { ...s.raidBoss, ...next } }))
                            }
                          />
                        </div>
                      </details>

                      <details className="group rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_28%,transparent)] px-3 py-3">
                        <summary className="cursor-pointer list-none select-none">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                              PLAYER BASES
                            </div>
                            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)] group-open:hidden">
                              EXPAND
                            </div>
                            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)] hidden group-open:block">
                              COLLAPSE
                            </div>
                          </div>
                        </summary>
                        <div className="mt-3">
                          <BaseOptionsSection
                            title="Player bases"
                            hue={tuning.base.hue}
                            size={tuning.base.size}
                            radius={tuning.base.radius}
                            onChange={(next) =>
                              setTuning((s) => ({ ...s, base: { ...s.base, ...next } }))
                            }
                          />
                        </div>
                      </details>

                      <details open className="group rounded-xl border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_28%,transparent)] px-3 py-3">
                        <summary className="cursor-pointer list-none select-none">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
                              MAP
                            </div>
                            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)] group-open:hidden">
                              EXPAND
                            </div>
                            <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)] hidden group-open:block">
                              COLLAPSE
                            </div>
                          </div>
                        </summary>
                        <div className="mt-3 grid gap-3">
                          <SliderRow
                            label="Opacity"
                            value={mapOpacity}
                            min={0.4}
                            max={1}
                            step={0.02}
                            display={`${Math.round(mapOpacity * 100)}%`}
                            onChange={setMapOpacity}
                          />
                          <SliderRow
                            label="Zoom"
                            value={mapScale}
                            min={ZOOM_MIN}
                            max={ZOOM_MAX}
                            step={0.05}
                            display={`${Math.round(mapScale * 100)}%`}
                            onChange={(v) => setMapScale(clamp(v, ZOOM_MIN, ZOOM_MAX))}
                          />
                        </div>
                      </details>
                    </div>
                  </>
                ) : null}
                </div>
              ) : null}
            </div>
          </aside>
        </div>

        <style>{`
          .areaPulse {
            pointer-events: none;
            animation: emberAreaPulse 1.8s ease-out infinite;
            opacity: 0.95;
            will-change: transform, opacity;
          }
          @keyframes emberAreaPulse {
            0% {
              transform: scale(0.02);
              opacity: 0.9;
            }
            70% {
              opacity: 0.15;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
          .markerPulse {
            pointer-events: none;
            animation: emberMarkerPulse 2.5s ease-out infinite;
            will-change: transform, opacity;
          }
          @keyframes emberMarkerPulse {
            0% {
              transform: scale(1);
              opacity: 0.5;
            }
            100% {
              transform: scale(2.2);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function LayerToggle(props: {
  label: string;
  swatch: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  square?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_40%,transparent)] px-3 py-2">
      <span className="flex items-center gap-2">
        <span
          className={[
            "h-2.5 w-2.5 shadow-[0_0_0_4px_rgba(0,0,0,0.0)]",
            props.square ? "rounded-[3px] border border-[color:var(--border-subtle)]" : "rounded-full",
          ].join(" ")}
          style={{
            background: props.swatch,
            boxShadow: props.square ? undefined : `0 0 0 4px ${props.swatch.replace("hsla", "hsla").replace("/ 1)", "/ 0.18)")}`,
          }}
        />
        {props.label}
      </span>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
        className="h-4 w-4 accent-[color:var(--text-1)]"
      />
    </label>
  );
}

function NodeOptionsSection(props: {
  title: string;
  hue: number;
  nodeSize: number;
  nodeRadius: number;
  zoneRadius?: number;
  areaOpacity?: number;
  outerEnabled: boolean;
  showNodeRadius?: boolean;
  onChange: (
    next: Partial<NodeLayerTuning> &
      Partial<Pick<ZoneLayerTuning, "zoneRadius" | "areaOpacity">>,
  ) => void;
}) {
  const hasArea = typeof props.zoneRadius === "number";
  const showNodeRadius = props.showNodeRadius ?? true;
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
          {props.title.toUpperCase()}
        </div>
        <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)]">
          H {Math.round(props.hue)} • N {Math.round(props.nodeSize * 100)}%
          {showNodeRadius ? ` • R ${Math.round(props.nodeRadius * 100)}%` : ""}
          {hasArea ? ` • A ${Math.round((props.zoneRadius ?? 0) * 100)}%` : ""}
        </div>
      </div>
      <div className="mt-3 grid gap-3">
        <label className="flex cursor-pointer items-center justify-between rounded-lg border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_28%,transparent)] px-3 py-2">
          <span className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
            {hasArea ? "AREA (FILL + PULSE)" : "OUTER RING"}
          </span>
          <input
            type="checkbox"
            checked={props.outerEnabled}
            onChange={(e) => props.onChange({ outerEnabled: e.target.checked })}
            className="h-4 w-4 accent-[color:var(--accent-gold)]"
          />
        </label>
        <SliderRow
          label="Color"
          value={props.hue}
          min={0}
          max={360}
          step={1}
          display={`${Math.round(props.hue)}°`}
          onChange={(v) => props.onChange({ hue: v })}
        />
        <SliderRow
          label="Node size"
          value={props.nodeSize}
          min={0.6}
          max={2.4}
          step={0.05}
          display={`${Math.round(props.nodeSize * 100)}%`}
          onChange={(v) => props.onChange({ nodeSize: v })}
        />
        {showNodeRadius ? (
          <SliderRow
            label="Node radius"
            value={props.nodeRadius}
            min={0.6}
            max={2.4}
            step={0.05}
            display={`${Math.round(props.nodeRadius * 100)}%`}
            onChange={(v) => props.onChange({ nodeRadius: v })}
          />
        ) : null}
        {hasArea ? (
          <SliderRow
            label="Area radius"
            value={props.zoneRadius ?? 1}
            min={0.05}
            max={2}
            step={0.05}
            display={`${Math.round((props.zoneRadius ?? 1) * 100)}%`}
            onChange={(v) => props.onChange({ zoneRadius: v })}
          />
        ) : null}
        {hasArea ? (
          <SliderRow
            label="Area opacity"
            value={props.areaOpacity ?? 0.14}
            min={0}
            max={0.8}
            step={0.01}
            display={`${Math.round((props.areaOpacity ?? 0.14) * 100)}%`}
            onChange={(v) => props.onChange({ areaOpacity: v })}
          />
        ) : null}
      </div>
    </div>
  );
}

function BaseOptionsSection(props: {
  title: string;
  hue: number;
  size: number;
  radius: number;
  onChange: (next: Partial<BaseLayerTuning>) => void;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
          {props.title.toUpperCase()}
        </div>
        <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)]">
          H {Math.round(props.hue)} • S {Math.round(props.size * 100)}% • C{" "}
          {Math.round(props.radius * 100)}%
        </div>
      </div>
      <div className="mt-3 grid gap-3">
        <SliderRow
          label="Color"
          value={props.hue}
          min={0}
          max={360}
          step={1}
          display={`${Math.round(props.hue)}°`}
          onChange={(v) => props.onChange({ hue: v })}
        />
        <SliderRow
          label="Footprint size"
          value={props.size}
          min={0.6}
          max={2.4}
          step={0.05}
          display={`${Math.round(props.size * 100)}%`}
          onChange={(v) => props.onChange({ size: v })}
        />
        <SliderRow
          label="Corner radius"
          value={props.radius}
          min={0.6}
          max={2.4}
          step={0.05}
          display={`${Math.round(props.radius * 100)}%`}
          onChange={(v) => props.onChange({ radius: v })}
        />
      </div>
    </div>
  );
}

function SliderRow(props: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">{props.label.toUpperCase()}</div>
        <div className="text-[10px] tracking-[0.22em] text-[color:var(--text-2)]">{props.display}</div>
      </div>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="h-2 w-full accent-[color:var(--accent-gold)]"
      />
    </div>
  );
}

function StorageDebug(props: {
  zoneId: string;
  keys: {
    zoneSettings: string;
    zoneDefaults: string;
    globalSettings: string;
    globalDefaults: string;
  };
  tick: number;
}) {
  const [snapshot, setSnapshot] = useState<Record<string, string | null>>({});
  const [origin, setOrigin] = useState<string>("");
  const [href, setHref] = useState<string>("");

  useEffect(() => {
    try {
      setOrigin(window.location.origin);
      setHref(window.location.href);
      setSnapshot({
        [props.keys.zoneSettings]: localStorage.getItem(props.keys.zoneSettings),
        [props.keys.zoneDefaults]: localStorage.getItem(props.keys.zoneDefaults),
        [props.keys.globalSettings]: localStorage.getItem(props.keys.globalSettings),
        [props.keys.globalDefaults]: localStorage.getItem(props.keys.globalDefaults),
      });
    } catch {
      setSnapshot({});
    }
  }, [props.tick, props.keys.globalDefaults, props.keys.globalSettings, props.keys.zoneDefaults, props.keys.zoneSettings]);

  const rows = Object.entries(snapshot);

  return (
    <div className="mt-3 grid gap-2 text-[10px] leading-relaxed text-[color:var(--text-2)]">
      <div className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_35%,transparent)] px-2 py-2">
        <div className="font-semibold text-[color:var(--text-1)]">Origin</div>
        <div className="mt-1 break-all">{origin || "(unknown)"}</div>
        <div className="mt-2 font-semibold text-[color:var(--text-1)]">URL</div>
        <div className="mt-1 break-all">{href || "(unknown)"}</div>
      </div>
      {rows.length === 0 ? (
        <div>Unable to read localStorage.</div>
      ) : (
        rows.map(([k, v]) => (
          <div key={k} className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-0)_35%,transparent)] px-2 py-2">
            <div className="break-all font-semibold text-[color:var(--text-1)]">{k}</div>
            <div className="mt-1">
              {v ? (
                <span className="text-[color:var(--text-1)]">present</span>
              ) : (
                <span className="text-[color:var(--text-2)]">missing</span>
              )}
            </div>
            {v ? (
              <details className="mt-2">
                <summary className="cursor-pointer select-none text-[10px] tracking-[0.22em] text-[color:var(--text-2)]">
                  SHOW JSON
                </summary>
                <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap break-words rounded-md border border-[color:var(--border-subtle)] bg-black/20 p-2 text-[10px] text-[color:var(--text-1)]">
                  {v}
                </pre>
              </details>
            ) : null}
          </div>
        ))
      )}
      <div className="text-[10px] text-[color:var(--text-2)]">
        Tip: if these keys are “missing” after clicking, you’re either on the wrong origin, the click handler isn’t firing, or storage is blocked.
      </div>
    </div>
  );
}

const RARITY_STYLES: Record<
  RewardRarity,
  { border: string; bg: string; text: string; iconBg: string }
> = {
  common: {
    border: "border-[#6b7280]",
    bg: "bg-[color:color-mix(in_oklab,#9d9d9d_18%,transparent)]",
    text: "text-[#9d9d9d]",
    iconBg: "bg-[#6b7280]",
  },
  uncommon: {
    border: "border-[#16a34a]",
    bg: "bg-[color:color-mix(in_oklab,#1eff00_12%,transparent)]",
    text: "text-[#1eff00]",
    iconBg: "bg-[#16a34a]",
  },
  rare: {
    border: "border-[#0070dd]",
    bg: "bg-[color:color-mix(in_oklab,#0070dd_14%,transparent)]",
    text: "text-[#70b8ff]",
    iconBg: "bg-[#0070dd]",
  },
  epic: {
    border: "border-[#a335ee]",
    bg: "bg-[color:color-mix(in_oklab,#a335ee_14%,transparent)]",
    text: "text-[#c77dff]",
    iconBg: "bg-[#a335ee]",
  },
  legendary: {
    border: "border-[#ff8000]",
    bg: "bg-[color:color-mix(in_oklab,#ff8000_12%,transparent)]",
    text: "text-[#ff8000]",
    iconBg: "bg-[#ff8000]",
  },
};

function RewardItemRow(props: {
  name: string;
  rarity: RewardRarity;
  icon?: string;
}) {
  const style = RARITY_STYLES[props.rarity];
  return (
    <li
      className={`flex items-center gap-3 rounded border-2 ${style.border} ${style.bg} px-2 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.2)_inset]`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[color:color-mix(in_oklab,var(--bg-0)_40%,transparent)] ${style.iconBg} text-lg font-bold text-black/90`}
        aria-hidden
      >
        {props.icon ? (
          <img src={props.icon} alt="" className="h-full w-full rounded object-cover" />
        ) : (
          <span className="select-none">{props.name.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <span className={`min-w-0 flex-1 truncate text-sm font-medium ${style.text}`}>
        {props.name}
      </span>
    </li>
  );
}

function MarkerDetailContent(props: {
  marker: MapMarker;
  detail: ReturnType<typeof getMarkerDetail>;
  eventColor: string;
  raidColor: string;
}) {
  const { marker, detail } = props;
  const isBoss = marker.type === "raidBoss";

  return (
    <div className="mt-6 flex-1 overflow-y-auto pr-1">
      {detail ? (
        <div className="space-y-5 text-sm">
          {/* One-line meta: difficulty · duration · category (omit Extreme + Stronghold boss) */}
          <div className="flex flex-wrap gap-2">
            {detail.difficulty && detail.difficulty !== "Extreme" ? (
              <span className="rounded-full border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_50%,transparent)] px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-[color:var(--text-1)]">
                {detail.difficulty}
              </span>
            ) : null}
            {detail.duration ? (
              <span className="rounded-full border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_50%,transparent)] px-2.5 py-0.5 text-[10px] tracking-wide text-[color:var(--text-2)]">
                {detail.duration}
              </span>
            ) : null}
            {detail.category && detail.category !== "Stronghold boss" ? (
              <span className="rounded-full border border-[color:var(--border-subtle)] bg-[color:color-mix(in_oklab,var(--bg-1)_50%,transparent)] px-2.5 py-0.5 text-[10px] tracking-wide text-[color:var(--text-2)]">
                {detail.category}
              </span>
            ) : null}
          </div>

          <p className="text-base leading-relaxed text-[color:var(--text-0)]">{detail.description}</p>

          {detail.rewards && detail.rewards.length > 0 ? (
            <div className="space-y-2">
              <div className="mb-2 text-[10px] font-medium tracking-[0.2em] text-[color:var(--text-2)]">
                REWARDS
              </div>
              <ul className="flex flex-col gap-1.5">
                {detail.rewards.map((r, i) => {
                  const { name, rarity } = normalizeReward(r);
                  return (
                    <RewardItemRow key={i} name={name} rarity={rarity} icon={typeof r !== "string" ? r.icon : undefined} />
                  );
                })}
              </ul>
            </div>
          ) : null}

          {detail.lore ? (
            <p className="border-l-2 border-[color:var(--border-subtle)] pl-3 text-xs italic leading-snug text-[color:var(--text-2)]">
              {detail.lore}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-[color:var(--text-1)]">
          {marker.detail ?? "No additional detail available."}
        </p>
      )}
    </div>
  );
}

function MarkerButton(props: {
  marker: MapMarker;
  colors: { harvest: string; event: string; raidBoss: string };
  nodeInnerPx: { harvest: number; event: number; raidBoss: number };
  nodeOuterRadiusPx: { harvest: number; event: number; raidBoss: number };
  nodeOuterEnabled: { harvest: boolean; event: boolean; raidBoss: boolean };
  isSelected?: boolean;
  onSelect?: () => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: () => void;
  editMode?: boolean;
  isDragging?: boolean;
  onDragStart?: (e: React.MouseEvent) => void;
}) {
  const m = props.marker;
  const isHarvest = m.type === "harvest";
  const isEvent = m.type === "event";
  const isRaidBoss = m.type === "raidBoss";
  const isBoss = isRaidBoss;
  const isRaidActive = isRaidBoss && m.status === "active";

  const outerRadius = isHarvest
    ? props.nodeOuterRadiusPx.harvest
    : isEvent
      ? props.nodeOuterRadiusPx.event
      : props.nodeOuterRadiusPx.raidBoss;
  // Boss uses a large skull icon, so give it a bigger hit area
  const outerDiameter =
    isRaidBoss ? 72 : Math.max(outerRadius * 2, 22);
  const dotSize = isHarvest
    ? props.nodeInnerPx.harvest
    : isEvent
      ? Math.max(props.nodeInnerPx.event, 18)
      : Math.max(props.nodeInnerPx.raidBoss, 20);
  const color = isHarvest ? props.colors.harvest : isEvent ? props.colors.event : props.colors.raidBoss;
  const outerAlpha = 0.18;
  const outerEnabled = isHarvest
    ? props.nodeOuterEnabled.harvest
    : isEvent
      ? props.nodeOuterEnabled.event
      : props.nodeOuterEnabled.raidBoss;

  const handleClick = () => {
    if (props.onSelect) props.onSelect();
  };

  return (
    <div
      className="marker group absolute"
      data-type={m.type}
      style={{ left: `${m.x}%`, top: `${m.y}%` }}
    >
      <button
        type="button"
        onClick={handleClick}
        onMouseDown={(e) => {
          e.stopPropagation();
          if (props.editMode && (isEvent || isHarvest || isRaidBoss) && props.onDragStart) {
            props.onDragStart(e);
          }
        }}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        className={`relative grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-transform focus-visible:outline-none ${
          props.editMode && (isEvent || isHarvest || isRaidBoss)
            ? "cursor-move"
            : props.onSelect
              ? "cursor-pointer hover:scale-105 focus-visible:scale-105"
              : ""
        } ${props.isDragging ? "opacity-75" : ""}`}
        style={{
          width: outerDiameter,
          height: outerDiameter,
          ...(isRaidBoss ? { overflow: "visible" } : {}),
          ...(props.isSelected
            ? { boxShadow: `0 0 0 4px ${color}, 0 0 0 6px rgba(0,0,0,0.35)` }
            : {}),
          ...(props.editMode && (isEvent || isHarvest || isRaidBoss) && !props.isDragging
            ? { boxShadow: `0 0 0 2px ${color}, 0 0 0 4px rgba(0,0,0,0.2)` }
            : {}),
        }}
        aria-label={`${m.type === "harvest" ? "Harvest node" : m.type === "event" ? "Event spawn" : "Raid boss"}: ${m.name}${props.onSelect ? "; click for details" : ""}${props.editMode && (isEvent || isHarvest || isRaidBoss) ? "; drag to move" : ""}`}
      >
        {/* Single subtle pulse ring for events only (boss uses skull) */}
        {isEvent ? (
          <span
            className="markerPulse absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${color.replace("/ 1)", "/ 0.5)")}`,
            }}
            aria-hidden="true"
          />
        ) : null}

        {/* Outer ring for harvest nodes */}
        {isHarvest && outerEnabled ? (
          <span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background: color.replace("/ 1)", `/ ${outerAlpha})`),
              border: `2px solid ${color.replace("/ 1)", `/ ${outerAlpha})`)}`,
              boxShadow:
                "0 0 0 1px rgba(0,0,0,0.28) inset, 0 10px 24px rgba(0,0,0,0.28)",
            }}
            aria-hidden="true"
          />
        ) : null}

        {/* Raid boss: 128px icon, small hit area (icon has pointer-events: none so only the button triggers hover) */}
        {isRaidBoss ? (
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] shrink-0"
            style={{ width: 128, height: 128 }}
            aria-hidden="true"
          >
            <BossIconImg size={128} />
          </span>
        ) : (
          /* Core dot - for harvest and events */
          <span
            className="relative block rounded-full"
            style={{
              width: dotSize,
              height: dotSize,
              background: color,
              border: isEvent ? `3px solid ${color}` : "none",
              boxShadow: `0 0 0 1px rgba(0,0,0,0.4) inset${isEvent ? `, 0 2px 8px rgba(0,0,0,0.3)` : ""}`,
            }}
          >
            {isEvent ? (
              <span
                className="absolute inset-0 flex items-center justify-center text-[10px] font-bold leading-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                aria-hidden="true"
              >
                {getMarkerIcon(m)}
              </span>
            ) : null}
          </span>
        )}
      </button>
    </div>
  );
}

