import type { Metadata } from "next";
import { Manrope, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// Company homepage: eyebrows + micro labels (measured from the Figma).
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jbmono",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OneStop AI — One companion. Every decision.",
    template: "%s · OneStop AI",
  },
  description:
    "OneStop AI builds AI companions for the decisions you carry, and they answer only to you. The first, Jarvis, is live for money.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://onestop.com",
  ),
  openGraph: {
    siteName: "OneStop AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${jetbrains.variable} ${sora.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        {/* Without JS, reveal elements would stay hidden — restore them. */}
        <noscript>
          <style>{`[data-reveal],[data-r],[data-h],[data-v],[data-j],[data-rule]{opacity:1 !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
