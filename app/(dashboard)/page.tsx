"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Clock, XCircle, Plus, Calendar, BarChart3, Users } from "lucide-react"
import { equipmentData, maintenanceData } from "@/lib/data"

export default function Dashboard() {

  // Calculate metrics
  const totalEquipment = equipmentData.length
  const operationalEquipment = equipmentData.filter((eq) => eq.status === "Operativo").length
  const inMaintenanceEquipment = equipmentData.filter((eq) => eq.status === "En mantenimiento").length
  const outOfServiceEquipment = equipmentData.filter((eq) => eq.status === "Fuera de servicio").length
  const overdueMaintenances = maintenanceData.filter(
    (m) => new Date(m.scheduledDate) < new Date() && m.status === "Pendiente",
  ).length

  const operationalPercentage = (operationalEquipment / totalEquipment) * 100

  return (

          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Control</h1>
              <p className="text-gray-600">Resumen general del estado de equipos</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Equipos Operativos</CardTitle>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{operationalEquipment}</div>
                  <p className="text-xs text-gray-500">{operationalPercentage.toFixed(1)}% del total</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">En Mantenimiento</CardTitle>
                  <Clock className="h-5 w-5 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{inMaintenanceEquipment}</div>
                  <p className="text-xs text-gray-500">Programados y en proceso</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Fuera de Servicio</CardTitle>
                  <XCircle className="h-5 w-5 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{outOfServiceEquipment}</div>
                  <p className="text-xs text-gray-500">Requieren atención inmediata</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Mantenimientos Vencidos</CardTitle>
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{overdueMaintenances}</div>
                  <p className="text-xs text-gray-500">Requieren programación urgente</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Equipment Status Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Estado de Equipos
                  </CardTitle>
                  <CardDescription>Distribución actual del estado de todos los equipos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Operativo</span>
                      </div>
                      <span className="text-sm font-medium">{operationalEquipment}</span>
                    </div>
                    <Progress value={operationalPercentage} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">En mantenimiento</span>
                      </div>
                      <span className="text-sm font-medium">{inMaintenanceEquipment}</span>
                    </div>
                    <Progress value={(inMaintenanceEquipment / totalEquipment) * 100} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Fuera de servicio</span>
                      </div>
                      <span className="text-sm font-medium">{outOfServiceEquipment}</span>
                    </div>
                    <Progress value={(outOfServiceEquipment / totalEquipment) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                  <CardDescription>Accesos directos a funciones principales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Equipo
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="neutral" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Programar Mantenimiento
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="neutral" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Asignar Equipos
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="neutral" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Ver Reportes
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Alerts Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Alertas Críticas
                </CardTitle>
                <CardDescription>Equipos que requieren atención inmediata</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {equipmentData
                    .filter((eq) => eq.status === "Fuera de servicio")
                    .map((equipment) => (
                      <div
                        key={equipment.id}
                        className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <XCircle className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium text-red-900">{equipment.name}</p>
                            <p className="text-sm text-red-700">Código: {equipment.id}</p>
                          </div>
                        </div>
                        <Badge variant="destructive">Fuera de servicio</Badge>
                      </div>
                    ))}

                  {maintenanceData
                    .filter((m) => new Date(m.scheduledDate) < new Date() && m.status === "Pendiente")
                    .map((maintenance) => (
                      <div
                        key={maintenance.id}
                        className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-yellow-600" />
                          <div>
                            <p className="font-medium text-yellow-900">Mantenimiento vencido</p>
                            <p className="text-sm text-yellow-700">
                              {equipmentData.find((eq) => eq.id === maintenance.equipmentId)?.name} - Vencido:{" "}
                              {new Date(maintenance.scheduledDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                          Vencido
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

  )
}
