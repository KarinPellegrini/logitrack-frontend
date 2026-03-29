# Visión, Elevator Pitch y Stakeholders
## 1. Visión del Producto

### Oportunidad / Problema

Las operaciones logísticas frecuentemente funcionan con información dispersa, poco seguimiento y nula anticipación de riesgos. Esto complica la gestión de envíos y genera retrasos. La falta de trazabilidad y priorización dificulta la toma de decisiones oportunas.

### Solución

LogiTrack es un sistema que registra, rastrea y prioriza envíos automáticamente utilizando inteligencia artificial, clasificándolos en **Alta, Media o Baja prioridad** según distancia, tipo de carga, restricciones y saturación simulada de rutas.

El sistema contempla el cumplimiento de la **Ley 25.326**, asegurando que los datos personales de remitentes y destinatarios se manejen bajo estándares adecuados de privacidad.

**El MVP incluye:**
- Registro de envíos con tracking automático
- Búsqueda y listado de envíos
- Cambio de estado con auditoría completa
- Roles diferenciados para Operador y Supervisor
- Priorización inteligente simulada por IA

### Perfil de Usuarios

| Rol | Descripción |
|-----|-------------|
| **Operador** | Carga y consulta envíos en el sistema |
| **Supervisor** | Controla estados, audita acciones y valida el trabajo |
| **Empresa logística (simulada)** | Interesada en reducir riesgos y mejorar la trazabilidad |

### Beneficios Esperados

- Anticipación temprana de envíos con riesgo, reduciendo re-trabajos
- Trazabilidad y control mejorados gracias a la auditoría completa
- Flujo de trabajo claro diferenciado por roles
- Base sólida y reutilizable para el TP Principal del cuatrimestre
- Práctica real de Scrum, estimación, riesgos y gestión del proyecto

---

## 2. Elevator Pitch

> **HOOK:** El seguimiento de envíos en muchas empresas hoy es una planilla de Excel, un grupo de WhatsApp y mucha fe. Nadie sabe cuál paquete va a llegar tarde hasta que ya es demasiado tarde.
>
> **WHAT WE DO:** LogiTrack es un sistema que registra, rastrea y prioriza envíos automáticamente usando inteligencia artificial: clasifica cada envío como Alta, Media o Baja prioridad considerando distancia, tipo de carga, restricciones y saturación de rutas. Operadores y supervisores trabajan juntos, con roles diferenciados y auditoría completa de cada cambio de estado.
>
> **RESULTS:** El resultado es una operación logística donde los problemas se anticipan en lugar de apagarse, con trazabilidad total y cumplimiento con la Ley 25.326 — porque los datos de los clientes también son responsabilidad del sistema.
>
> **CONVERSATION STARTER:** ¿Cuántos envíos manejan por día y qué impacto tendría en sus costos reducir los retrasos a la mitad?

---

## 3. Stakeholders

### Tabla de Stakeholders

| ID | Stakeholder | Tipo | Interés / Expectativa | Influencia | Impacto | Posición | Cuadrante | Estrategia de Gestión | Organización |
|----|-------------|------|-----------------------|------------|---------|----------|-----------|-----------------------|--------------|
| SK-01 | Product Owner (Docente) | Interno | Evaluar gestión del proyecto, aplicación de Scrum y comunicación. Define el backlog y brinda feedback oficial. | ALTA | ALTO | Favorable | 🔴 Gestionar de cerca | Reuniones semanales de revisión (Sprint Review). Acta formal de cada interacción. Es la fuente principal de requisitos. | Universidad |
| SK-02 | Equipo de Desarrollo (Estudiantes) | Interno | Aprobar la materia, aprender metodologías ágiles y construir el MVP. Responsables de la ejecución total del proyecto. | ALTA | ALTO | Favorable | 🔴 Gestionar de cerca | Daily standups internos. Backlog compartido. Definir DoR/DoD y Working Agreement como acuerdos de equipo. | Equipo LogiTrack |
| SK-03 | Operador del sistema (usuario simulado) | Externo | Registrar envíos, asignar tracking IDs y buscar paquetes por destinatario. Necesita una interfaz simple y ágil. | BAJA | ALTO | Neutral | 🟢 Mantener informado | Diseñar las historias de usuario desde su perspectiva. Validar prototipos con criterios de aceptación del Operador. | LogiTrack |
| SK-04 | Supervisor del sistema (usuario simulado) | Externo | Cambiar estados de envíos, auditar cambios y tener visibilidad ampliada respecto al Operador. | MEDIA | ALTO | Neutral | 🟢 Mantener informado | Definir claramente diferencias de rol y permisos en el backlog. Incluir en criterios de aceptación de historias de estado. | LogiTrack |
| SK-05 | Cliente / Empresa Logística (simulada) | Externo | Contar con un sistema que priorice envíos automáticamente según riesgo de retraso, gestione múltiples regiones y sea escalable. | ALTA | ALTO | Favorable | 🔴 Gestionar de cerca | Basar la visión del producto y el Elevator Pitch en sus necesidades. El modelo de ML de priorización responde directamente a este stakeholder. | LogiTrack |
| SK-06 | Remitentes (usuarios finales) | Externo | Que sus paquetes sean registrados correctamente y puedan rastrearlos. Sus datos personales son tratados bajo la Ley 25.326. | BAJA | MEDIO | Neutral | ⚪ Monitorear | Garantizar cumplimiento de Ley 25.326 (base de licitud, derechos ARCO). Incluir validaciones de datos en criterios de aceptación. | Personas físicas y/o jurídicas |
| SK-07 | Destinatarios (usuarios finales) | Externo | Recibir sus envíos en tiempo y forma. Pueden consultar el estado de un paquete mediante tracking ID. | BAJA | MEDIO | Neutral | ⚪ Monitorear | Asegurarse de que la búsqueda por tracking ID sea intuitiva en el prototipo. Sus datos también quedan bajo el marco de la Ley 25.326. | Personas físicas y/o jurídicas |
| SK-08 | Ente Regulador (DNPDP / Ley 25.326) | Externo | Que el sistema cumpla con la protección de datos personales. | ALTA | ALTO | Neutral | 🟡 Mantener satisfecho | Asegurarse de que el sistema no guarde más datos personales de los necesarios y que el usuario pueda solicitar ver, corregir o eliminar su información. Tenerlo en cuenta al diseñar cada funcionalidad que toque datos de remitentes o destinatarios. | Estado Nacional Argentino |
| SK-09 | Proveedores de ERP Logístico | Externo | Son referentes del mercado relevados en el informe de investigación. No participan activamente pero contextualizan las decisiones tecnológicas. | BAJA | BAJO | Favorable | ⚪ Monitorear | Relevar en el informe de investigación. Identificar funcionalidades estándar del mercado para informar el backlog. | SAP, Oracle WMS, Softland, etc. |

### Mapa de Poder / Interés

| Cuadrante | Stakeholders |
|-----------|-------------|
| 🔴 **Gestionar de cerca** (Alto poder, alto interés) | SK-01 Docente/PO · SK-02 Equipo de Desarrollo · SK-05 Cliente/Empresa Logística |
| 🟡 **Mantener satisfecho** (Alto poder, bajo interés) | SK-08 Ente Regulador (DNPDP / Ley 25.326) |
| 🟢 **Mantener informado** (Bajo poder, alto interés) | SK-03 Operador (simulado) · SK-04 Supervisor (simulado) |
| ⚪ **Monitorear** (Bajo poder, bajo interés) | SK-06 Remitentes · SK-07 Destinatarios · SK-09 Proveedores de ERP |
