import Link from "next/link";
import { Hero } from "@/components/site/Hero";

export default function Home() {
  const heroVideoSrc = encodeURI(
    "/assets/Videos/The Siege of Lordaeron Has Begun - World of Warcraft (1080p, h264, youtube).mp4"
  );

  return (
    <div className="h-full min-h-0 overflow-hidden">
      <Hero
        eyebrow="Survival Action RPG"
        title="Become a hero in a vast, haunted frontier."
        subtitle="Deep builds, world‑raid bosses, and long, scary journeys across a continent that never quite feels small."
        background="world"
        backgroundVideoSrc={heroVideoSrc}
        variant="home"
        titleSize="brand"
        showDivider={false}
        align="center"
        fillViewport
      >
        <div className="mt-6 text-center sm:mt-8">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="ember-button-cta inline-flex items-center justify-center rounded-xl px-8 py-5 text-center text-lg font-extrabold tracking-[0.18em] opacity-60 cursor-not-allowed sm:px-10 sm:py-6 sm:text-xl"
            >
              PLAYTESTS CLOSED
            </button>
            <Link
              href="/game"
              className="ember-button-secondary inline-flex items-center justify-center rounded-xl px-7 py-5 text-center text-base font-extrabold tracking-[0.14em] text-[color:var(--text-0)] hover:text-[color:var(--text-0)] sm:px-9 sm:py-6 sm:text-lg"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </Hero>
    </div>
  );
}
