import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css"
import ConvexClerkProvider from "@/providers/convex-clerk-provider";
import AudioProvider from "@/providers/audio-provider";

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Podcast-r",
  description: "Generate Podcasts with AI",
  icons: {
    icon: '/logo/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <AudioProvider>
          <body className={`${manrope.className} md:overflow-hidden`}>
            {children}
          </body>
        </AudioProvider>
      </html>
    </ConvexClerkProvider>
  );
}
