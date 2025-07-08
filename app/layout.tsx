import type React from "react"
import type { Metadata } from "next"
import { Archivo } from "next/font/google"
import "./globals.css"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Header } from "@/components/layout/header"

const archivo = Archivo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Sistema de Gestión - Cuartel de Bomberos",
  description: "Sistema integral para la administración de equipos y recursos del cuartel de bomberos",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <body className={archivo.className}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="flex h-screen flex-col">
              <Header />
              <div className="flex-1 flex flex-col overflow-hidden bg-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-5">
                  {children}
                </main>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}