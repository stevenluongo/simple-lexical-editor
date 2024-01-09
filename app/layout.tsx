import { Nunito, Space_Grotesk, Syne } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

// initialize fonts from "next/font";
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Next.js Lexical Playground",
  description: "A playground for the Lexical Editor, built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${syne.variable} ${grotesk.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
