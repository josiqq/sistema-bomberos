export interface Equipment {
  id: string
  name: string
  type: "EPP" | "Rescate" | "Vehículo" | "Comunicación" | "Médico"
  status: "Operativo" | "En mantenimiento" | "Fuera de servicio"
  location: string
  lastInspection: string
  assignedTo: string | null
  brand?: string
  model?: string
  acquisitionDate?: string
  observations?: string
}

export interface Maintenance {
  id: string
  equipmentId: string
  type: "Preventivo" | "Correctivo"
  scheduledDate: string
  technician: string
  description: string
  status: "Pendiente" | "En proceso" | "Completado"
}

export interface Assignment {
  id: string
  equipmentId: string
  firefighterId: string
  firefighterName: string
  assignedDate: string
  returnDate?: string
  observations?: string
}

export const users = [
  {
    id: "1",
    name: "José García",
    email: "jose.garcia@cuartel.com",
    role: "admin",
    password: "password123", // NOTA: Las contraseñas deben estar hasheadas en una aplicación real
    status: "active",
    lastAccess: "2024-06-20T10:30:00Z",
  },
  {
    id: "2",
    name: "María López",
    email: "maria.lopez@cuartel.com",
    role: "chief",
    password: "password123",
    status: "active",
    lastAccess: "2024-06-20T09:15:00Z",
  },
  {
    id: "3",
    name: "Carlos Ruiz",
    email: "carlos.ruiz@cuartel.com",
    role: "firefighter",
    password: "password123",
    status: "active",
    lastAccess: "2024-06-19T16:45:00Z",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana.martinez@cuartel.com",
    role: "technician",
    password: "password123",
    status: "active",
    lastAccess: "2024-06-20T08:00:00Z",
  },
];

export const equipmentData: Equipment[] = [
  {
    id: "EPP-001",
    name: "Casco Estructural MSA",
    type: "EPP",
    status: "Operativo",
    location: "Almacén Principal",
    lastInspection: "2024-06-15",
    assignedTo: "José García",
    brand: "MSA",
    model: "F1XF",
    acquisitionDate: "2023-01-15",
  },
  {
    id: "EPP-002",
    name: "Equipo de Respiración Autónoma",
    type: "EPP",
    status: "En mantenimiento",
    location: "Taller de Equipos",
    lastInspection: "2024-06-10",
    assignedTo: null,
    brand: "Dräger",
    model: "PSS 4000",
    acquisitionDate: "2023-03-20",
  },
  {
    id: "VEH-001",
    name: "Autobomba Mercedes 1423",
    type: "Vehículo",
    status: "En mantenimiento",
    location: "Taller mecánico",
    lastInspection: "2024-06-10",
    assignedTo: null,
    brand: "Mercedes-Benz",
    model: "1423",
    acquisitionDate: "2020-05-10",
  },
  {
    id: "RES-001",
    name: "Equipo de Corte Hidráulico",
    type: "Rescate",
    status: "Fuera de servicio",
    location: "Unidad de Rescate",
    lastInspection: "2024-05-20",
    assignedTo: null,
    brand: "Holmatro",
    model: "ICU 5120",
    acquisitionDate: "2022-08-15",
  },
  {
    id: "COM-001",
    name: "Radio Portátil Motorola",
    type: "Comunicación",
    status: "Operativo",
    location: "Sala de Comunicaciones",
    lastInspection: "2024-06-18",
    assignedTo: "María López",
    brand: "Motorola",
    model: "APX 6000",
    acquisitionDate: "2023-11-05",
  },
  {
    id: "MED-001",
    name: "Desfibrilador Automático",
    type: "Médico",
    status: "Operativo",
    location: "Ambulancia 1",
    lastInspection: "2024-06-12",
    assignedTo: "Carlos Ruiz",
    brand: "Philips",
    model: "HeartStart FRx",
    acquisitionDate: "2023-07-22",
  },
  {
    id: "EPP-003",
    name: "Traje de Aproximación",
    type: "EPP",
    status: "Operativo",
    location: "Vestuario Especializado",
    lastInspection: "2024-06-08",
    assignedTo: "Ana Martínez",
    brand: "Lion",
    model: "Janesville",
    acquisitionDate: "2023-09-10",
  },
  {
    id: "RES-002",
    name: "Escalera Mecánica 30m",
    type: "Rescate",
    status: "Operativo",
    location: "Autobomba Principal",
    lastInspection: "2024-06-14",
    assignedTo: null,
    brand: "Magirus",
    model: "DLK 23-12",
    acquisitionDate: "2021-12-03",
  },
]

export const maintenanceData: Maintenance[] = [
  {
    id: "MANT-001",
    equipmentId: "EPP-002",
    type: "Preventivo",
    scheduledDate: "2024-06-20",
    technician: "Pedro Sánchez",
    description: "Revisión completa del sistema de respiración",
    status: "En proceso",
  },
  {
    id: "MANT-002",
    equipmentId: "VEH-001",
    type: "Correctivo",
    scheduledDate: "2024-06-15",
    technician: "Taller Municipal",
    description: "Reparación del sistema de bomba de agua",
    status: "Pendiente",
  },
  {
    id: "MANT-003",
    equipmentId: "RES-001",
    type: "Correctivo",
    scheduledDate: "2024-06-05",
    technician: "Servicio Técnico Holmatro",
    description: "Reparación de cilindro hidráulico",
    status: "Pendiente",
  },
  {
    id: "MANT-004",
    equipmentId: "MED-001",
    type: "Preventivo",
    scheduledDate: "2024-07-01",
    technician: "Servicio Técnico Philips",
    description: "Calibración y prueba de funcionamiento",
    status: "Pendiente",
  },
]

export const assignmentData: Assignment[] = [
  {
    id: "ASIG-001",
    equipmentId: "EPP-001",
    firefighterId: "BOMB-001",
    firefighterName: "José García",
    assignedDate: "2024-06-01",
    observations: "Asignación permanente como Jefe de Equipos",
  },
  {
    id: "ASIG-002",
    equipmentId: "COM-001",
    firefighterId: "BOMB-002",
    firefighterName: "María López",
    assignedDate: "2024-06-10",
    observations: "Para servicio de guardia nocturna",
  },
  {
    id: "ASIG-003",
    equipmentId: "MED-001",
    firefighterId: "BOMB-003",
    firefighterName: "Carlos Ruiz",
    assignedDate: "2024-06-05",
    observations: "Responsable de equipos médicos",
  },
]

export const firefightersData = [
  {
    id: "BOMB-001",
    name: "José García",
    rank: "Jefe de Equipos",
    shift: "Mañana",
    specialization: "Rescate Técnico",
  },
  {
    id: "BOMB-002",
    name: "María López",
    rank: "Bombero Especialista",
    shift: "Noche",
    specialization: "Comunicaciones",
  },
  {
    id: "BOMB-003",
    name: "Carlos Ruiz",
    rank: "Bombero Paramédico",
    shift: "Tarde",
    specialization: "Emergencias Médicas",
  },
  {
    id: "BOMB-004",
    name: "Ana Martínez",
    rank: "Bombero",
    shift: "Mañana",
    specialization: "Incendios Estructurales",
  },
  {
    id: "BOMB-005",
    name: "Luis Rodríguez",
    rank: "Bombero",
    shift: "Tarde",
    specialization: "Materiales Peligrosos",
  },
]
