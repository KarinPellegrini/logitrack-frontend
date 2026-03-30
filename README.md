# 📦 LogiTrack - Frontend

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_8-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest_3-FCC72C?style=for-the-badge&logo=vitest&logoColor=white)

Módulo frontend para el **Sistema de Gestión Logística LogiTrack (Grupo 6)**. Desarrollado como parte del TP Inicial para la materia *Proyecto Profesional I / Laboratorio de Construcción de Software* (UNGS).

Esta interfaz permite a los operadores y supervisores registrar envíos, visualizar estados de la logística en tiempo real y obtener cálculos de prioridad automatizados mediante la integración con un modelo de Inteligencia Artificial.

---

## 🛠️ Stack Tecnológico

- **Framework Core:** React 19 + Vite
- **Estilos y UI:** Tailwind CSS v4
- **Iconografía:** Lucide-React
- **Testing:** Vitest + React Testing Library + JSDOM
- **Integración Continua (CI):** GitHub Actions

---

## ⚙️ Requisitos Previos

Para ejecutar este proyecto en un entorno local, es necesario contar con:

- **Node.js:** v18 o superior
- **NPM:** v9 o superior
- **Backend Core:** API de LogiTrack (Java/Spring Boot) en ejecución en el puerto `8080`.
- **Microservicio IA:** Script `RandomForestIA.py` en ejecución en el puerto `5001`.

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd logitrack-prototype
   ```

2. **Instalar dependencias del proyecto:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

La aplicación estará disponible de forma predeterminada en `http://localhost:5173`.

---

## 🧪 Pruebas Automatizadas y Calidad de Código

El proyecto cuenta con una suite de pruebas unitarias configurada para validar la integridad de los componentes principales (Login, Formulario de Envíos y Grilla de Prioridades), cumpliendo con los estándares requeridos por la cátedra.

- **Ejecutar Linter** (Análisis estático de sintaxis):
  ```bash
  npm run lint
  ```

- **Ejecutar pruebas** (Modo CI - Una sola pasada):
  ```bash
  npm run test
  ```

- **Ejecutar pruebas** (Modo Watch para desarrollo):
  ```bash
  npm run test -- --watch
  ```

---

Desarrollado por el **Grupo 6:** López Ciro, Pellegrini Karin, Scabini Melina.