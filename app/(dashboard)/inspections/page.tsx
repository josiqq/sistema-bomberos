"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  SearchCheck,
  Award,
  CalendarIcon,
  CheckSquare,
  Camera,
  Clock,
  Shield,
  Wrench,
  FileCheck,
  Plus,
  Eye,
  Edit,
  Download,
  AlertTriangle,
  User,
  MapPin,
} from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts"

interface InspectionType {
  id: string
  name: string
  description: string
  frequency: number
  icon: any
  color: string
  checklist: string[]
}

interface InspectionSchedule {
  id: string
  equipmentId: string
  equipmentName: string
  inspectionType: string
  scheduledDate: string
  estimatedDuration: number
  inspectorId: string
  inspectorName: string
  priority: "low" | "medium" | "high" | "critical"
  location: string
  status: "scheduled" | "in-progress" | "completed" | "overdue"
  notes?: string
}

interface Certification {
  id: string
  equipmentId: string
  equipmentName: string
  certificationType: string
  issuedDate: string
  expiryDate: string
  status: "active" | "expiring" | "expired"
  issuingAuthority: string
  certificateNumber: string
  inspector: string
  documents: string[]
}

const inspectionTypes: InspectionType[] = [
  {
    id: "safety",
    name: "Inspección de Seguridad",
    description: "Verificación de sistemas de seguridad",
    frequency: 30,
    icon: Shield,
    color: "red",
    checklist: [
      "Verificar sistemas de protección",
      "Comprobar elementos de seguridad",
      "Revisar etiquetado y señalización",
      "Validar EPP asociado",
    ],
  },
  {
    id: "maintenance",
    name: "Inspección de Mantenimiento",
    description: "Revisión técnica preventiva",
    frequency: 90,
    icon: Wrench,
    color: "yellow",
    checklist: [
      "Revisar componentes mecánicos",
      "Verificar niveles de fluidos",
      "Comprobar conexiones eléctricas",
      "Evaluar desgaste general",
    ],
  },
  {
    id: "certification",
    name: "Certificación Técnica",
    description: "Certificación oficial requerida",
    frequency: 365,
    icon: Award,
    color: "blue",
    checklist: [
      "Verificar cumplimiento normativo",
      "Documentar especificaciones técnicas",
      "Validar con estándares vigentes",
      "Generar certificado oficial",
    ],
  },
  {
    id: "regulatory",
    name: "Inspección Regulatoria",
    description: "Cumplimiento de normativas",
    frequency: 180,
    icon: FileCheck,
    color: "purple",
    checklist: [
      "Verificar cumplimiento legal",
      "Revisar documentación requerida",
      "Validar con normativas locales",
      "Preparar reporte de cumplimiento",
    ],
  },
]

const upcomingInspections: InspectionSchedule[] = [
  {
    id: "insp-001",
    equipmentId: "VEH-001",
    equipmentName: "Autobomba Mercedes",
    inspectionType: "safety",
    scheduledDate: "2024-07-10",
    estimatedDuration: 120,
    inspectorId: "inspector-001",
    inspectorName: "Ing. Carlos Ruiz",
    priority: "high",
    location: "Taller Principal",
    status: "scheduled",
  },
  {
    id: "insp-002",
    equipmentId: "EPP-015",
    equipmentName: "Equipo de Respiración Autónoma",
    inspectionType: "certification",
    scheduledDate: "2024-07-12",
    estimatedDuration: 90,
    inspectorId: "inspector-002",
    inspectorName: "Téc. Ana López",
    priority: "critical",
    location: "Laboratorio de Equipos",
    status: "scheduled",
  },
  {
    id: "insp-003",
    equipmentId: "RES-008",
    equipmentName: "Equipo de Corte Hidráulico",
    inspectionType: "maintenance",
    scheduledDate: "2024-07-08",
    estimatedDuration: 60,
    inspectorId: "inspector-003",
    inspectorName: "Téc. Miguel Santos",
    priority: "medium",
    location: "Área de Rescate",
    status: "overdue",
  },
]

