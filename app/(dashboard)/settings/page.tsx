"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Tags,
  Users,
  Bell,
  Database,
  Cog,
  Save,
  Plus,
  Edit,
  Trash2,
  Shield,
  Scissors,
  Truck,
  Radio,
  Heart,
  Download,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface GeneralConfig {
  stationName: string
  stationAddress: string
  contactPhone: string
  contactEmail: string
  timeZone: string
  language: string
  dateFormat: string
  maintenanceAlert: number
  inspectionAlert: number
}

interface EquipmentType {
  id: string
  name: string
  description: string
  icon: string
  maintenanceDays: number
  inspectionDays: number
}

interface UserRole {
  id: string
  name: string
  description: string
  permissions: string[]
  color: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  lastAccess: string
}

const equipmentTypes: EquipmentType[] = [
  {
    id: "epp",
    name: "Equipo de Protección Personal",
    description: "Cascos, botas, trajes, guantes",
    icon: "Shield",
    maintenanceDays: 30,
    inspectionDays: 7,
  },
  {
    id: "rescue",
    name: "Equipos de Rescate",
    description: "Herramientas de corte, separación, rescate",
    icon: "Scissors",
    maintenanceDays: 90,
    inspectionDays: 15,
  },
  {
    id: "vehicle",
    name: "Vehículos y Maquinaria",
    description: "Autobombas, ambulancias, motobombas",
    icon: "Truck",
    maintenanceDays: 30,
    inspectionDays: 7,
  },
  {
    id: "communication",
    name: "Equipos de Comunicación",
    description: "Radios, repetidores, sistemas",
    icon: "Radio",
    maintenanceDays: 180,
    inspectionDays: 30,
  },
  {
    id: "medical",
    name: "Equipos Médicos",
    description: "Primeros auxilios, desfibriladores",
    icon: "Heart",
    maintenanceDays: 60,
    inspectionDays: 14,
  },
]

const userRoles: UserRole[] = [
  {
    id: "admin",
    name: "Administrador",
    description: "Acceso completo al sistema",
    permissions: ["read", "write", "delete", "config"],
    color: "red",
  },
  {
    id: "chief",
    name: "Jefe de Estación",
    description: "Supervisión y aprobaciones",
    permissions: ["read", "write", "approve"],
    color: "blue",
  },
  {
    id: "firefighter",
    name: "Bombero",
    description: "Consulta y reportes básicos",
    permissions: ["read", "report"],
    color: "green",
  },
  {
    id: "technician",
    name: "Técnico",
    description: "Mantenimiento e inspecciones",
    permissions: ["read", "write", "maintain"],
    color: "yellow",
  },
]

const users: User[] = [
  {
    id: "1",
    name: "José García",
    email: "jose.garcia@cuartel.com",
    role: "admin",
    status: "active",
    lastAccess: "2024-06-20T10:30:00Z",
  },
  {
    id: "2",
    name: "María López",
    email: "maria.lopez@cuartel.com",
    role: "chief",
    status: "active",
    lastAccess: "2024-06-20T09:15:00Z",
  },
  {
    id: "3",
    name: "Carlos Ruiz",
    email: "carlos.ruiz@cuartel.com",
    role: "firefighter",
    status: "active",
    lastAccess: "2024-06-19T16:45:00Z",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana.martinez@cuartel.com",
    role: "technician",
    status: "active",
    lastAccess: "2024-06-20T08:00:00Z",
  },
]

