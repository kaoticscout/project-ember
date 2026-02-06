import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/site/Nav";

const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ember",
  description:
    "Ember is a multiplayer survival action RPG with WoW-inspired third-person combat, mounted exploration, hero progression, and a secondary homestead building layer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} antialiased`}
      >
        <div className="flex h-dvh flex-col overflow-hidden">
          <Nav />
          <main className="min-h-0 flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
