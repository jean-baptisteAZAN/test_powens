import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {AppBarMain} from "@/components/AppBarMain";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ezBanking",
  description: "ezBanking est une plateforme d'analyse de vos dépenses récurrentes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} data-theme="rose">
        <AppBarMain/>
        {children}
      </body>
    </html>
  );
}
