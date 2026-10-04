import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Siti Web per Attività di Messina | Studio Strada",
  description:
    "Realizzo siti web veloci e su misura per attività e professionisti a Messina. Prenotazioni online, e-commerce, menu digitali. Prezzo fisso da 300 €, 100% di tua proprietà.",
  keywords: [
    "Siti web Messina",
    "Sviluppo siti web Messina",
    "Web design Messina",
    "Studio Strada",
    "sito web prenotazioni Messina",
    "siti per ristoranti Messina",
    "siti per parrucchieri Messina",
    "e-commerce Messina",
  ],
  authors: [{ name: "Studio Strada — Messina" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body
        className={`${inter.variable} min-h-screen bg-[#FAFAFB] text-[#0A0D12] antialiased font-sans`}
        style={{ fontFamily: "var(--font-inter), -apple-system, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
