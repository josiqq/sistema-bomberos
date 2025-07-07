"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  Wrench,
  Activity,
  CheckCircle,
  Plus,
  Download,
  Calendar,
  TrendingUp,
  FileText,
  LucidePieChart,
  LucideBarChart,
  Filter,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Clock,
  Edit,
} from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"

interface ReportMetrics {
  totalEquipment: number
  operationalRate: number
  maintenanceThisMonth: number
  overdueMaintenance: number
  criticalAlerts: number
  maintenanceCost: {
    thisMonth: number
    lastMonth: number
    trend: "up" | "down"
  }
}

interface EquipmentByType {
  type: string
  count: number
  operational: number
}

interface MaintenanceTrend {
  month: string
  preventive: number
  corrective: number
}

const reportMetrics: ReportMetrics = {
  totalEquipment: 127,
  operationalRate: 89.7,
  maintenanceThisMonth: 15,
  overdueMaintenance: 3,
  criticalAlerts: 2,
  maintenanceCost: {
    thisMonth: 15420,
    lastMonth: 12350,
    trend: "up",
  },
}

const equipmentByType: EquipmentByType[] = [
  { type: "EPP", count: 45, operational: 42 },
  { type: "Rescate", count: 28, operational: 25 },
  { type: "Vehículos", count: 12, operational: 10 },
  { type: "Comunicación", count: 22, operational: 20 },
  { type: "Médico", count: 20, operational: 18 },
]

const maintenanceTrend: MaintenanceTrend[] = [
  { month: "Ene", preventive: 12, corrective: 3 },
  { month: "Feb", preventive: 15, corrective: 5 },
  { month: "Mar", preventive: 18, corrective: 2 },
  { month: "Abr", preventive: 14, corrective: 4 },
  { month: "May", preventive: 16, corrective: 3 },
  { month: "Jun", preventive: 13, corrective: 2 },
]

const equipmentStatusData = [
  { name: "Operativo", value: 114, color: "#10b981" },
  { name: "Mantenimiento", value: 8, color: "#f59e0b" },
  { name: "Fuera de Servicio", value: 5, color: "#ef4444" },
]

const costAnalysisData = [
  { month: "Ene", preventive: 8500, corrective: 3200, total: 11700 },
  { month: "Feb", preventive: 9200, corrective: 4800, total: 14000 },
  { month: "Mar", preventive: 10100, corrective: 2100, total: 12200 },
  { month: "Abr", preventive: 8800, corrective: 3600, total: 12400 },
  { month: "May", preventive: 9600, corrective: 2800, total: 12400 },
  { month: "Jun", preventive: 7800, corrective: 1500, total: 9300 },
]

const availabilityData = [
  { week: "Sem 1", availability: 92.5 },
  { week: "Sem 2", availability: 88.2 },
  { week: "Sem 3", availability: 94.1 },
  { week: "Sem 4", availability: 89.7 },
  { week: "Sem 5", availability: 91.3 },
  { week: "Sem 6", availability: 93.8 },
]

