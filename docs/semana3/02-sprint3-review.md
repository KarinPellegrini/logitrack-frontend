# Sprint 3 — Review

**Fecha:** abril 2026
**Participantes:** Ciro Martín López, Karin Pellegrini, Melina Scabini

---

## Historias completadas

| US | Descripción | Estado |
|---|---|---|
| US-10 | Timeline de historial de estados con usuario y timestamp | ✅ Completada |
| US-11 | Dashboard de auditoría: totales, actividad reciente, ranking de usuarios | ✅ Completada |
| US-17 | Motivo de prioridad en lenguaje natural visible en detalle de envío | ✅ Completada |
| US-21 | Búsqueda con debounce 500ms y spinner de carga | ✅ Completada |
| US-24 | Barra de probabilidad de retraso con etiqueta BAJO/MODERADO/ALTO | ✅ Completada |
| US-25 | Buscador de logs de auditoría por usuario y acción | ✅ Completada |
| US-26 | Semáforo de prioridad con colores en lista y detalle de envío | ✅ Completada |
| US-28 | Modelo RandomForest entrenado con dataset de reglas + endpoint /retrain | ✅ Completada |
| US-29 | Borrado lógico con actualización inmediata en el frontend (sin refresh) | ✅ Completada |
| US-30 | Dataset sintético de 1200 registros con cobertura de todos los cuadrantes | ✅ Completada |

**Velocidad del Sprint:** 33 puntos

---

## Incremento demostrado

### Módulo de análisis IA
- Al registrar un envío, el sistema calcula automáticamente la prioridad (BAJA/MEDIA/ALTA), la distancia en km entre CPs y la probabilidad de retraso (0–95%).
- El semáforo de colores es visible en la lista y en el detalle de cada envío.
- El motivo de la prioridad se muestra en lenguaje natural.

### Historial y auditoría
- El detalle de cada envío incluye un timeline con todos los cambios de estado, indicando el usuario responsable y el timestamp.
- El dashboard muestra totales por estado, actividad reciente y un ranking de usuarios por acciones registradas.
- El buscador de logs permite filtrar por nombre de usuario o tipo de acción.

### Privacidad (Ley 25.326)
- El modal ARCO permite solicitar el borrado lógico de datos personales por Tracking ID.
- Tras la anonimización, el envío se actualiza inmediatamente en la lista y en el detalle sin necesidad de recargar la página.
- El panel de solicitudes de borrado permite al Supervisor ver todos los envíos anonimizados.

### Búsqueda optimizada
- El buscador aplica un debounce de 500ms antes de consultar la API, evitando requests innecesarios.
- Un spinner de carga indica al usuario que la búsqueda está en progreso.

---

## Bugs resueltos durante el Sprint

- Distancia siempre `null`: Dockerfile de la IA no incluía `generar_dataset.py` ni `datasetIA.csv`.
- Modelo siempre retornaba `BAJA`: dataset no cubría el cuadrante `dist>200 + peso≤15 + Estándar` (debía ser MEDIA).
- `IA_SERVICE_URL` con salto de línea al final: Railway agregaba `\n` → `IllegalArgumentException`. Fix: `.trim()` al leer la variable.
- Barra de probabilidad desaparecía al cambiar estado: endpoint `PUT /estado` devolvía entidad en vez de DTO.
- `fechaCreacion` null en envíos nuevos: campo faltaba en `EnvioResponseDTO` y en `mapToResponse()`.

---

## Notas para el próximo Sprint

- Evaluar US-27 (recuperación de contraseña) si hay capacidad
- Considerar completar la matriz de trazabilidad en `/docs`
- Revisar cobertura de tests unitarios para los nuevos servicios
