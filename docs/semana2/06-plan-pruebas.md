# Plan de Pruebas — LogiTrack

## Formato de casos de prueba

Todos los casos de prueba siguen el formato **Given / When / Then**:

- **Given (Dado que):** contexto o precondición del sistema antes de ejecutar la acción.
- **When (Cuando):** acción que realiza el usuario o el sistema.
- **Then (Entonces):** resultado esperado que permite validar el criterio de aceptación.

---

## Criterio de aceptación

Un caso de prueba se considera **aprobado (pass)** cuando el resultado obtenido coincide con el resultado esperado descrito en el Then. Se debe adjuntar evidencia (captura de pantalla del resultado) que permita verificarlo.

---

## Casos de prueba

Los casos de prueba completos se encuentran documentados en el archivo Excel del equipo:

📄 [Ver plan de pruebas completo (Google Sheets)](https://docs.google.com/spreadsheets/d/1dQQ0B45jdnFoVOtrQcEZwBMdCY5n5-iW/edit?usp=drive_link)

---

## Ejemplos representativos

### CP-01 — Alta de envío exitosa

**Historia relacionada:** HU-03: Alta de envío  
**Given:** El operador está autenticado en el sistema y accede al formulario de alta de envío.  
**When:** Completa todos los campos obligatorios (remitente, destinatario, origen, destino, tipo de carga) y confirma el consentimiento de Ley 25.326.  
**Then:** El sistema genera un Tracking ID único, registra el envío con estado "Registrado" y muestra confirmación en pantalla.

---

### CP-02 — Alta de envío con campos incompletos

**Historia relacionada:** HU-04: Validación de campos  
**Given:** El operador está autenticado y accede al formulario de alta.  
**When:** Intenta guardar el envío dejando campos obligatorios vacíos (DNI, Nombre o CP).  
**Then:** El sistema muestra mensajes de error específicos por campo y no registra el envío.

---

### CP-03 — Búsqueda por Tracking ID existente

**Historia relacionada:** HU-13: Búsqueda por Tracking ID  
**Given:** Existe al menos un envío registrado en el sistema con un Tracking ID conocido.  
**When:** El operador ingresa el Tracking ID en el buscador y ejecuta la búsqueda.  
**Then:** El sistema muestra el detalle del envío correspondiente al Tracking ID ingresado.

---

### CP-04 — Búsqueda por Tracking ID inexistente

**Historia relacionada:** HU-13: Búsqueda por Tracking ID  
**Given:** El operador está autenticado y accede al buscador.  
**When:** Ingresa un Tracking ID que no existe en el sistema.  
**Then:** El sistema muestra un mensaje indicando que no se encontraron resultados.

---

### CP-05 — Cambio de estado a "En Tránsito"

**Historia relacionada:** HU-07: Cambio de estado  
**Given:** Existe un envío en estado "Registrado" y el usuario autenticado tiene rol Operador o Supervisor.  
**When:** El usuario selecciona el envío y ejecuta el cambio de estado a "En Tránsito".  
**Then:** El sistema actualiza el estado del envío, registra el timestamp y el usuario que realizó el cambio.

---

### CP-06 — Intento de marcar "Entregado" por un Operador

**Historia relacionada:** HU-14: Restricción de rol  
**Given:** Existe un envío en estado "En Sucursal" y el usuario autenticado tiene rol Operador.  
**When:** El operador intenta cambiar el estado a "Entregado".  
**Then:** El sistema deniega la acción y muestra un mensaje indicando que solo el Supervisor puede realizar esa operación.

---

### CP-07 — Clasificación automática de prioridad por IA

**Historia relacionada:** HU-06: Priorización por IA  
**Given:** El operador registra un envío con datos de distancia larga y tipo de carga prioritaria.  
**When:** El sistema procesa el envío con el modelo de IA.  
**Then:** El envío queda clasificado con prioridad "Alta" y se muestra el motivo de la clasificación.