const predefinedReports = [
  {
    id: "inventory",
    title: "Reporte de Inventario",
    description: "Estado completo del inventario de equipos",
    icon: Package,
    lastGenerated: "2024-06-20T10:30:00Z",
    category: "Inventario",
  },
  {
    id: "maintenance",
    title: "Reporte de Mantenimientos",
    description: "Análisis de mantenimientos realizados y programados",
    icon: Wrench,
    lastGenerated: "2024-06-19T15:45:00Z",
    category: "Mantenimiento",
  },
  {
    id: "availability",
    title: "Reporte de Disponibilidad",
    description: "Disponibilidad operativa de equipos críticos",
    icon: Activity,
    lastGenerated: "2024-06-18T09:15:00Z",
    category: "Operaciones",
  },
  {
    id: "compliance",
    title: "Reporte de Cumplimiento",
    description: "Cumplimiento de inspecciones y normativas",
    icon: CheckCircle,
    lastGenerated: "2024-06-17T14:20:00Z",
    category: "Cumplimiento",
  },
  {
    id: "financial",
    title: "Reporte Financiero",
    description: "Análisis de costos de mantenimiento y operación",
    icon: DollarSign,
    lastGenerated: "2024-06-16T11:00:00Z",
    category: "Financiero",
  },
  {
    id: "performance",
    title: "Reporte de Rendimiento",
    description: "Análisis de rendimiento operativo y eficiencia",
    icon: TrendingUp,
    lastGenerated: "2024-06-15T16:30:00Z",
    category: "Rendimiento",
  },
]

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [reportFilters, setReportFilters] = useState({
    dateRange: "last30days",
    equipmentType: "all",
    location: "all",
    status: "all",
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const generateReport = (reportId: string) => {
    setSelectedReport(reportId)
    // Simulate report generation
    setTimeout(() => {
      setSelectedReport(null)
    }, 2000)
  }

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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Centro de Reportes</h1>
                  <p className="text-gray-600">Análisis y reportes del sistema de gestión</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Reporte
                </Button>
              </div>
            </div>

            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="predefined">Reportes Predefinidos</TabsTrigger>
                <TabsTrigger value="custom">Reportes Personalizados</TabsTrigger>
                <TabsTrigger value="scheduled">Programados</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Equipos</p>
                          <p className="text-2xl font-bold text-blue-600">{reportMetrics.totalEquipment}</p>
                        </div>
                        <Package className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Operatividad</p>
                          <p className="text-2xl font-bold text-green-600">{reportMetrics.operationalRate}%</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Mantenimientos</p>
                          <p className="text-2xl font-bold text-yellow-600">{reportMetrics.maintenanceThisMonth}</p>
                        </div>
                        <Wrench className="h-8 w-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Vencidos</p>
                          <p className="text-2xl font-bold text-red-600">{reportMetrics.overdueMaintenance}</p>
                        </div>
                        <Clock className="h-8 w-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Alertas</p>
                          <p className="text-2xl font-bold text-purple-600">{reportMetrics.criticalAlerts}</p>
                        </div>
                        <Activity className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-indigo-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Costo Mensual</p>
                          <p className="text-xl font-bold text-indigo-600">
                            {formatCurrency(reportMetrics.maintenanceCost.thisMonth)}
                          </p>
                          <div className="flex items-center mt-1">
                            {reportMetrics.maintenanceCost.trend === "up" ? (
                              <ArrowUp className="h-3 w-3 text-red-500" />
                            ) : (
                              <ArrowDown className="h-3 w-3 text-green-500" />
                            )}
                            <span className="text-xs text-gray-500 ml-1">vs mes anterior</span>
                          </div>
                        </div>
                        <DollarSign className="h-8 w-8 text-indigo-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Equipment by Type */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LucideBarChart className="h-5 w-5" />
                        Equipos por Tipo
                      </CardTitle>
                      <CardDescription>Distribución del inventario por categoría</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart data={equipmentByType}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3b82f6" name="Total" />
                            <Bar dataKey="operational" fill="#10b981" name="Operativos" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Equipment Status Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LucidePieChart className="h-5 w-5" />
                        Estado de Equipos
                      </CardTitle>
                      <CardDescription>Distribución por estado operativo</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              dataKey="value"
                              data={equipmentStatusData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                            >
                              {equipmentStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Maintenance Trend */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Tendencia de Mantenimientos
                      </CardTitle>
                      <CardDescription>Mantenimientos preventivos vs correctivos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={maintenanceTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="preventive" stroke="#10b981" name="Preventivo" />
                            <Line type="monotone" dataKey="corrective" stroke="#f59e0b" name="Correctivo" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cost Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Análisis de Costos
                      </CardTitle>
                      <CardDescription>Costos de mantenimiento mensual</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={costAnalysisData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => formatCurrency(value as number)} />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="preventive"
                              stackId="1"
                              stroke="#10b981"
                              fill="#10b981"
                              name="Preventivo"
                            />
                            <Area
                              type="monotone"
                              dataKey="corrective"
                              stackId="1"
                              stroke="#f59e0b"
                              fill="#f59e0b"
                              name="Correctivo"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Availability Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Disponibilidad Operativa
                    </CardTitle>
                    <CardDescription>Porcentaje de disponibilidad semanal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={availabilityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" />
                          <YAxis domain={[80, 100]} />
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Area
                            type="monotone"
                            dataKey="availability"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="predefined" className="space-y-6">
                {/* Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filtros de Reportes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Período</Label>
                        <Select
                          value={reportFilters.dateRange}
                          onValueChange={(value) => setReportFilters({ ...reportFilters, dateRange: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="last7days">Últimos 7 días</SelectItem>
                            <SelectItem value="last30days">Últimos 30 días</SelectItem>
                            <SelectItem value="last90days">Últimos 90 días</SelectItem>
                            <SelectItem value="lastyear">Último año</SelectItem>
                            <SelectItem value="custom">Personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Tipo de Equipo</Label>
                        <Select
                          value={reportFilters.equipmentType}
                          onValueChange={(value) => setReportFilters({ ...reportFilters, equipmentType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="epp">EPP</SelectItem>
                            <SelectItem value="rescue">Rescate</SelectItem>
                            <SelectItem value="vehicle">Vehículos</SelectItem>
                            <SelectItem value="communication">Comunicación</SelectItem>
                            <SelectItem value="medical">Médico</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Ubicación</Label>
                        <Select
                          value={reportFilters.location}
                          onValueChange={(value) => setReportFilters({ ...reportFilters, location: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            <SelectItem value="almacen">Almacén Principal</SelectItem>
                            <SelectItem value="taller">Taller de Equipos</SelectItem>
                            <SelectItem value="vehiculos">Área de Vehículos</SelectItem>
                            <SelectItem value="comunicaciones">Sala de Comunicaciones</SelectItem>
                            <SelectItem value="medico">Área Médica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Estado</Label>
                        <Select
                          value={reportFilters.status}
                          onValueChange={(value) => setReportFilters({ ...reportFilters, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="operational">Operativo</SelectItem>
                            <SelectItem value="maintenance">En Mantenimiento</SelectItem>
                            <SelectItem value="outofservice">Fuera de Servicio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Predefined Reports Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {predefinedReports.map((report) => {
                    const IconComponent = report.icon
                    return (
                      <Card key={report.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <IconComponent className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{report.title}</CardTitle>
                                <Badge variant="outline">{report.category}</Badge>
                              </div>
                            </div>
                          </div>
                          <CardDescription>{report.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="text-sm text-gray-500">
                              <p>Último reporte: {formatDate(report.lastGenerated)}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => generateReport(report.id)}
                                disabled={selectedReport === report.id}
                                className="flex-1"
                              >
                                {selectedReport === report.id ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Generando...
                                  </>
                                ) : (
                                  <>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Generar
                                  </>
                                )}
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Calendar className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Constructor de Reportes Personalizados</CardTitle>
                    <CardDescription>
                      Crea reportes personalizados seleccionando los datos y visualizaciones que necesitas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Data Selection */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Selección de Datos</h3>

                        <div className="space-y-3">
                          <div>
                            <Label>Fuente de Datos</Label>
                            <Select defaultValue="equipment">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="equipment">Equipos</SelectItem>
                                <SelectItem value="maintenance">Mantenimientos</SelectItem>
                                <SelectItem value="assignments">Asignaciones</SelectItem>
                                <SelectItem value="inspections">Inspecciones</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Campos a Incluir</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {[
                                "Nombre",
                                "Tipo",
                                "Estado",
                                "Ubicación",
                                "Fecha de Adquisición",
                                "Última Inspección",
                                "Costo",
                                "Marca/Modelo",
                              ].map((field) => (
                                <label key={field} className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded" />
                                  <span className="text-sm">{field}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label>Filtros</Label>
                            <div className="space-y-2 mt-2">
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Agregar filtro" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="type">Tipo de Equipo</SelectItem>
                                  <SelectItem value="status">Estado</SelectItem>
                                  <SelectItem value="location">Ubicación</SelectItem>
                                  <SelectItem value="date">Rango de Fechas</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Visualization Options */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Visualización</h3>

                        <div className="space-y-3">
                          <div>
                            <Label>Tipo de Gráfico</Label>
                            <Select defaultValue="table">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="table">Tabla</SelectItem>
                                <SelectItem value="bar">Gráfico de Barras</SelectItem>
                                <SelectItem value="line">Gráfico de Líneas</SelectItem>
                                <SelectItem value="pie">Gráfico Circular</SelectItem>
                                <SelectItem value="area">Gráfico de Área</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Agrupación</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar agrupación" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="type">Por Tipo</SelectItem>
                                <SelectItem value="status">Por Estado</SelectItem>
                                <SelectItem value="location">Por Ubicación</SelectItem>
                                <SelectItem value="month">Por Mes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Ordenamiento</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar orden" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="name-asc">Nombre (A-Z)</SelectItem>
                                <SelectItem value="name-desc">Nombre (Z-A)</SelectItem>
                                <SelectItem value="date-asc">Fecha (Más Antiguo)</SelectItem>
                                <SelectItem value="date-desc">Fecha (Más Reciente)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Configuración del Reporte</h4>
                          <p className="text-sm text-gray-500">Personaliza los detalles del reporte</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Previsualizar
                          </Button>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Crear Reporte
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label>Título del Reporte</Label>
                          <Input placeholder="Ej: Reporte de Equipos Q2 2024" />
                        </div>
                        <div className="space-y-2">
                          <Label>Descripción</Label>
                          <Input placeholder="Descripción opcional del reporte" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Saved Custom Reports */}
                <Card>
                  <CardHeader>
                    <CardTitle>Reportes Personalizados Guardados</CardTitle>
                    <CardDescription>Reportes personalizados creados anteriormente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Análisis de Equipos EPP Q2",
                          description: "Reporte detallado de equipos de protección personal",
                          created: "2024-06-15T10:30:00Z",
                          type: "Personalizado",
                        },
                        {
                          name: "Costos de Mantenimiento Vehicular",
                          description: "Análisis de costos de mantenimiento de vehículos",
                          created: "2024-06-10T14:20:00Z",
                          type: "Personalizado",
                        },
                        {
                          name: "Disponibilidad por Turno",
                          description: "Disponibilidad de equipos críticos por turno",
                          created: "2024-06-05T09:15:00Z",
                          type: "Personalizado",
                        },
                      ].map((report, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <LucideBarChart className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium">{report.name}</p>
                              <p className="text-sm text-gray-500">{report.description}</p>
                              <p className="text-xs text-gray-400">Creado: {formatDate(report.created)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{report.type}</Badge>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scheduled" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reportes Programados</CardTitle>
                    <CardDescription>Administra los reportes que se generan automáticamente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Schedule New Report */}
                      <div className="border rounded-lg p-4 bg-blue-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-blue-900">Programar Nuevo Reporte</h3>
                            <p className="text-sm text-blue-700">Automatiza la generación de reportes</p>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Programar
                          </Button>
                        </div>
                      </div>

                      {/* Scheduled Reports List */}
                      <div className="space-y-4">
                        {[
                          {
                            name: "Reporte Semanal de Inventario",
                            frequency: "Semanal",
                            nextRun: "2024-06-24T08:00:00Z",
                            recipients: ["admin@cuartel.com", "jefe@cuartel.com"],
                            status: "active",
                            format: "PDF",
                          },
                          {
                            name: "Análisis Mensual de Mantenimientos",
                            frequency: "Mensual",
                            nextRun: "2024-07-01T09:00:00Z",
                            recipients: ["admin@cuartel.com"],
                            status: "active",
                            format: "Excel",
                          },
                          {
                            name: "Reporte de Cumplimiento Trimestral",
                            frequency: "Trimestral",
                            nextRun: "2024-09-01T10:00:00Z",
                            recipients: ["admin@cuartel.com", "inspector@cuartel.com"],
                            status: "active",
                            format: "PDF",
                          },
                          {
                            name: "Análisis de Costos Mensual",
                            frequency: "Mensual",
                            nextRun: "2024-07-01T11:00:00Z",
                            recipients: ["admin@cuartel.com", "contador@cuartel.com"],
                            status: "paused",
                            format: "Excel",
                          },
                        ].map((report, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${report.status === "active" ? "bg-green-100" : "bg-gray-100"
                                    }`}
                                >
                                  <Calendar
                                    className={`h-5 w-5 ${report.status === "active" ? "text-green-600" : "text-gray-600"
                                      }`}
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{report.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {report.frequency} • Próximo: {formatDate(report.nextRun)}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {report.recipients.length} destinatarios • Formato: {report.format}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={report.status === "active" ? "default" : "secondary"}>
                                  {report.status === "active" ? "Activo" : "Pausado"}
                                </Badge>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  {report.status === "active" ? "Pausar" : "Activar"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Export Options */}
                <Card>
                  <CardHeader>
                    <CardTitle>Opciones de Exportación</CardTitle>
                    <CardDescription>Configura los formatos y opciones de exportación</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Formatos Disponibles</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <label className="text-sm">PDF</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <label className="text-sm">Excel (.xlsx)</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <label className="text-sm">CSV</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <label className="text-sm">Word (.docx)</label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium">Configuración PDF</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <label className="text-sm">Incluir logo del cuartel</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <label className="text-sm">Incluir fecha de generación</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <label className="text-sm">Incluir gráficos</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <label className="text-sm">Orientación horizontal</label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium">Entrega</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <label className="text-sm">Enviar por email</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <label className="text-sm">Guardar en servidor</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <label className="text-sm">Notificar por WhatsApp</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
