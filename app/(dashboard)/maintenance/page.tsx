"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Wrench, CalendarIcon, Clock, CheckCircle, AlertTriangle, Plus, User } from "lucide-react"
import { maintenanceData, equipmentData } from "@/lib/data"

const statusColors = {
  Pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "En proceso": "bg-blue-100 text-blue-800 border-blue-200",
  Completado: "bg-green-100 text-green-800 border-green-200",
}

const statusIcons = {
  Pendiente: <Clock className="h-4 w-4" />,
  "En proceso": <Wrench className="h-4 w-4" />,
  Completado: <CheckCircle className="h-4 w-4" />,
}

export default function MaintenancePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const upcomingMaintenances = maintenanceData.filter(
    (m) => new Date(m.scheduledDate) >= new Date() && m.status !== "Completado",
  )

  const overdueMaintenances = maintenanceData.filter(
    (m) => new Date(m.scheduledDate) < new Date() && m.status === "Pendiente",
  )

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Mantenimiento</h1>
            <p className="text-gray-600">Programación y seguimiento de mantenimientos</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Programar Mantenimiento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Summary Cards */}
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Mantenimientos Pendientes</CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {maintenanceData.filter((m) => m.status === "Pendiente").length}
            </div>
            <p className="text-xs text-gray-500">Requieren programación</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">En Proceso</CardTitle>
            <Wrench className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {maintenanceData.filter((m) => m.status === "En proceso").length}
            </div>
            <p className="text-xs text-gray-500">Actualmente en ejecución</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Vencidos</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueMaintenances.length}</div>
            <p className="text-xs text-gray-500">Requieren atención urgente</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendario
            </CardTitle>
            <CardDescription>Selecciona una fecha para ver mantenimientos</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Upcoming Maintenances */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Próximos Mantenimientos
            </CardTitle>
            <CardDescription>Mantenimientos programados para los próximos días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMaintenances.map((maintenance) => {
                const equipment = equipmentData.find((eq) => eq.id === maintenance.equipmentId)
                return (
                  <div key={maintenance.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Wrench className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{equipment?.name}</p>
                        <p className="text-sm text-gray-500">
                          {maintenance.type} - {new Date(maintenance.scheduledDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {maintenance.technician}
                        </p>
                      </div>
                    </div>
                    <Badge className={statusColors[maintenance.status]}>
                      <div className="flex items-center gap-1">
                        {statusIcons[maintenance.status]}
                        {maintenance.status}
                      </div>
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Maintenances */}
      {overdueMaintenances.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Mantenimientos Vencidos
            </CardTitle>
            <CardDescription>Estos mantenimientos requieren atención inmediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueMaintenances.map((maintenance) => {
                const equipment = equipmentData.find((eq) => eq.id === maintenance.equipmentId)
                const daysOverdue = Math.floor(
                  (new Date().getTime() - new Date(maintenance.scheduledDate).getTime()) / (1000 * 3600 * 24),
                )

                return (
                  <div
                    key={maintenance.id}
                    className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-red-900">{equipment?.name}</p>
                        <p className="text-sm text-red-700">
                          {maintenance.type} - Vencido hace {daysOverdue} días
                        </p>
                        <p className="text-xs text-red-600">{maintenance.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">Vencido</Badge>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Reprogramar
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