const iconMap = {
  Shield: Shield,
  Scissors: Scissors,
  Truck: Truck,
  Radio: Radio,
  Heart: Heart,
}

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [generalConfig, setGeneralConfig] = useState<GeneralConfig>({
    stationName: "Cuartel Central de Bomberos",
    stationAddress: "Av. Principal 123, Ciudad",
    contactPhone: "+1 234 567 8900",
    contactEmail: "contacto@cuartel.com",
    timeZone: "America/Mexico_City",
    language: "es",
    dateFormat: "dd/MM/yyyy",
    maintenanceAlert: 7,
    inspectionAlert: 3,
  })

  const [notifications, setNotifications] = useState({
    emailMaintenanceOverdue: true,
    emailEquipmentOutOfService: true,
    emailInspectionsPending: true,
    emailWeeklyReports: false,
    appCriticalAlerts: true,
    appMaintenanceReminders: true,
    appNewAssignments: true,
  })

  const [backupConfig, setBackupConfig] = useState({
    autoBackup: true,
    frequency: "weekly",
    retention: 30,
  })

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const handleSave = async () => {
    setSaveStatus("saving")
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 1000)
  }

  const getRoleColor = (roleId: string) => {
    const role = userRoles.find((r) => r.id === roleId)
    return role?.color || "gray"
  }

  const getRoleName = (roleId: string) => {
    const role = userRoles.find((r) => r.id === roleId)
    return role?.name || roleId
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración del Sistema</h1>
            <p className="text-gray-600">Personaliza y administra la configuración del cuartel</p>
          </div>
          <Button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saveStatus === "saving" ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Guardando...
              </>
            ) : saveStatus === "saved" ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Guardado
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="equipment-types" className="flex items-center gap-2">
            <Tags className="h-4 w-4" />
            Tipos de Equipos
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Respaldo
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Cog className="h-4 w-4" />
            Avanzada
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Información básica del cuartel y configuración regional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stationName">Nombre del Cuartel</Label>
                  <Input
                    id="stationName"
                    value={generalConfig.stationName}
                    onChange={(e) => setGeneralConfig({ ...generalConfig, stationName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Teléfono de Contacto</Label>
                  <Input
                    id="contactPhone"
                    value={generalConfig.contactPhone}
                    onChange={(e) => setGeneralConfig({ ...generalConfig, contactPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stationAddress">Dirección del Cuartel</Label>
                <Textarea
                  id="stationAddress"
                  value={generalConfig.stationAddress}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, stationAddress: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de Contacto</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalConfig.contactEmail}
                    onChange={(e) => setGeneralConfig({ ...generalConfig, contactEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Zona Horaria</Label>
                  <Select
                    value={generalConfig.timeZone}
                    onValueChange={(value) => setGeneralConfig({ ...generalConfig, timeZone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Mexico_City">México (GMT-6)</SelectItem>
                      <SelectItem value="America/New_York">Este (GMT-5)</SelectItem>
                      <SelectItem value="America/Chicago">Centro (GMT-6)</SelectItem>
                      <SelectItem value="America/Denver">Montaña (GMT-7)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacífico (GMT-8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={generalConfig.language}
                    onValueChange={(value) => setGeneralConfig({ ...generalConfig, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Formato de Fecha</Label>
                  <Select
                    value={generalConfig.dateFormat}
                    onValueChange={(value) => setGeneralConfig({ ...generalConfig, dateFormat: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maintenanceAlert">Alerta de Mantenimiento (días)</Label>
                  <Input
                    id="maintenanceAlert"
                    type="number"
                    value={generalConfig.maintenanceAlert}
                    onChange={(e) =>
                      setGeneralConfig({ ...generalConfig, maintenanceAlert: Number.parseInt(e.target.value) })
                    }
                  />
                  <p className="text-sm text-gray-500">Días antes del vencimiento para mostrar alerta</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspectionAlert">Alerta de Inspección (días)</Label>
                  <Input
                    id="inspectionAlert"
                    type="number"
                    value={generalConfig.inspectionAlert}
                    onChange={(e) =>
                      setGeneralConfig({ ...generalConfig, inspectionAlert: Number.parseInt(e.target.value) })
                    }
                  />
                  <p className="text-sm text-gray-500">Días antes del vencimiento para mostrar alerta</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment-types">
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Equipos</CardTitle>
              <CardDescription>Gestiona los diferentes tipos de equipos y sus configuraciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Tipos Registrados</h3>
                  <p className="text-sm text-gray-500">{equipmentTypes.length} tipos configurados</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Tipo
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Mantenimiento</TableHead>
                      <TableHead>Inspección</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipmentTypes.map((type) => {
                      const IconComponent = iconMap[type.icon as keyof typeof iconMap] || Shield
                      return (
                        <TableRow key={type.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <IconComponent className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">{type.name}</p>
                                <p className="text-sm text-gray-500">{type.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{type.description}</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{type.maintenanceDays} días</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{type.inspectionDays} días</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="neutral" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="neutral" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
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

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Usuarios y Roles</CardTitle>
              <CardDescription>Administra los usuarios del sistema y sus permisos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Roles Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Roles del Sistema</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userRoles.map((role) => (
                      <Card key={role.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{role.name}</h4>
                            <p className="text-sm text-gray-500">{role.description}</p>
                            <div className="flex gap-1 mt-2">
                              {role.permissions.map((permission) => (
                                <Badge key={permission} variant="neutral" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className={`w-3 h-3 rounded-full bg-${role.color}-500`}></div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Users Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Usuarios</h3>
                      <p className="text-sm text-gray-500">{users.length} usuarios registrados</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Usuario
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Usuario</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Último Acceso</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge
                                className={`bg-${getRoleColor(user.role)}-100 text-${getRoleColor(user.role)}-800`}
                              >
                                {getRoleName(user.role)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.status === "active" ? "default" : "neutral"}>
                                {user.status === "active" ? "Activo" : "Inactivo"}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(user.lastAccess).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
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
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>Personaliza cuándo y cómo recibir notificaciones del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Notificaciones por Email</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mantenimientos vencidos</Label>
                      <p className="text-sm text-gray-500">
                        Recibir alertas cuando los mantenimientos estén vencidos
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailMaintenanceOverdue}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailMaintenanceOverdue: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Equipos fuera de servicio</Label>
                      <p className="text-sm text-gray-500">Notificar cuando un equipo esté fuera de servicio</p>
                    </div>
                    <Switch
                      checked={notifications.emailEquipmentOutOfService}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailEquipmentOutOfService: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Inspecciones pendientes</Label>
                      <p className="text-sm text-gray-500">Recordatorios de inspecciones programadas</p>
                    </div>
                    <Switch
                      checked={notifications.emailInspectionsPending}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailInspectionsPending: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Reportes semanales</Label>
                      <p className="text-sm text-gray-500">Resumen semanal del estado de equipos</p>
                    </div>
                    <Switch
                      checked={notifications.emailWeeklyReports}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailWeeklyReports: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Notificaciones en la Aplicación</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertas críticas</Label>
                      <p className="text-sm text-gray-500">Notificaciones inmediatas para situaciones críticas</p>
                    </div>
                    <Switch
                      checked={notifications.appCriticalAlerts}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, appCriticalAlerts: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Recordatorios de mantenimiento</Label>
                      <p className="text-sm text-gray-500">Recordatorios de mantenimientos próximos</p>
                    </div>
                    <Switch
                      checked={notifications.appMaintenanceReminders}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, appMaintenanceReminders: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Nuevas asignaciones</Label>
                      <p className="text-sm text-gray-500">Notificar cuando se asigne un equipo</p>
                    </div>
                    <Switch
                      checked={notifications.appNewAssignments}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, appNewAssignments: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Respaldo y Restauración</CardTitle>
              <CardDescription>Administra los respaldos automáticos y manuales del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Respaldo Automático</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Habilitar respaldo automático</Label>
                      <p className="text-sm text-gray-500">Crear respaldos automáticos del sistema</p>
                    </div>
                    <Switch
                      checked={backupConfig.autoBackup}
                      onCheckedChange={(checked) => setBackupConfig({ ...backupConfig, autoBackup: checked })}
                    />
                  </div>
                  {backupConfig.autoBackup && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Frecuencia</Label>
                        <Select
                          value={backupConfig.frequency}
                          onValueChange={(value) => setBackupConfig({ ...backupConfig, frequency: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Diaria</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                            <SelectItem value="monthly">Mensual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Retención (días)</Label>
                        <Input
                          type="number"
                          value={backupConfig.retention}
                          onChange={(e) =>
                            setBackupConfig({ ...backupConfig, retention: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Respaldo Manual</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Database className="h-4 w-4 mr-2" />
                      Crear Respaldo Ahora
                    </Button>
                    <p className="text-sm text-gray-500">Último respaldo: 20/06/2024 10:30</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Respaldos Recientes</h4>
                    <div className="space-y-2">
                      {[
                        { date: "20/06/2024", time: "10:30", size: "2.3 MB" },
                        { date: "13/06/2024", time: "10:30", size: "2.1 MB" },
                        { date: "06/06/2024", time: "10:30", size: "2.0 MB" },
                      ].map((backup, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <p className="text-sm font-medium">
                              {backup.date} {backup.time}
                            </p>
                            <p className="text-xs text-gray-500">{backup.size}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="neutral" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="neutral" size="sm">
                              Restaurar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Exportación de Datos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="neutral" className="flex items-center gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Exportar Inventario
                  </Button>
                  <Button variant="neutral" className="flex items-center gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Exportar Mantenimientos
                  </Button>
                  <Button variant="neutral" className="flex items-center gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Exportar Reportes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Configuración Avanzada</CardTitle>
              <CardDescription>Configuraciones técnicas y opciones avanzadas del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-800">Precaución</h4>
                </div>
                <p className="text-sm text-yellow-700">
                  Las configuraciones avanzadas pueden afectar el funcionamiento del sistema. Consulte con el
                  administrador técnico antes de realizar cambios.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Límite de sesión (minutos)</Label>
                  <Input type="number" defaultValue="60" />
                  <p className="text-sm text-gray-500">Tiempo antes de cerrar sesión automáticamente</p>
                </div>
                <div className="space-y-2">
                  <Label>Intentos de login permitidos</Label>
                  <Input type="number" defaultValue="3" />
                  <p className="text-sm text-gray-500">Intentos antes de bloquear la cuenta</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Logs del Sistema</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Registrar acciones de usuarios</Label>
                      <p className="text-sm text-gray-500">Mantener log de todas las acciones realizadas</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Registrar errores del sistema</Label>
                      <p className="text-sm text-gray-500">Guardar información de errores para diagnóstico</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Retención de logs (días)</Label>
                    <Input type="number" defaultValue="90" />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Mantenimiento del Sistema</h3>
                <div className="space-y-4">
                  <Button variant="neutral" className="w-full bg-transparent">
                    <Database className="h-4 w-4 mr-2" />
                    Optimizar Base de Datos
                  </Button>
                  <Button variant="neutral" className="w-full bg-transparent">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Limpiar Archivos Temporales
                  </Button>
                  <Button variant="neutral" className="w-full text-red-600 hover:text-red-700 bg-transparent">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Restablecer Configuración
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
