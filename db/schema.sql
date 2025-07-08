-- Creación de la Base de Datos
CREATE DATABASE IF NOT EXISTS `sistema_bomberos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sistema_bomberos`;

-- Tabla: roles
-- Almacena los roles de los usuarios del sistema.
CREATE TABLE `roles` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `color` varchar(20),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: users
-- Almacena la información de los usuarios que pueden acceder al sistema.
CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role_id` varchar(50) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `last_access` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: equipment_types
-- Define los diferentes tipos de equipos.
CREATE TABLE `equipment_types` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `icon` varchar(50) DEFAULT NULL,
  `maintenance_days` int(11) DEFAULT NULL,
  `inspection_days` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: equipment_status
-- Define los posibles estados de un equipo.
CREATE TABLE `equipment_status` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `color` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: equipment
-- Tabla principal para el inventario de equipos.
CREATE TABLE `equipment` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `equipment_type_id` varchar(50) DEFAULT NULL,
  `status_id` varchar(50) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `last_inspection` date DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `acquisition_date` date DEFAULT NULL,
  `observations` text,
  PRIMARY KEY (`id`),
  KEY `equipment_type_id` (`equipment_type_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`equipment_type_id`) REFERENCES `equipment_types` (`id`),
  CONSTRAINT `equipment_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `equipment_status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: firefighters
-- Almacena la información del personal de bomberos.
CREATE TABLE `firefighters` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `rank` varchar(50) DEFAULT NULL,
  `shift` varchar(50) DEFAULT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: assignments
-- Registra la asignación de equipos a los bomberos.
CREATE TABLE `assignments` (
  `id` varchar(50) NOT NULL,
  `equipment_id` varchar(50) NOT NULL,
  `firefighter_id` varchar(50) NOT NULL,
  `assigned_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `observations` text,
  PRIMARY KEY (`id`),
  KEY `equipment_id` (`equipment_id`),
  KEY `firefighter_id` (`firefighter_id`),
  CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`),
  CONSTRAINT `assignments_ibfk_2` FOREIGN KEY (`firefighter_id`) REFERENCES `firefighters` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: maintenance
