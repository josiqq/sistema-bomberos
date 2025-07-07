"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Package, Plus, ArrowRight, Calendar } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { assignmentData, equipmentData, firefightersData } from "@/lib/data"

export default function AssignmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getFirefighterAssignments = (firefighterId: string) => {
    return assignmentData
      .filter((assignment) => assignment.firefighterId === firefighterId)
      .map((assignment) => ({
        ...assignment,
        equipment: equipmentData.find((eq) => eq.id === assignment.equipmentId),
      }))
  }

  const unassignedEquipment = equipmentData.filter(
    (equipment) =>
      !assignmentData.some((assignment) => assignment.equipmentId === equipment.id) && equipment.status === "Operativo",
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Asignación de Equipos</h1>
                  <p className="text-gray-600">Gestión de equipos asignados al personal</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Asignación
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Personal Activo</CardTitle>
                  <Users className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{firefightersData.length}</div>
                  <p className="text-xs text-gray-500">Bomberos en servicio</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Equipos Asignados</CardTitle>
                  <Package className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{assignmentData.length}</div>
                  <p className="text-xs text-gray-500">Actualmente en uso</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Sin Asignar</CardTitle>
                  <Package className="h-5 w-5 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{unassignedEquipment.length}</div>
                  <p className="text-xs text-gray-500">Disponibles para asignar</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Firefighters and their assignments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Personal y Equipos Asignados
                  </CardTitle>
                  <CardDescription>Vista del personal con sus equipos asignados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {firefightersData.map((firefighter) => {
                      const assignments = getFirefighterAssignments(firefighter.id)
                      return (
                        <div key={firefighter.id} className="border rounded-lg p-4">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {firefighter.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{firefighter.name}</h3>
                              <p className="text-sm text-gray-500">{firefighter.rank}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  Turno: {firefighter.shift}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {firefighter.specialization}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{assignments.length} equipos</p>
                              <p className="text-xs text-gray-500">asignados</p>
                            </div>
                          </div>

                          {assignments.length > 0 ? (
                            <div className="space-y-2">
                              {assignments.map((assignment) => (
                                <div
                                  key={assignment.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    <Package className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <p className="text-sm font-medium">{assignment.equipment?.name}</p>
                                      <p className="text-xs text-gray-500">Código: {assignment.equipment?.id}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {new Date(assignment.assignedDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4 text-gray-500">
                              <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Sin equipos asignados</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Unassigned Equipment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Equipos Disponibles
                  </CardTitle>
                  <CardDescription>Equipos operativos sin asignar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {unassignedEquipment.map((equipment) => (
                      <div
                        key={equipment.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Package className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{equipment.name}</p>
                            <p className="text-sm text-gray-500">
                              {equipment.id} - {equipment.type}
                            </p>
                            <p className="text-xs text-gray-400">{equipment.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 border-green-200">Disponible</Badge>
                          <Button size="sm" variant="outline">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {unassignedEquipment.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Todos los equipos operativos están asignados</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
