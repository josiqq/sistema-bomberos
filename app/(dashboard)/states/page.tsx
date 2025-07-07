"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  Wrench,
  XCircle,
  Settings,
  History,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  Edit,
  Eye,
} from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

interface EquipmentState {
  id: string
  name: string
  color: string
  icon: any
  description: string
  count: number
  percentage: number
  trend: "up" | "down" | "stable"
}

interface StateChange {
  id: string
  equipmentId: string
  equipmentName: string
  fromState: string
  toState: string
  reason: string
  changedBy: string
  changedAt: string
  duration: string
  observations?: string
}

interface CriticalAlert {
  id: string
  type: "critical-equipment-down" | "extended-maintenance" | "inspection-overdue"
  equipmentId: string
  equipmentName: string
  status: string
  timeInStatus: string
  impact: "low" | "medium" | "high" | "critical"
  reason: string
  responsibleTechnician?: string
  estimatedCompletion?: string
}

const equipmentStates: EquipmentState[] = [
  {
    id: "operational",
    name: "Operativo",
    color: "green",
    icon: CheckCircle,
    description: "Equipo listo para uso operacional",
    count: 98,
    percentage: 77.2,
    trend: "stable",
  },
  {
    id: "maintenance",
    name: "En Mantenimiento",
    color: "yellow",
    icon: Wrench,
    description: "Equipo en proceso de mantenimiento programado",
    count: 15,
    percentage: 11.8,
    trend: "up",
  },
  {
    id: "out-of-service",
    name: "Fuera de Servicio",
    color: "red",
    icon: XCircle,
    description: "Equipo no disponible para uso operacional",
    count: 8,
    percentage: 6.3,
    trend: "down",
  },
  {
    id: "repair",
    name: "En Reparación",
    color: "blue",
    icon: Settings,
    description: "Equipo en proceso de reparación",
    count: 6,
    percentage: 4.7,
    trend: "stable",
  },
]

const stateDistributionData = [
  { name: "Operativo", value: 98, color: "#10b981" },
  { name: "Mantenimiento", value: 15, color: "#f59e0b" },
  { name: "Fuera de Servicio", value: 8, color: "#ef4444" },
  { name: "Reparación", value: 6, color: "#3b82f6" },
]

const stateTrendData = [
  { day: "Lun", operational: 95, maintenance: 18, outOfService: 10, repair: 4 },
  { day: "Mar", operational: 97, maintenance: 16, outOfService: 9, repair: 5 },
  { day: "Mié", operational: 96, maintenance: 17, outOfService: 8, repair: 6 },
  { day: "Jue", operational: 98, maintenance: 15, outOfService: 7, repair: 7 },
  { day: "Vie", operational: 99, maintenance: 14, outOfService: 8, repair: 6 },
  { day: "Sáb", operational: 98, maintenance: 15, outOfService: 8, repair: 6 },
  { day: "Dom", operational: 98, maintenance: 15, outOfService: 8, repair: 6 },
]

const criticalAlerts: CriticalAlert[] = [
  {
    id: "alert-001",
    type: "critical-equipment-down",
    equipmentId: "VEH-001",
    equipmentName: "Autobomba Principal",
    status: "out-of-service",
    timeInStatus: "72 horas",
    impact: "critical",
    reason: "Falla en sistema hidráulico",
    responsibleTechnician: "Carlos Mendoza",
  },
  {
    id: "alert-002",
    type: "extended-maintenance",
    equipmentId: "RES-003",
    equipmentName: "Equipo de Rescate Vehicular",
    status: "maintenance",
    timeInStatus: "15 días",
    impact: "medium",
    reason: "Reemplazo de componentes",
    estimatedCompletion: "2024-07-15",
  },
  {
    id: "alert-003",
    type: "inspection-overdue",
    equipmentId: "EPP-012",
    equipmentName: "Equipo de Respiración Autónoma",
    status: "operational",
    timeInStatus: "5 días vencido",
    impact: "high",
    reason: "Inspección de seguridad vencida",
    responsibleTechnician: "Ana López",
  },
]

const stateHistory: StateChange[] = [
  {
    id: "change-001",
    equipmentId: "VEH-001",
    equipmentName: "Autobomba Principal",
    fromState: "operational",
    toState: "out-of-service",
    reason: "Falla en sistema hidráulico detectada durante inspección rutinaria",
    changedBy: "José García",
    changedAt: "2024-06-18T14:30:00Z",
    duration: "72 horas",
    observations: "Requiere reparación especializada del sistema hidráulico",
  },
  {
    id: "change-002",
    equipmentId: "EPP-008",
    equipmentName: "Casco Estructural MSA",
    fromState: "maintenance",
    toState: "operational",
    reason: "Mantenimiento preventivo completado satisfactoriamente",
    changedBy: "María López",
    changedAt: "2024-06-17T09:15:00Z",
    duration: "3 días",
  },
  {
    id: "change-003",
    equipmentId: "RES-003",
    equipmentName: "Equipo de Rescate Vehicular",
    fromState: "operational",
    toState: "maintenance",
    reason: "Mantenimiento programado - reemplazo de componentes",
    changedBy: "Carlos Ruiz",
    changedAt: "2024-06-05T08:00:00Z",
    duration: "15 días",
    observations: "Mantenimiento mayor programado según cronograma",
  },
]

