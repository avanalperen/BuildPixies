import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import { SessionBootstrap } from "@/components/auth/session-bootstrap";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-source",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend-source",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuildPixies — Turn messy ideas into build-ready MVPs",
  description:
    "BuildPixies gives you a tiny AI product team that transforms your rough idea into a product brief, UX flow, backlog, tech plan and launch-ready documentation.",
  keywords: [
    "AI product planning",
    "MVP builder",
    "AI agents",
    "product blueprint",
    "solo founder",
    "bootcamp",
  ],
  authors: [{ name: "BuildPixies" }],
  openGraph: {
    title: "BuildPixies — Turn messy ideas into build-ready MVPs",
    description:
      "A tiny AI product team that turns your rough idea into a structured MVP blueprint.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lexend.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SessionBootstrap />
        {children}
      </body>
    </html>
  );
}
