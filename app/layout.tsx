import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"
import ConvexClerkProvider from "@/providers/convex-clerk-provider";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <ConvexClerkProvider>
          {children}
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