const mockEquipmentByState = {
  all: [
    {
      id: "VEH-001",
      name: "Autobomba Principal",
      type: "Vehículo",
      status: "out-of-service",
      timeInStatus: "72 horas",
      reason: "Falla en sistema hidráulico",
      responsible: "Carlos Mendoza",
    },
    {
      id: "EPP-008",
      name: "Casco Estructural MSA",
      type: "EPP",
      status: "operational",
      timeInStatus: "2 días",
      reason: "Mantenimiento completado",
      responsible: "María López",
    },
    {
      id: "RES-003",
      name: "Equipo de Rescate Vehicular",
      type: "Rescate",
      status: "maintenance",
      timeInStatus: "15 días",
      reason: "Mantenimiento programado",
      responsible: "Carlos Ruiz",
    },
  ],
  operational: [
    {
      id: "EPP-008",
      name: "Casco Estructural MSA",
      type: "EPP",
      status: "operational",
      timeInStatus: "2 días",
      reason: "Mantenimiento completado",
      responsible: "María López",
    },
  ],
  maintenance: [
    {
      id: "RES-003",
      name: "Equipo de Rescate Vehicular",
      type: "Rescate",
      status: "maintenance",
      timeInStatus: "15 días",
      reason: "Mantenimiento programado",
      responsible: "Carlos Ruiz",
    },
  ],
  "out-of-service": [
    {
      id: "VEH-001",
      name: "Autobomba Principal",
      type: "Vehículo",
      status: "out-of-service",
      timeInStatus: "72 horas",
      reason: "Falla en sistema hidráulico",
      responsible: "Carlos Mendoza",
    },
  ],
  repair: [],
}