-- Registra los mantenimientos de los equipos.
CREATE TABLE `maintenance` (
  `id` varchar(50) NOT NULL,
  `equipment_id` varchar(50) NOT NULL,
  `type` enum('Preventivo','Correctivo') NOT NULL,
  `scheduled_date` date NOT NULL,
  `technician` varchar(100) DEFAULT NULL,
  `description` text,
  `status` enum('Pendiente','En proceso','Completado') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `equipment_id` (`equipment_id`),
  CONSTRAINT `maintenance_ibfk_1` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: inspection_types
-- Define los tipos de inspecciones que se pueden realizar.
CREATE TABLE `inspection_types` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `frequency` int(11) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: inspections
-- Programa y registra las inspecciones de los equipos.
CREATE TABLE `inspections` (
  `id` varchar(50) NOT NULL,
  `equipment_id` varchar(50) NOT NULL,
  `inspection_type_id` varchar(50) NOT NULL,
  `scheduled_date` date NOT NULL,
  `estimated_duration` int(11) DEFAULT NULL,
  `inspector_id` varchar(50) DEFAULT NULL,
  `inspector_name` varchar(100) DEFAULT NULL,
  `priority` enum('low','medium','high','critical') DEFAULT 'medium',
  `location` varchar(100) DEFAULT NULL,
  `status` enum('scheduled','in-progress','completed','overdue') DEFAULT 'scheduled',
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `equipment_id` (`equipment_id`),
  KEY `inspection_type_id` (`inspection_type_id`),
  CONSTRAINT `inspections_ibfk_1` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`),
  CONSTRAINT `inspections_ibfk_2` FOREIGN KEY (`inspection_type_id`) REFERENCES `inspection_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: certifications
-- Almacena las certificaciones de los equipos.
CREATE TABLE `certifications` (
  `id` varchar(50) NOT NULL,
  `equipment_id` varchar(50) NOT NULL,
  `certification_type` varchar(100) NOT NULL,
  `issued_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `status` enum('active','expiring','expired') NOT NULL,
  `issuing_authority` varchar(100) DEFAULT NULL,
  `certificate_number` varchar(100) DEFAULT NULL,
  `inspector` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `equipment_id` (`equipment_id`),
  CONSTRAINT `certifications_ibfk_1` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Inserción de datos de ejemplo
--

-- Datos para `roles`
INSERT INTO `roles` (`id`, `name`, `description`, `color`) VALUES
('admin', 'Administrador', 'Acceso completo al sistema', 'red'),
('chief', 'Jefe de Estación', 'Supervisión y aprobaciones', 'blue'),
('firefighter', 'Bombero', 'Consulta y reportes básicos', 'green'),
('technician', 'Técnico', 'Mantenimiento e inspecciones', 'yellow');

-- Datos para `users`
INSERT INTO `users` (`id`, `name`, `email`, `role_id`, `status`, `last_access`) VALUES
('1', 'José García', 'jose.garcia@cuartel.com', 'admin', 'active', '2024-06-20 10:30:00'),
('2', 'María López', 'maria.lopez@cuartel.com', 'chief', 'active', '2024-06-20 09:15:00'),
('3', 'Carlos Ruiz', 'carlos.ruiz@cuartel.com', 'firefighter', 'active', '2024-06-19 16:45:00'),
('4', 'Ana Martínez', 'ana.martinez@cuartel.com', 'technician', 'active', '2024-06-20 08:00:00');

-- Datos para `equipment_types`
INSERT INTO `equipment_types` (`id`, `name`, `description`, `icon`, `maintenance_days`, `inspection_days`) VALUES
('epp', 'Equipo de Protección Personal', 'Cascos, botas, trajes, guantes', 'Shield', 30, 7),
('rescue', 'Equipos de Rescate', 'Herramientas de corte, separación, rescate', 'Scissors', 90, 15),
('vehicle', 'Vehículos y Maquinaria', 'Autobombas, ambulancias, motobombas', 'Truck', 30, 7),
('communication', 'Equipos de Comunicación', 'Radios, repetidores, sistemas', 'Radio', 180, 30),
('medical', 'Equipos Médicos', 'Primeros auxilios, desfibriladores', 'Heart', 60, 14);

-- Datos para `equipment_status`
INSERT INTO `equipment_status` (`id`, `name`, `color`) VALUES
('operational', 'Operativo', 'green'),
('maintenance', 'En mantenimiento', 'yellow'),
('out-of-service', 'Fuera de servicio', 'red'),
('repair', 'En Reparación', 'blue');

-- Datos para `equipment`
INSERT INTO `equipment` (`id`, `name`, `equipment_type_id`, `status_id`, `location`, `last_inspection`, `brand`, `model`, `acquisition_date`, `observations`) VALUES
('EPP-001', 'Casco Estructural MSA', 'epp', 'operational', 'Almacén Principal', '2024-06-15', 'MSA', 'F1XF', '2023-01-15', NULL),
('EPP-002', 'Equipo de Respiración Autónoma', 'epp', 'maintenance', 'Taller de Equipos', '2024-06-10', 'Dräger', 'PSS 4000', '2023-03-20', NULL),
('VEH-001', 'Autobomba Mercedes 1423', 'vehicle', 'maintenance', 'Taller mecánico', '2024-06-10', 'Mercedes-Benz', '1423', '2020-05-10', NULL),
('RES-001', 'Equipo de Corte Hidráulico', 'rescue', 'out-of-service', 'Unidad de Rescate', '2024-05-20', 'Holmatro', 'ICU 5120', '2022-08-15', NULL),
('COM-001', 'Radio Portátil Motorola', 'communication', 'operational', 'Sala de Comunicaciones', '2024-06-18', 'Motorola', 'APX 6000', '2023-11-05', NULL),
('MED-001', 'Desfibrilador Automático', 'medical', 'operational', 'Ambulancia 1', '2024-06-12', 'Philips', 'HeartStart FRx', '2023-07-22', NULL),
('EPP-003', 'Traje de Aproximación', 'epp', 'operational', 'Vestuario Especializado', '2024-06-08', 'Lion', 'Janesville', '2023-09-10', NULL),
('RES-002', 'Escalera Mecánica 30m', 'rescue', 'operational', 'Autobomba Principal', '2024-06-14', 'Magirus', 'DLK 23-12', '2021-12-03', NULL);

-- Datos para `firefighters`
INSERT INTO `firefighters` (`id`, `name`, `rank`, `shift`, `specialization`) VALUES
('BOMB-001', 'José García', 'Jefe de Equipos', 'Mañana', 'Rescate Técnico'),
('BOMB-002', 'María López', 'Bombero Especialista', 'Noche', 'Comunicaciones'),
('BOMB-003', 'Carlos Ruiz', 'Bombero Paramédico', 'Tarde', 'Emergencias Médicas'),
('BOMB-004', 'Ana Martínez', 'Bombero', 'Mañana', 'Incendios Estructurales'),
('BOMB-005', 'Luis Rodríguez', 'Bombero', 'Tarde', 'Materiales Peligrosos');

-- Datos para `assignments`
INSERT INTO `assignments` (`id`, `equipment_id`, `firefighter_id`, `assigned_date`, `return_date`, `observations`) VALUES
('ASIG-001', 'EPP-001', 'BOMB-001', '2024-06-01', NULL, 'Asignación permanente como Jefe de Equipos'),
('ASIG-002', 'COM-001', 'BOMB-002', '2024-06-10', NULL, 'Para servicio de guardia nocturna'),
('ASIG-003', 'MED-001', 'BOMB-003', '2024-06-05', NULL, 'Responsable de equipos médicos');

-- Datos para `maintenance`
INSERT INTO `maintenance` (`id`, `equipment_id`, `type`, `scheduled_date`, `technician`, `description`, `status`) VALUES
('MANT-001', 'EPP-002', 'Preventivo', '2024-06-20', 'Pedro Sánchez', 'Revisión completa del sistema de respiración', 'En proceso'),
('MANT-002', 'VEH-001', 'Correctivo', '2024-06-15', 'Taller Municipal', 'Reparación del sistema de bomba de agua', 'Pendiente'),
('MANT-003', 'RES-001', 'Correctivo', '2024-06-05', 'Servicio Técnico Holmatro', 'Reparación de cilindro hidráulico', 'Pendiente'),
('MANT-004', 'MED-001', 'Preventivo', '2024-07-01', 'Servicio Técnico Philips', 'Calibración y prueba de funcionamiento', 'Pendiente');

-- Datos para `inspection_types`
INSERT INTO `inspection_types` (`id`, `name`, `description`, `frequency`, `icon`, `color`) VALUES
('safety', 'Inspección de Seguridad', 'Verificación de sistemas de seguridad', 30, 'Shield', 'red'),
('maintenance', 'Inspección de Mantenimiento', 'Revisión técnica preventiva', 90, 'Wrench', 'yellow'),
('certification', 'Certificación Técnica', 'Certificación oficial requerida', 365, 'Award', 'blue'),
('regulatory', 'Inspección Regulatoria', 'Cumplimiento de normativas', 180, 'FileCheck', 'purple');

-- Datos para `inspections`
INSERT INTO `inspections` (`id`, `equipment_id`, `inspection_type_id`, `scheduled_date`, `estimated_duration`, `inspector_id`, `inspector_name`, `priority`, `location`, `status`, `notes`) VALUES
('insp-001', 'VEH-001', 'safety', '2024-07-10', 120, 'inspector-001', 'Ing. Carlos Ruiz', 'high', 'Taller Principal', 'scheduled', NULL),
('insp-002', 'EPP-002', 'certification', '2024-07-12', 90, 'inspector-002', 'Téc. Ana López', 'critical', 'Laboratorio de Equipos', 'scheduled', NULL),
('insp-003', 'RES-001', 'maintenance', '2024-07-08', 60, 'inspector-003', 'Téc. Miguel Santos', 'medium', 'Área de Rescate', 'overdue', NULL);

-- Datos para `certifications`
INSERT INTO `certifications` (`id`, `equipment_id`, `certification_type`, `issued_date`, `expiry_date`, `status`, `issuing_authority`, `certificate_number`, `inspector`) VALUES
('cert-001', 'VEH-001', 'Inspección Técnica Vehicular', '2024-01-15', '2025-01-15', 'active', 'SENASA', 'ITV-2024-001', 'Ing. Roberto Silva'),
('cert-002', 'RES-001', 'Certificación de Equipos de Rescate', '2023-08-20', '2024-08-20', 'expiring', 'Cuerpo de Bomberos Nacional', 'CER-2023-045', 'Cap. María González'),
('cert-003', 'EPP-002', 'Certificación de Seguridad EPP', '2023-06-10', '2024-06-10', 'expired', 'Instituto de Seguridad Laboral', 'EPP-2023-078', 'Ing. Laura Mendez');