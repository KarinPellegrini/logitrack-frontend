# LogiTrack — Frontend

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Módulo frontend del **Sistema de Gestión Logística LogiTrack (Grupo 6)**. Desarrollado como Trabajo Práctico para *Laboratorio de Construcción de Software* — UNGS.

Permite a operadores y supervisores gestionar envíos, visualizar análisis de IA, auditar operaciones y ejercer derechos de privacidad (Ley 25.326).

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 19 + Vite | Framework y bundler |
| Tailwind CSS v4 | Estilos y componentes visuales |
| Lucide React | Iconografía |
| Axios | Comunicación con la API |
| Vitest + React Testing Library | Tests unitarios |
| GitHub Actions | Pipeline de CI |

---

## Funcionalidades implementadas

### Roles y autenticación
- Login con usuario y contraseña (validado contra el backend)
- Vistas diferenciadas por rol: **Operador** y **Supervisor**

### Gestión de envíos
- Listado de envíos con búsqueda por nombre/apellido/trackingId
- Búsqueda con **debounce de 500ms** y spinner de carga (US-21)
- Filtro por rango de fechas de creación
- Formulario de alta con validación de CP (1000–9499)
- Detalle de envío con toda la información logística

### Análisis IA
- **Semáforo de prioridad** con colores: rojo (ALTA), amarillo (MEDIA), verde (BAJA) (US-26)
- **Motivo de prioridad** en lenguaje natural (US-17)
- **Distancia estimada** entre CP origen y destino
- **Probabilidad de retraso** con barra de progreso coloreada y etiqueta BAJO/MODERADO/ALTO (US-24)

### Historial y auditoría
- **Timeline de historial de estados** por envío con usuario y timestamp (US-10)
- **Dashboard de auditoría** con métricas, actividad reciente y ranking de usuarios (US-11)
- **Buscador de logs** por usuario o acción (US-25)

### Privacidad (Ley 25.326)
- **Modal ARCO** accesible desde el footer con derechos de Acceso, Rectificación y Supresión
- Formulario de borrado lógico por Tracking ID (US-29)
- **Panel de solicitudes de borrado** para el Supervisor con actualización inmediata

### Gestión de usuarios (Supervisor)
- Alta, modificación y cambio de rol de usuarios

---

## Estructura de componentes

```
src/
├── App.jsx                          # Estado global, routing de vistas
├── componentes/
│   ├── Acceso.jsx                   # Login
│   ├── BarraNavegacion.jsx          # Navegación con badges
│   ├── ListaEnvios.jsx              # Tabla con búsqueda y filtros
│   ├── DetalleEnvio.jsx             # Detalle + historial + probabilidad retraso
│   ├── FormularioEnvio.jsx          # Alta de envío
│   ├── GestionUsuarios.jsx          # ABM de usuarios (Supervisor)
│   ├── Dashboard.jsx                # Métricas de auditoría (Supervisor)
│   ├── LogsAuditoria.jsx            # Buscador de logs (Supervisor)
│   ├── SolicitudesBorrado.jsx       # Panel ARCO (Supervisor)
│   ├── ModalARCO.jsx                # Modal derechos Ley 25.326
│   └── elementos/
│       ├── SemaforoPrioridad.jsx    # Indicador visual ALTA/MEDIA/BAJA
│       └── Etiqueta.jsx             # Chip de estado
```

---

## Requisitos previos

- Node.js v18 o superior
- NPM v9 o superior
- Backend LogiTrack corriendo en `http://localhost:8080`
- Microservicio IA corriendo en `http://localhost:5001`

---

## Instalación y ejecución local

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd logitrack-prototype

# Instalar dependencias
npm install

# Configurar variable de entorno
echo "VITE_API_URL=http://localhost:8080" > .env.local

# Ejecutar en desarrollo
npm run dev
# Disponible en http://localhost:5173
```

---

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL base del backend | `https://logitrack-backend.railway.app` |

---

## Tests y calidad de código

```bash
# Análisis estático
npm run lint

# Tests (modo CI)
npm run test

# Tests (modo watch)
npm run test -- --watch
```

---

## Usuarios de prueba (datos semilla)

| Usuario | Clave | Rol |
|---|---|---|
| `melina` | `1234` | Operador |
| `ciro` | `admin` | Supervisor |

---

## Autores

Proyecto académico — **Grupo 6**
Ciro Martín López, Karin Pellegrini, Melina Scabini
Licenciatura en Sistemas — UNGS
