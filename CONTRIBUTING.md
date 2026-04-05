# Guía de Contribución — LogiTrack Frontend

Para mantener el orden, la trazabilidad y la calidad del código, todos los miembros del Grupo 6 deben seguir estas directrices.

---

## Estrategia de ramas

```
feature/us##-descripcion
        ↓
    develop
        ↓
      main
```

| Rama | Propósito |
|---|---|
| `main` | Producción (Vercel). Solo se actualiza desde `develop`. |
| `develop` | Integración. Todas las features pasan por acá primero. |
| `feature/us##-*` | Una rama por User Story, creada desde `develop`. |
| `fix/descripcion` | Correcciones puntuales de bugs. |

**Ejemplos de nombres de rama:**
```
feature/us21-tiempo-respuesta
feature/us24-probabilidad-retraso
feature/us26-semaforo-prioridad
fix/modal-arco-actualizacion-inmediata
```

---

## Flujo de trabajo paso a paso

```bash
# 1. Situarse en develop actualizado
git checkout develop
git pull origin develop

# 2. Crear rama de la US
git checkout -b feature/us##-descripcion

# 3. Desarrollar y commitear
git add src/componentes/MiComponente.jsx
git commit -m "feat: descripción del cambio"

# 4. Subir la rama
git push origin feature/us##-descripcion

# 5. Mergear a develop
git checkout develop
git merge feature/us##-descripcion --no-ff
git push origin develop

# 6. Mergear a main
git checkout main
git merge develop --no-ff
git push origin main

# 7. Eliminar rama feature
git branch -d feature/us##-descripcion
git push origin --delete feature/us##-descripcion
```

---

## Convención de commits

Se usa **Conventional Commits**:

```
tipo: descripción breve en presente
```

| Tipo | Cuándo usarlo |
|---|---|
| `feat` | Nuevo componente o funcionalidad visual |
| `fix` | Corrección de bug o comportamiento incorrecto |
| `refactor` | Mejora de código sin cambiar comportamiento |
| `docs` | README, CONTRIBUTING |
| `test` | Tests en Vitest |
| `chore` | Dependencias, configuración de Vite/Tailwind |

**Ejemplos reales del proyecto:**
```
feat: US-26 semáforo de prioridad en lista y detalle de envío
feat: US-21 debounce 500ms y spinner de carga en búsqueda
feat: US-24 barra de probabilidad de retraso en detalle de envío
fix: actualización inmediata del envío anonimizado sin refresh de página
```

---

## Estilo de código

- **React funcional** con hooks (`useState`, `useEffect`)
- **Tailwind CSS** para todos los estilos — no usar CSS inline salvo casos excepcionales
- **Axios** para todas las llamadas HTTP — nunca `fetch` directamente
- Componentes pequeños y reutilizables en `src/componentes/elementos/`
- Props siempre en camelCase en español (ej: `alSeleccionar`, `alCambiarBusqueda`)
- Constantes de configuración (colores, etiquetas) al inicio del archivo

---

## Organización de componentes

```
src/componentes/
├── elementos/        ← componentes atómicos reutilizables (Etiqueta, SemaforoPrioridad)
└── *.jsx             ← vistas y componentes de página
```

El estado global vive en `App.jsx`. Los componentes reciben datos y callbacks por props.

---

## Variables de entorno

Crear `.env.local` en la raíz (no commitear):

```
VITE_API_URL=http://localhost:8080
```

En Vercel, configurar `VITE_API_URL` con la URL del backend en Railway.

---

## Control de calidad local

Antes de commitear, verificar localmente:

```bash
npm run lint     # sin warnings
npm run test     # 100% tests en verde
```

El pipeline de CI bloquea el merge si alguno falla.

---

## Buenas prácticas

- Commits pequeños y atómicos (un cambio lógico por commit)
- No dejar `console.log` en código mergeado a `main`
- Actualizar el estado local inmediatamente después de operaciones exitosas (no esperar re-fetch)
- Usar debounce en inputs de búsqueda para no saturar la API

---

## Autores

Proyecto académico — **Grupo 6**
Ciro Martín López, Karin Pellegrini, Melina Scabini
Licenciatura en Sistemas — UNGS
