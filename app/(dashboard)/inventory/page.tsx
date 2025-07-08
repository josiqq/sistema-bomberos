"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Search, Filter, Plus, Eye, Edit, Trash2, CheckCircle, Clock, XCircle } from "lucide-react"
import { equipmentData } from "@/lib/data"

const statusIcons = {
  Operativo: <CheckCircle className="h-4 w-4 text-green-600" />,
  "En mantenimiento": <Clock className="h-4 w-4 text-yellow-600" />,
  "Fuera de servicio": <XCircle className="h-4 w-4 text-red-600" />,
}

const statusColors = {
  Operativo: "bg-green-100 text-green-800 border-green-200",
  "En mantenimiento": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Fuera de servicio": "bg-red-100 text-red-800 border-red-200",
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredEquipment = equipmentData.filter((equipment) => {
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || equipment.type === typeFilter
    const matchesStatus = statusFilter === "all" || equipment.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  return (

    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventario de Equipos</h1>
            <p className="text-gray-600">Gestión completa del inventario de equipos</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Equipo
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar equipos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de equipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="EPP">EPP</SelectItem>
                <SelectItem value="Rescate">Rescate</SelectItem>
                <SelectItem value="Vehículo">Vehículo</SelectItem>
                <SelectItem value="Comunicación">Comunicación</SelectItem>
                <SelectItem value="Médico">Médico</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Operativo">Operativo</SelectItem>
                <SelectItem value="En mantenimiento">En mantenimiento</SelectItem>
                <SelectItem value="Fuera de servicio">Fuera de servicio</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {filteredEquipment.length} de {equipmentData.length} equipos
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipment Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Lista de Equipos
          </CardTitle>
          <CardDescription>Información detallada de todos los equipos registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Asignado a</TableHead>
                  <TableHead>Última Inspección</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map((equipment) => (
                  <TableRow key={equipment.id}>
                    <TableCell className="font-medium">{equipment.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{equipment.name}</p>
                        {equipment.brand && equipment.model && (
                          <p className="text-sm text-gray-500">
                            {equipment.brand} {equipment.model}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{equipment.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[equipment.status]}>
                        <div className="flex items-center gap-1">
                          {statusIcons[equipment.status]}
                          {equipment.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>{equipment.location}</TableCell>
                    <TableCell>
                      {equipment.assignedTo ? (
                        <span className="text-sm">{equipment.assignedTo}</span>
                      ) : (
                        <span className="text-sm text-gray-400">Sin asignar</span>
                      )}
                    </TableCell>
                    <TableCell>{new Date(equipment.lastInspection).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="neutral" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="neutral" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="neutral" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