const certifications: Certification[] = [
  {
    id: "cert-001",
    equipmentId: "VEH-001",
    equipmentName: "Autobomba Mercedes",
    certificationType: "Inspección Técnica Vehicular",
    issuedDate: "2024-01-15",
    expiryDate: "2025-01-15",
    status: "active",
    issuingAuthority: "SENASA",
    certificateNumber: "ITV-2024-001",
    inspector: "Ing. Roberto Silva",
    documents: ["certificate.pdf", "inspection-report.pdf"],
  },
  {
    id: "cert-002",
    equipmentId: "RES-001",
    equipmentName: "Equipo de Rescate Vehicular",
    certificationType: "Certificación de Equipos de Rescate",
    issuedDate: "2023-08-20",
    expiryDate: "2024-08-20",
    status: "expiring",
    issuingAuthority: "Cuerpo de Bomberos Nacional",
    certificateNumber: "CER-2023-045",
    inspector: "Cap. María González",
    documents: ["rescue-cert.pdf"],
  },
  {
    id: "cert-003",
    equipmentId: "EPP-012",
    equipmentName: "Equipo de Respiración Autónoma",
    certificationType: "Certificación de Seguridad EPP",
    issuedDate: "2023-06-10",
    expiryDate: "2024-06-10",
    status: "expired",
    issuingAuthority: "Instituto de Seguridad Laboral",
    certificateNumber: "EPP-2023-078",
    inspector: "Ing. Laura Mendez",
    documents: ["epp-cert.pdf"],
  },
]

const inspectionMetrics = {
  pendingThisMonth: 12,
  certificationsExpiring: 3,
  overallCompliance: 87.5,
  overdueInspections: 2,
}

const complianceByType = [
  { type: "EPP", compliance: 92, total: 45 },
  { type: "Vehículos", compliance: 85, total: 12 },
  { type: "Rescate", compliance: 88, total: 28 },
  { type: "Comunicación", compliance: 90, total: 22 },
  { type: "Médico", compliance: 95, total: 20 },
]

const inspectionTrend = [
  { month: "Ene", completed: 18, scheduled: 20 },
  { month: "Feb", completed: 22, scheduled: 25 },
  { month: "Mar", completed: 19, scheduled: 22 },
  { month: "Abr", completed: 24, scheduled: 26 },
  { month: "May", completed: 21, scheduled: 23 },
  { month: "Jun", completed: 20, scheduled: 22 },
]

