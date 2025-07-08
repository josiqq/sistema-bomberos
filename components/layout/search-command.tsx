"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  LayoutDashboard,
  Package,
  Wrench,
  Users,
  Activity,
  SearchCheck,
  BarChart3,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

// Datos de navegación que podrían ser compartidos o importados
const navItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Inventario", url: "/inventory", icon: Package },
    { title: "Mantenimiento", url: "/maintenance", icon: Wrench },
    { title: "Asignaciones", url: "/assignments", icon: Users },
    { title: "Control de Estados", url: "/states", icon: Activity },
    { title: "Inspecciones", url: "/inspections", icon: SearchCheck },
    { title: "Reportes", url: "/reports", icon: BarChart3 },
    { title: "Configuración", url: "/settings", icon: Settings },
]

export function SearchCommand() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (url: string) => {
    setOpen(false)
    // Redirige a la URL cuando se selecciona un item
    window.location.href = url
  }

  return (
    <>
      <Button
        variant="default"
        className="h-9 w-9 p-0 md:h-10 md:w-60 md:justify-between md:px-3 md:py-2"
        onClick={() => setOpen(true)}
      >
        <SearchCheck className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline-flex">Buscar...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Escribe un comando o busca..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Sugerencias">
            {navItems.map((item) => (
                <CommandItem
                    key={item.url}
                    onSelect={() => handleSelect(item.url)}
                    className="cursor-pointer"
                >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Ajustes">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Facturación</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}