export default function StatesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)
  const [stateChangeModal, setStateChangeModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const getStateColor = (state: string) => {
    const stateConfig = equipmentStates.find((s) => s.id === state)
    return stateConfig?.color || "gray"
  }

  const getStateIcon = (state: string) => {
    const stateConfig = equipmentStates.find((s) => s.id === state)
    return stateConfig?.icon || CheckCircle
  }

  const getStateName = (state: string) => {
    const stateConfig = equipmentStates.find((s) => s.id === state)
    return stateConfig?.name || state
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const filteredEquipment = mockEquipmentByState[selectedTab as keyof typeof mockEquipmentByState].filter(
    (equipment) =>
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Control de Estados</h1>
              <p className="text-gray-600">Monitoreo en tiempo real del estado operativo de equipos</p>
            </div>

            {/* State Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {equipmentStates.map((state) => {
                const IconComponent = state.icon
                return (
                  <Card
                    key={state.id}
                    className={`border-l-4 border-l-${state.color}-500 hover:shadow-lg transition-shadow cursor-pointer`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{state.name}</p>
                          <p className={`text-3xl font-bold text-${state.color}-600`}>{state.count}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-sm text-gray-500">{state.percentage}% del total</span>
                            {getTrendIcon(state.trend)}
                          </div>
                        </div>
                        <div className={`w-12 h-12 bg-${state.color}-100 rounded-lg flex items-center justify-center`}>
                          <IconComponent className={`h-6 w-6 text-${state.color}-600`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* State Distribution Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Distribución de Estados</CardTitle>
                  <CardDescription>Estado actual de todos los equipos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          dataKey="value"
                          data={stateDistributionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }) => {
                            const percentage = percent ? (percent * 100).toFixed(0) : "0";
                            return `${name} ${percentage}%`;
                          }}
                        >
                          {stateDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Critical Alerts */}
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
                    {criticalAlerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{alert.equipmentName}</p>
                            <p className="text-xs text-gray-500">{alert.equipmentId}</p>
                            <p className="text-xs text-gray-600 mt-1">{alert.reason}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className={getImpactColor(alert.impact)} variant="outline">
                                {alert.impact}
                              </Badge>
                              <span className="text-xs text-gray-500">{alert.timeInStatus}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* State Trend Chart */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Tendencia de Estados (Últimos 7 días)</CardTitle>
                <CardDescription>Evolución del estado de equipos en la semana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stateTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="operational" stroke="#10b981" name="Operativo" />
                      <Line type="monotone" dataKey="maintenance" stroke="#f59e0b" name="Mantenimiento" />
                      <Line type="monotone" dataKey="outOfService" stroke="#ef4444" name="Fuera de Servicio" />
                      <Line type="monotone" dataKey="repair" stroke="#3b82f6" name="Reparación" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Equipment by State */}
            <Card>
              <CardHeader>
                <CardTitle>Equipos por Estado</CardTitle>
                <CardDescription>Vista detallada de equipos según su estado operativo</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <div className="flex items-center justify-between mb-4">
                    <TabsList>
                      <TabsTrigger value="all">Todos ({mockEquipmentByState.all.length})</TabsTrigger>
                      <TabsTrigger value="operational">
                        Operativos ({mockEquipmentByState.operational.length})
                      </TabsTrigger>
                      <TabsTrigger value="maintenance">
                        Mantenimiento ({mockEquipmentByState.maintenance.length})
                      </TabsTrigger>
                      <TabsTrigger value="out-of-service">
                        Fuera de Servicio ({mockEquipmentByState["out-of-service"].length})
                      </TabsTrigger>
                      <TabsTrigger value="repair">Reparación ({mockEquipmentByState.repair.length})</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Buscar equipos..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                      </Button>
                    </div>
                  </div>

                  <TabsContent value={selectedTab}>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Estado</TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Tiempo en Estado</TableHead>
                            <TableHead>Motivo/Observaciones</TableHead>
                            <TableHead>Responsable</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredEquipment.map((equipment) => {
                            const StateIcon = getStateIcon(equipment.status)
                            return (
                              <TableRow key={equipment.id}>
                                <TableCell>
                                  <Badge
                                    className={`bg-${getStateColor(equipment.status)}-100 text-${getStateColor(equipment.status)}-800 border-${getStateColor(equipment.status)}-200`}
                                  >
                                    <div className="flex items-center gap-1">
                                      <StateIcon className="h-3 w-3" />
                                      {getStateName(equipment.status)}
                                    </div>
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{equipment.id}</TableCell>
                                <TableCell>{equipment.name}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{equipment.type}</Badge>
                                </TableCell>
                                <TableCell>{equipment.timeInStatus}</TableCell>
                                <TableCell className="max-w-xs truncate">{equipment.reason}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">{equipment.responsible}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setSelectedEquipment(equipment)}
                                        >
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="max-w-md">
                                        <DialogHeader>
                                          <DialogTitle>Cambiar Estado</DialogTitle>
                                          <DialogDescription>
                                            Cambiar el estado operativo de {equipment.name}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <StateChangeForm equipment={equipment} />
                                      </DialogContent>
                                    </Dialog>
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <History className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* State Change History */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Historial de Cambios de Estado
                </CardTitle>
                <CardDescription>Registro cronológico de cambios de estado recientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stateHistory.map((change) => (
                    <div key={change.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <History className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium">{change.equipmentName}</p>
                          <Badge variant="outline">{change.equipmentId}</Badge>
                          <div className="flex items-center gap-1">
                            <Badge
                              className={`bg-${getStateColor(change.fromState)}-100 text-${getStateColor(change.fromState)}-800`}
                            >
                              {getStateName(change.fromState)}
                            </Badge>
                            <span className="text-gray-400">→</span>
                            <Badge
                              className={`bg-${getStateColor(change.toState)}-100 text-${getStateColor(change.toState)}-800`}
                            >
                              {getStateName(change.toState)}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{change.reason}</p>
                        {change.observations && <p className="text-xs text-gray-500 mb-2">{change.observations}</p>}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {change.changedBy}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(change.changedAt).toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Duración: {change.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function StateChangeForm({ equipment }: { equipment: any }) {
  const [newState, setNewState] = useState("")
  const [reason, setReason] = useState("")
  const [observations, setObservations] = useState("")
  const [responsible, setResponsible] = useState("")

  const availableStates = equipmentStates.filter((state) => state.id !== equipment.status)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Estado Actual</Label>
        <div className="p-3 bg-gray-50 rounded-lg">
          <Badge className={`bg-${getStateColor(equipment.status)}-100 text-${getStateColor(equipment.status)}-800`}>
            {getStateName(equipment.status)}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Nuevo Estado</Label>
        <Select value={newState} onValueChange={setNewState}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar nuevo estado" />
          </SelectTrigger>
          <SelectContent>
            {availableStates.map((state) => (
              <SelectItem key={state.id} value={state.id}>
                <div className="flex items-center gap-2">
                  <state.icon className="h-4 w-4" />
                  {state.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Motivo del Cambio *</Label>
        <Textarea
          placeholder="Describe el motivo del cambio de estado..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Responsable</Label>
        <Select value={responsible} onValueChange={setResponsible}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar responsable" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jose-garcia">José García</SelectItem>
            <SelectItem value="maria-lopez">María López</SelectItem>
            <SelectItem value="carlos-ruiz">Carlos Ruiz</SelectItem>
            <SelectItem value="ana-martinez">Ana Martínez</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Observaciones Adicionales</Label>
        <Textarea
          placeholder="Observaciones opcionales..."
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          rows={2}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Cancelar</Button>
        <Button disabled={!newState || !reason}>Cambiar Estado</Button>
      </div>
    </div>
  )
}

function getStateColor(state: string) {
  const stateConfig = equipmentStates.find((s) => s.id === state)
  return stateConfig?.color || "gray"
}

function getStateName(state: string) {
  const stateConfig = equipmentStates.find((s) => s.id === state)
  return stateConfig?.name || state
}
