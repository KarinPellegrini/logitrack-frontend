# ADRs — Architecture Decision Records — LogiTrack

## ADR 1 — Arquitectura basada en API REST

**Contexto**  
El sistema LogiTrack debe permitir gestionar envíos, consultar su estado, registrar cambios y administrar usuarios con distintos roles. Además, se requiere que el sistema pueda ser utilizado mediante una interfaz web y potencialmente integrarse con otros sistemas en el futuro.

**Decisión**  
Se decidió implementar una arquitectura basada en API REST sobre HTTP, donde el backend expone endpoints para la gestión de envíos, usuarios y auditoría, consumidos por una interfaz web.

**Alternativas consideradas**
- Aplicación monolítica tradicional sin separación entre frontend y backend.
- Arquitectura de microservicios desde el inicio.

**Consecuencias**

Ventajas:
- Separación clara entre el frontend y backend.
- Facilita la integración futura con otros sistemas.
- Es un estándar ampliamente utilizado en sistemas web.

Desventajas:
- Requiere definir y mantener contratos de API.
- Implica una mayor complejidad inicial que en una aplicación monolítica simple.

---

## ADR 2 — Uso de Java con Spring Boot para el backend

**Contexto**  
El sistema requiere implementar lógica de negocio para la gestión de envíos, autenticación de usuarios, auditoría y exposición de endpoints de API.

**Decisión**  
Se decidió utilizar Java con el framework Spring Boot para desarrollar el backend del sistema.

**Alternativas consideradas**
- Python con Django.
- PHP con Laravel.

**Consecuencias**

Ventajas:
- Amplia adopción en entornos empresariales.
- Soporte robusto para desarrollo de APIs REST.
- Ecosistema maduro con herramientas de seguridad (Spring Security) y persistencia (Spring Data JPA).

Desventajas:
- Mayor consumo de recursos comparado con frameworks más ligeros.
- Requiere mayor configuración en comparación con algunas alternativas.
- Curva de aprendizaje mayor para desarrolladores sin experiencia en Spring.

---

## ADR 3 — Uso de base de datos relacional (PostgreSQL)

**Contexto**  
El sistema necesita almacenar datos estructurados relacionados con envíos, usuarios, estados de envío y registros de auditoría. Estas entidades tienen relaciones claras entre sí.

**Decisión**  
Se decidió utilizar PostgreSQL como base de datos relacional, ya que todos los miembros del equipo tienen conocimientos sobre ella y es ampliamente utilizada en el mercado y en sistemas de logística.

**Alternativas consideradas**
- Base de datos NoSQL como MongoDB.
- Base de datos embebida como SQLite.

**Consecuencias**

Ventajas:
- Permite modelar relaciones entre entidades mediante claves foráneas.
- Facilita mantener la integridad de los datos.
- Adecuada para sistemas con estructura de datos definida.
- Permite aplicar normalización y garantizar consistencia mediante transacciones ACID.

Desventajas:
- Menor flexibilidad para cambios frecuentes en el esquema.
- Requiere gestión de migraciones cuando cambia el modelo de datos.

---

## ADR 4 — Control de acceso basado en roles (RBAC)

**Contexto**  
El sistema requiere restringir ciertas acciones según el tipo de usuario. Por ejemplo, los operadores pueden registrar envíos y cambiar ciertos estados, mientras que los supervisores tienen permisos adicionales como confirmar entregas.

**Decisión**  
Se decidió implementar un sistema de control de acceso basado en roles con dos roles principales: Operador y Supervisor.

**Alternativas consideradas**
- Sistema sin roles diferenciados.
- Permisos personalizados por usuario individual.

**Consecuencias**

Ventajas:
- Permite controlar de forma clara qué acciones puede realizar cada usuario.
- Simplifica la gestión de permisos al trabajar con roles predefinidos.
- Mejora la seguridad del sistema.

Desventajas:
- Requiere mantener la asignación de roles.
- Puede requerir cambios si en el futuro se agregan nuevos roles.

---

