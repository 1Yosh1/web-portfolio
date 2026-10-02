import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Studio Strada — Siti Web Che Lavorano Per La Tua Attività",
  description:
    "Realizziamo siti web veloci e su misura con prenotazioni online, e-commerce e presentazioni 3D. Pronti in 5–21 giorni, prezzi fissi da 300 €, 100% di tua proprietà.",
  keywords: [
    "Studio Strada",
    "sviluppo web",
    "sito web prenotazioni",
    "siti per piccole imprese",
    "e-commerce",
    "vetrina prodotti 3D",
    "sito ristorante",
    "sito parrucchiere",
  ],
  authors: [{ name: "Studio Strada" }],
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
