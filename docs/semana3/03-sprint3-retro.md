# Sprint 3 — Retrospectiva

**Fecha:** abril 2026
**Formato:** Start / Stop / Continue

---

## ✅ Continue — Lo que funcionó bien

- **Commits pequeños y atómicos**: facilitó el debugging cuando algo se rompía en Railway.
- **Uso de DTOs en todos los endpoints**: permitió agregar campos computados (`probabilidadRetraso`, `fechaCreacion`) sin romper el contrato de la API.
- **Logs con prefijo `[IA]` para diagnóstico**: aceleró enormemente el diagnóstico del bug de `IA_SERVICE_URL` en Railway.
- **Fallback en la integración con la IA**: el sistema siguió funcionando aunque la IA fallara, evitando que un bug externo bloqueara todo el módulo.
- **Diseño del dataset por cuadrantes**: aseguró cobertura de todos los casos de borde desde el inicio.

---

## 🚫 Stop — Lo que hay que dejar de hacer

- **Hardcodear valores sin `.trim()`**: las variables de entorno en Railway pueden tener caracteres invisibles. Aplicar `.trim()` por defecto.
- **Exponer entidades JPA directamente desde los controllers**: causó que campos computados no aparecieran en ciertos endpoints. Todos los endpoints deben devolver DTOs.
- **Mergear a main sin verificar en Vercel**: algunos bugs solo aparecen en el entorno deployado (Railway) y no en local.

---

## 🚀 Start — Lo que hay que empezar a hacer

- **Tests unitarios para `EnvioService`**: el sprint avanzó rápido pero sin cobertura de tests en los métodos más críticos (`mapToResponse`, `calcularProbabilidadRetraso`).
- **Actualizar la matriz de trazabilidad a medida que se cierran US**: es más costoso completarla al final que mantenerla incremental.
- **Revisar el Dockerfile de la IA antes de cada deploy**: el error de archivos faltantes en la imagen Docker es fácilmente evitable con un checklist de 30 segundos.

---

## Métricas del Sprint

| Métrica | Valor |
|---|---|
| Story Points comprometidos | 33 |
| Story Points completados | 33 |
| Bugs encontrados en review | 5 |
| Bugs resueltos antes del cierre | 5 |
| Velocidad | 33 pts/sprint |

---

## Acuerdos para el próximo Sprint

1. Todo endpoint nuevo devuelve DTO desde el primer commit.
2. Antes de hacer push al Dockerfile, verificar que todos los archivos importados estén en el `COPY`.
3. Escribir al menos un test unitario por método de servicio nuevo.
