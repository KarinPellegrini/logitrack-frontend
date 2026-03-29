# NFRs — Requerimientos No Funcionales — LogiTrack

## NFR1 — Usabilidad

El sistema debe ser intuitivo y permitir que un operador registre un envío en menos de 1 minuto sin capacitación técnica.

---

## NFR2 — Rendimiento

Las búsquedas de envíos por Tracking ID deben responder en menos de 2 segundos.

---

## NFR3 — Seguridad

El sistema debe requerir autenticación mediante usuario y contraseña para acceder a sus funcionalidades y debe aplicar control de acceso basado en roles (Operador/Supervisor).

---

## NFR4 — Privacidad

Los datos personales deben ser almacenados cumpliendo con la Ley 25.326 de protección de datos personales.

---

## NFR5 — Auditoría

El sistema debe registrar el usuario y timestamp en cada cambio de estado de un envío.

---

## NFR6 — Disponibilidad

El sistema debe estar disponible durante el 99% del tiempo operativo.

---

## NFR7 — Accesibilidad

La interfaz debe utilizar contrastes adecuados, tipografía legible y componentes accesibles siguiendo principios básicos de accesibilidad web.

---

## NFR8 — Escalabilidad

El sistema debe soportar al menos 10.000 envíos registrados manteniendo tiempos de respuesta menores a 2 segundos para consultas habituales.

> Se definió esta capacidad inicial de 10.000 envíos como referencia para validar el comportamiento del sistema en el MVP.

---

## NFR9 — Trazabilidad de envíos

El sistema debe mantener un historial completo de cambios de estado de cada envío, permitiendo consultar cronológicamente todas las transiciones realizadas.

---

## NFR10 — Explicabilidad de la prioridad

El sistema debe mostrar de forma comprensible al usuario el motivo por el cual un envío fue clasificado con determinada prioridad.