export default function InspectionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedInspection, setSelectedInspection] = useState<InspectionSchedule | null>(null)
  const [inspectionModal, setInspectionModal] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCertificationStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "expiring":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "expired":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getInspectionTypeConfig = (typeId: string) => {
    return inspectionTypes.find((type) => type.id === typeId) || inspectionTypes[0]
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Inspecciones y Certificaciones</h1>
                  <p className="text-gray-600">Gestión integral de inspecciones y cumplimiento normativo</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Programar Inspección
                </Button>
              </div>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pendientes Este Mes</p>
                      <p className="text-3xl font-bold text-blue-600">{inspectionMetrics.pendingThisMonth}</p>
                    </div>
                    <SearchCheck className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Certificaciones por Vencer</p>
                      <p className="text-3xl font-bold text-yellow-600">{inspectionMetrics.certificationsExpiring}</p>
                    </div>
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cumplimiento General</p>
                      <p className="text-3xl font-bold text-green-600">{inspectionMetrics.overallCompliance}%</p>
                    </div>
                    <CheckSquare className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Inspecciones Vencidas</p>
                      <p className="text-3xl font-bold text-red-600">{inspectionMetrics.overdueInspections}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="calendar" className="space-y-6">
              <TabsList>
                <TabsTrigger value="calendar">Calendario</TabsTrigger>
                <TabsTrigger value="pending">Pendientes</TabsTrigger>
                <TabsTrigger value="completed">Completadas</TabsTrigger>
                <TabsTrigger value="certifications">Certificaciones</TabsTrigger>
                <TabsTrigger value="analytics">Análisis</TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Calendar */}
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Calendario
                      </CardTitle>
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

                  {/* Scheduled Inspections */}
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Inspecciones Programadas</CardTitle>
                      <CardDescription>
                        {selectedDate
                          ? `Inspecciones para ${selectedDate.toLocaleDateString()}`
                          : "Próximas inspecciones"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingInspections.map((inspection) => {
                          const typeConfig = getInspectionTypeConfig(inspection.inspectionType)
                          const IconComponent = typeConfig.icon
                          return (
                            <div
                              key={inspection.id}
                              className="flex items-center justify-between p-4 border rounded-lg"
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  className={`w-12 h-12 bg-${typeConfig.color}-100 rounded-lg flex items-center justify-center`}
                                >
                                  <IconComponent className={`h-6 w-6 text-${typeConfig.color}-600`} />
                                </div>
                                <div>
                                  <p className="font-medium">{inspection.equipmentName}</p>
                                  <p className="text-sm text-gray-500">{typeConfig.name}</p>
                                  <div className="flex items-center gap-4 mt-1">
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <CalendarIcon className="h-3 w-3" />
                                      {new Date(inspection.scheduledDate).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <Clock className="h-3 w-3" />
                                      {inspection.estimatedDuration} min
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <User className="h-3 w-3" />
                                      {inspection.inspectorName}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <MapPin className="h-3 w-3" />
                                      {inspection.location}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getPriorityColor(inspection.priority)}>{inspection.priority}</Badge>
                                <Badge className={getStatusColor(inspection.status)}>{inspection.status}</Badge>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Ejecutar Inspección</DialogTitle>
                                      <DialogDescription>
                                        {typeConfig.name} - {inspection.equipmentName}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <InspectionExecutionForm inspection={inspection} typeConfig={typeConfig} />
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pending" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Inspecciones Pendientes</CardTitle>
                    <CardDescription>Inspecciones programadas que requieren ejecución</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Equipo</TableHead>
                            <TableHead>Tipo de Inspección</TableHead>
                            <TableHead>Fecha Programada</TableHead>
                            <TableHead>Inspector</TableHead>
                            <TableHead>Prioridad</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {upcomingInspections.map((inspection) => {
                            const typeConfig = getInspectionTypeConfig(inspection.inspectionType)
                            return (
                              <TableRow key={inspection.id}>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">{inspection.equipmentName}</p>
                                    <p className="text-sm text-gray-500">{inspection.equipmentId}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <typeConfig.icon className="h-4 w-4" />
                                    {typeConfig.name}
                                  </div>
                                </TableCell>
                                <TableCell>{new Date(inspection.scheduledDate).toLocaleDateString()}</TableCell>
                                <TableCell>{inspection.inspectorName}</TableCell>
                                <TableCell>
                                  <Badge className={getPriorityColor(inspection.priority)}>{inspection.priority}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(inspection.status)}>{inspection.status}</Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Inspecciones Completadas</CardTitle>
                    <CardDescription>Historial de inspecciones realizadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <SearchCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No hay inspecciones completadas para mostrar</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestión de Certificaciones</CardTitle>
                    <CardDescription>Control de certificaciones y documentos oficiales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Equipo</TableHead>
                            <TableHead>Tipo de Certificación</TableHead>
                            <TableHead>Número</TableHead>
                            <TableHead>Fecha de Emisión</TableHead>
                            <TableHead>Fecha de Vencimiento</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Autoridad</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {certifications.map((cert) => (
                            <TableRow key={cert.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{cert.equipmentName}</p>
                                  <p className="text-sm text-gray-500">{cert.equipmentId}</p>
                                </div>
                              </TableCell>
                              <TableCell>{cert.certificationType}</TableCell>
                              <TableCell className="font-mono text-sm">{cert.certificateNumber}</TableCell>
                              <TableCell>{new Date(cert.issuedDate).toLocaleDateString()}</TableCell>
                              <TableCell>{new Date(cert.expiryDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge className={getCertificationStatusColor(cert.status)}>
                                  {cert.status === "active" && "Vigente"}
                                  {cert.status === "expiring" && "Por Vencer"}
                                  {cert.status === "expired" && "Vencida"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm">{cert.issuingAuthority}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  {cert.status === "expiring" || cert.status === "expired" ? (
                                    <Button variant="ghost" size="sm" className="text-blue-600">
                                      Renovar
                                    </Button>
                                  ) : null}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Compliance by Type */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Cumplimiento por Tipo de Equipo</CardTitle>
                      <CardDescription>Porcentaje de cumplimiento de inspecciones</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={complianceByType}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${value}%`} />
                            <Bar dataKey="compliance" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Inspection Trend */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Tendencia de Inspecciones</CardTitle>
                      <CardDescription>Inspecciones programadas vs completadas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={inspectionTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="scheduled" stroke="#f59e0b" name="Programadas" />
                            <Line type="monotone" dataKey="completed" stroke="#10b981" name="Completadas" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Inspection Types Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tipos de Inspección Configurados</CardTitle>
                    <CardDescription>Configuración de tipos de inspección y sus frecuencias</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {inspectionTypes.map((type) => {
                        const IconComponent = type.icon
                        return (
                          <Card key={type.id} className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={`w-10 h-10 bg-${type.color}-100 rounded-lg flex items-center justify-center`}
                              >
                                <IconComponent className={`h-5 w-5 text-${type.color}-600`} />
                              </div>
                              <div>
                                <h4 className="font-medium">{type.name}</h4>
                                <p className="text-sm text-gray-500">Cada {type.frequency} días</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-gray-700">Checklist:</p>
                              {type.checklist.slice(0, 2).map((item, index) => (
                                <p key={index} className="text-xs text-gray-500">
                                  • {item}
                                </p>
                              ))}
                              {type.checklist.length > 2 && (
                                <p className="text-xs text-gray-400">+{type.checklist.length - 2} más...</p>
                              )}
                            </div>
                          </Card>
                        )
                      })}
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

function InspectionExecutionForm({
  inspection,
  typeConfig,
}: { inspection: InspectionSchedule; typeConfig: InspectionType }) {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({})
  const [notes, setNotes] = useState<{ [key: string]: string }>({})
  const [generalObservations, setGeneralObservations] = useState("")
  const [inspectionResult, setInspectionResult] = useState<"passed" | "failed" | "conditional" | "">("")

  const handleChecklistChange = (itemIndex: number, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemIndex]: checked,
    }))
  }

  const handleNotesChange = (itemIndex: number, note: string) => {
    setNotes((prev) => ({
      ...prev,
      [itemIndex]: note,
    }))
  }

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      {/* Equipment Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-${typeConfig.color}-100 rounded-lg flex items-center justify-center`}>
              <typeConfig.icon className={`h-6 w-6 text-${typeConfig.color}-600`} />
            </div>
            <div>
              <h3 className="font-semibold">{inspection.equipmentName}</h3>
              <p className="text-sm text-gray-500">{inspection.equipmentId}</p>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <CalendarIcon className="h-3 w-3" />
                  {new Date(inspection.scheduledDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <User className="h-3 w-3" />
                  {inspection.inspectorName}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  {inspection.location}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Lista de Verificación
          </CardTitle>
          <CardDescription>{typeConfig.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {typeConfig.checklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={checkedItems[index] || false}
                  onCheckedChange={(checked) => handleChecklistChange(index, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item}</p>
                  <Textarea
                    placeholder="Notas u observaciones..."
                    value={notes[index] || ""}
                    onChange={(e) => handleNotesChange(index, e.target.value)}
                    className="mt-2"
                    rows={2}
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* General Evaluation */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluación General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Resultado de la Inspección</Label>
            <Select value={inspectionResult} onValueChange={(value) => setInspectionResult(value as "" | "passed" | "failed" | "conditional")}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar resultado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passed">Aprobado</SelectItem>
                <SelectItem value="conditional">Aprobado con Observaciones</SelectItem>
                <SelectItem value="failed">Rechazado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Observaciones Generales</Label>
            <Textarea
              placeholder="Observaciones generales de la inspección..."
              value={generalObservations}
              onChange={(e) => setGeneralObservations(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Evidencias</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Arrastra archivos aquí o haz clic para seleccionar</p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                Seleccionar Archivos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline">Guardar Borrador</Button>
        <Button disabled={!inspectionResult} className="bg-blue-600 hover:bg-blue-700">
          Completar Inspección
        </Button>
      </div>
    </div>
  )
}