## ADR 5 — Registro de auditoría para cambios de estado

**Contexto**  
El sistema debe permitir rastrear cambios realizados en los envíos para garantizar trazabilidad y facilitar auditorías. Además, se requiere poder identificar qué usuario realizó cada modificación.

**Decisión**  
Se decidió implementar un registro de auditoría que almacene: usuario que realizó la acción, fecha y hora del cambio, estado anterior y estado nuevo.

**Alternativas consideradas**
- No registrar cambios de estado.
- Registrar únicamente el último estado sin historial.

**Consecuencias**

Ventajas:
- Permite rastrear acciones realizadas por los usuarios.
- Facilita auditorías y análisis de eventos.
- Mejora la transparencia del sistema.

Desventajas:
- Incrementa el volumen de datos almacenados.
- Requiere consultas adicionales para visualizar el historial completo.

---

## ADR 6 — Clasificación automática de prioridad mediante IA

**Contexto**  
El sistema incluye una funcionalidad para priorizar envíos según criterios como distancia, región o carga de trabajo, con el objetivo de anticipar posibles retrasos.

**Decisión**  
Se decidió implementar un mecanismo de clasificación automática de prioridad basado en un modelo simple entrenado con un dataset sintético generado para el proyecto, a partir de reglas como distancia, región de destino y carga estimada.

**Alternativas consideradas**
- Prioridad asignada manualmente por operadores.
- No incluir un sistema de priorización automática.

**Consecuencias**

Ventajas:
- Permite identificar envíos críticos de forma automática.
- Mejora la eficiencia operativa.
- Introduce capacidades de análisis predictivo en el sistema.

Desventajas:
- Requiere generar y mantener un dataset de entrenamiento.
- Puede producir resultados imperfectos si las reglas o el modelo no están bien calibrados.

---

## ADR 7 — Stack de frontend (React + Vite + Tailwind CSS)

**Contexto**  
El sistema LogiTrack requiere una interfaz web que permita a los operadores y supervisores registrar envíos, consultar el listado, visualizar detalles y realizar búsquedas por Tracking ID. La interfaz debe ser rápida, fácil de mantener y capaz de consumir los endpoints de la API REST.

**Decisión**  
Se decidió utilizar el siguiente stack para el frontend:
- **React** como librería principal para la construcción de la interfaz basada en componentes.
- **Vite** como herramienta de build y entorno de desarrollo.
- **Tailwind CSS** para el diseño y estilado de la interfaz.
- **Lucide React** para la incorporación de íconos.

**Alternativas consideradas**
- Angular como framework completo de frontend.
- Vue.js como framework progresivo.
- CSS tradicional o Bootstrap para el diseño.
- Create React App como herramienta de configuración.

**Consecuencias**

Ventajas:
- React permite construir interfaces modulares basadas en componentes reutilizables.
- Vite proporciona tiempos de arranque y compilación más rápidos durante el desarrollo.
- Tailwind CSS permite crear interfaces de forma rápida utilizando utilidades predefinidas.
- Lucide React ofrece un conjunto de íconos livianos y fáciles de integrar.

Desventajas:
- Tailwind CSS puede generar clases largas en el código si no se organiza correctamente.
- React requiere conocimientos de JavaScript y manejo de estados.
- El uso de varias herramientas puede aumentar la complejidad inicial del proyecto.

---

## ADR 8 — Control de estados para el ciclo de vida del envío

**Contexto**  
Los envíos del sistema siguen un ciclo de estados definido: Registrado → En Tránsito → En Sucursal → Entregado.

**Decisión**  
Se decidió modelar el ciclo de vida del envío mediante un control de estados que valide las transiciones y garantice que estas sean coherentes.

**Alternativas consideradas**
- Permitir transiciones libres entre cualquier estado sin validación.

**Consecuencias**

Ventajas:
- Permite controlar transiciones de forma explícita.
- Simplifica la lógica de negocio.
- Refleja claramente el proceso logístico real.

Desventajas:
- Requiere mantener actualizadas las reglas de transición ante cambios de negocio.
