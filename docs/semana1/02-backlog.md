# Backlog Inicial — LogiTrack

## Priorización MoSCoW

| ID | Categoría | Requerimiento / Ítem de Backlog | Tipo | Prioridad |
|----|-----------|----------------------------------|------|-----------|
| 1 | Acceso | Pantalla de Login con validación de credenciales. | Funcional | Must |
| 2 | Acceso | Diferenciación de permisos por Roles (Operador/Supervisor). | Funcional | Must |
| 15 | Acceso | Solo el supervisor puede cambiar el rol de un operario. | Funcional | Must |
| 20 | Acceso | Función de Logout. | Funcional | Should |
| 27 | Acceso | Recuperación de contraseña. | Funcional | Could |
| 3 | Envíos | Formulario de alta para registrar envíos. | Funcional | Must |
| 4 | Envíos | Validación de campos obligatorios (DNI, Nombre, CP). | Funcional | Must |
| 5 | Envíos | Generación de Tracking ID único y automático al guardar. | Funcional | Must |
| 23 | Envíos | Filtro de envíos por rango de fechas de creación. | Funcional | Could |
| 7 | Estados | Cambio de estado manual a "En Tránsito". | Funcional | Must |
| 8 | Estados | Cambio de estado manual a "En Sucursal". | Funcional | Must |
| 9 | Estados | Cambio de estado manual a "Entregado". | Funcional | Must |
| 14 | Estados | Restricción: Solo el Supervisor puede marcar como "Entregado". | Funcional | Should |
| 13 | Búsqueda | Buscador principal por número de Tracking ID. | Funcional | Must |
| 16 | Búsqueda | Búsqueda de envíos por nombre del Destinatario. | Funcional | Should |
| 31 | Búsqueda | Integración con mapas. | Funcional | Won't |
| 10 | Auditoría | Registro de Usuario y Timestamp en cada cambio de estado. | Funcional | Must |
| 11 | Auditoría | Crear un dashboard para visualizar la información registrada para auditoría. | Funcional | Must |
| 19 | Auditoría | Vista de historial de movimientos detallado por envío. | Funcional | Should |
| 25 | Auditoría | Buscador de logs de auditoría por Usuario o Acción. | Funcional | Could |
| 6 | IA | Clasificación automática en Alta/Media/Baja prioridad. | Funcional | Must |
| 28 | IA | Entrenamiento del modelo con dataset "inventado" basado en reglas de distancia y carga. | Funcional | Must |
| 30 | IA | Generación de un dataset sintético para el entrenamiento del modelo. | Funcional | Must |
| 17 | IA | Visualización del motivo de la prioridad asignada por el modelo. | Funcional | Should |
| 24 | IA | Cálculo de "Probabilidad de Retraso" (Métrica de confianza). | Funcional | Could |
| 12 | Privacidad | Implementación de Checkbox de consentimiento (Ley 25.326). | Funcional | Must |
| 29 | Privacidad | Implementación de "Borrado Lógico" de datos personales para cumplir con el Derecho al Olvido. | Funcional | Should |
| 18 | Federal | Validación de Códigos Postales según la región del país. | Funcional | Should |
| 21 | Rendimiento | Tiempo de respuesta de búsqueda inferior a 2 segundos. | No Funcional | Should |
| 22 | UX | Diseño de interfaz intuitiva. | No Funcional | Should |
| 26 | UX | Indicadores visuales de colores (Semáforo) para prioridades. | Funcional | Could |

---

## Resumen por prioridad

| Prioridad | Cantidad |
|-----------|----------|
| **Must** | 14 |
| **Should** | 9 |
| **Could** | 5 |
| **Won't** | 1 |
| **Total** | 30 |

---

## Referencias

- Tablero Jira: [Ver tablero del proyecto](https://tpinicial.atlassian.net/jira/software/projects/PBDGE/boards/34)