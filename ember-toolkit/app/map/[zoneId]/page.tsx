import { notFound } from "next/navigation";
import { ZoneMapCanvas } from "@/components/site/ZoneMapCanvas";
import { isZoneMapId, ZONE_MAP_IDS } from "@/lib/zoneMaps";

export function generateStaticParams() {
  return ZONE_MAP_IDS.map((zoneId) => ({ zoneId }));
}

export default async function ZoneMapPage({
  params,
}: {
  params: Promise<{ zoneId: string }>;
}) {
  const { zoneId } = await params;
  if (!isZoneMapId(zoneId)) notFound();

  return (
    <div>
      <ZoneMapCanvas zoneId={zoneId} />
    </div>
  );
}

