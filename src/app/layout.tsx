import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = { title: "HECHO EN IBARRA | Emprendimientos locales", description: "Descubre y apoya emprendimientos, productos, promociones y eventos de Ibarra." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es" className={`${dmSans.variable} h-full antialiased`}><body className="min-h-full flex flex-col">{children}</body></html>; }
