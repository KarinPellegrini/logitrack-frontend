# Modelo de Dominio y Diagrama de Estados — LogiTrack

**Proyecto:** LogiTrack — Paquete Base de Gestión de Envíos (MVP)  
**Materia:** Proyecto Profesional I / Laboratorio de Construcción de Software  
**Grupo:** 06 — Comisión 01  
**Integrantes:** Scabini Melina Noelia · López Ciro Martín · Pellegrini Farnholc Karin Daniela  

---

## Modelo de Dominio

El modelo de dominio define las entidades principales del sistema y sus relaciones.

### Entidad: Envio

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `trackingId` | String | Identificador único generado automáticamente |
| `remitente` | String | Datos del remitente del envío |
| `destinatario` | String | Datos del destinatario del envío |
| `origen` | String | Localidad/región de origen |
| `destino` | String | Localidad/región de destino |
| `estadoActual` | Enum | Estado actual del envío (ver diagrama de estados) |
| `fechaCreacion` | DateTime | Fecha y hora de registro del envío |
| `prioridad` | Enum | Alta / Media / Baja (asignada por el modelo de IA) |

### Entidad: EventoDeTracking *(para TP Principal)*

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `trackingId` | String | Referencia al envío |
| `estado` | Enum | Estado registrado en el evento |
| `ubicacion` | String | Ubicación simulada al momento del cambio |
| `timestamp` | DateTime | Fecha y hora del evento |
| `observaciones` | String | Notas adicionales del cambio |

### Entidad: Usuario

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `id` | Long | Identificador único |
| `nombre` | String | Nombre del usuario |
| `rol` | Enum | Operador / Supervisor |

---

## Diagrama de Estados del Envío

Los envíos siguen el siguiente ciclo de vida:

```
[Registrado] ──► [En Tránsito] ──► [En Sucursal] ──► [Entregado]
```

### Reglas de transición

| Desde | Hacia | Quién puede hacerlo |
|-------|-------|---------------------|
| Registrado | En Tránsito | Operador / Supervisor |
| En Tránsito | En Sucursal | Operador / Supervisor |
| En Sucursal | Entregado | Solo Supervisor |

> Las transiciones son secuenciales y no se puede volver a un estado anterior.

---

## Recursos externos

- Diagramas completos en Drawio: [Ver en Google Drive](https://drive.google.com/file/d/1x3Y8KKmEI1YVxImLEIW-a1wg5WgS-77H/view?usp=drive_link)
