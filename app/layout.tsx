import type React from "react";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/components/providers/session-provider";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Gestión - Cuartel de Bomberos",
  description:
    "Sistema integral para la administración de equipos y recursos del cuartel de bomberos",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <body className={archivo.className}>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  );
}