# Ensayo — Cumplimiento de la Ley 25.326 — LogiTrack

**Proyecto:** LogiTrack — Paquete Base de Gestión de Envíos (MVP)  
**Materia:** Proyecto Profesional I / Laboratorio de Construcción de Software  
**Grupo:** 06 — Comisión 01  
**Integrantes:** Scabini Melina Noelia · López Ciro Martín · Pellegrini Farnholc Karin Daniela  

---

## I. Introducción

La Ley 25.326, sancionada el 4 de octubre de 2000, tiene por objeto la protección integral de los datos personales asentados en archivos, registros, bancos de datos u otros medios técnicos de tratamiento de datos, sean éstos públicos o privados destinados a dar informes, para garantizar el derecho al honor y a la intimidad de las personas (art. 1°). Reglamentaria del artículo 43 de la Constitución Nacional, la norma se estructura sobre los siguientes ejes fundamentales: la definición del dato personal, la base de licitud del tratamiento, el plazo de retención y los derechos ARCO de los titulares.

---

## II. Dato personal y datos sensibles

La ley define **dato personal** como información de cualquier tipo referida a personas físicas o de existencia ideal determinadas o determinables (art. 2°), abarcando tanto identificadores directos (nombre, DNI) como indirectos (IP, número de legajo). Dentro de este universo, los **datos sensibles** —origen étnico, opiniones políticas, salud, vida sexual, entre otros— reciben protección reforzada: nadie puede ser obligado a proporcionarlos, su recolección exige autorización legal por razones de interés general y queda prohibida la formación de archivos que los revelen directa o indirectamente (art. 7°, incs. 1–3).

---

## III. Base de licitud

El tratamiento es lícito cuando el archivo se encuentra inscripto ante el organismo de control (art. 3°) y el titular ha prestado **consentimiento libre, expreso e informado**, que debe constar por escrito (art. 5°, inc. 1). La ley admite tratamiento sin consentimiento en cinco supuestos: fuentes de acceso público, ejercicio de funciones estatales u obligación legal, listados básicos de contacto, relaciones contractuales o profesionales del titular, y operaciones de entidades financieras (art. 5°, inc. 2). En todos los casos, el responsable debe informar previamente la finalidad, la identidad del archivo, el carácter facultativo u obligatorio de los datos y la posibilidad de ejercer los derechos ARCO (art. 6°). El principio de finalidad completa el cuadro: los datos no pueden emplearse para fines distintos o incompatibles con los que motivaron su obtención (art. 4°, inc. 3).

---

## IV. Retención de datos

La ley establece que los datos deben destruirse cuando hayan dejado de ser necesarios o pertinentes a los fines para los cuales hubiesen sido recolectados (art. 4°, inc. 7). Si existe un plazo legal o contractual específico, ese plazo prevalece sobre el criterio general de **necesidad y pertinencia** (art. 16°, inc. 7); a falta de él, la extinción de la finalidad es el único límite aplicable. La norma no exige que la eliminación sea automática: basta con que el responsable adopte un procedimiento —manual o automatizado— que garantice que los datos no se conserven más allá de lo necesario.

---

## V. Derechos ARCO

El Capítulo III reconoce cuatro derechos irrenunciables:

- **Acceso** (art. 14°): permite al titular obtener información sobre sus datos dentro de los diez días corridos de intimado el responsable, en forma gratuita y a intervalos no inferiores a seis meses.
- **Rectificación y actualización** (art. 16°): obliga al responsable a corregir datos inexactos en el plazo máximo de cinco días hábiles, con notificación al cesionario dentro del mismo plazo si los datos fueron cedidos.
- **Cancelación o supresión**: procede salvo que cause perjuicio a terceros o exista obligación legal de conservar los datos; durante la verificación, el archivo debe bloquearse o señalarse como "sometido a revisión".
- **Oposición** (art. 27°, inc. 3): facultad de solicitar en cualquier momento el retiro o bloqueo del nombre de bases de datos con fines publicitarios o de marketing directo.

Todos estos trámites son **gratuitos** para el titular (art. 19°).

---

## VI. Aplicación en LogiTrack

LogiTrack es un sistema de gestión logística y seguimiento de envíos que trata datos personales de tres categorías de titulares: supervisores, operarios y clientes. En todos los casos, los datos recolectados —nombre, información de contacto y datos vinculados a cada operación de envío— encuadran en la definición del artículo 2° de la ley, sin que ninguna de las categorías involucre datos sensibles, lo que simplifica el régimen aplicable.

En materia de **base de licitud**, LogiTrack implementa un mecanismo de consentimiento explícito al momento de registrar cada envío: el usuario debe confirmar una declaración que indica que los datos personales fueron informados conforme a la Ley 25.326 y que ambas partes prestaron consentimiento para su tratamiento con la finalidad exclusiva de gestión del envío. Este flujo satisface el requisito del artículo 5°, inciso 1, y al mismo tiempo limita la finalidad del tratamiento a la gestión operativa del servicio, dando cumplimiento al principio del artículo 4°, inciso 3. Para los datos de supervisores y operarios, la base de licitud reposa adicionalmente en la relación laboral o contractual (art. 5°, inc. 2, ap. d). En todos los supuestos, la pantalla de alta del envío funciona como instancia de información previa en los términos del artículo 6°.

Respecto de la **retención**, los datos de cada envío deberían conservarse mientras existan obligaciones contables o fiscales vigentes asociadas a la operación y, una vez vencidas éstas, eliminarse o anonimizarse. Los datos de supervisores y operarios deben mantenerse durante la relación laboral y el tiempo adicional que impongan las normas laborales y previsionales aplicables. La gestión se realizará de forma manual mediante una política interna documentada, lo que resulta válido en términos de cumplimiento normativo.

Finalmente, en cuanto a los **derechos ARCO**, LogiTrack debe garantizar a supervisores, operarios y clientes la posibilidad de solicitar el acceso a sus datos, su rectificación o actualización, y su supresión cuando corresponda, dentro de los plazos previstos en los artículos 14° y 16° (diez días corridos para el acceso; cinco días hábiles para la rectificación o supresión). La gratuidad de estos trámites es obligatoria (art. 19°). A tal efecto, LogiTrack habilita una dirección de correo electrónico dedicada como canal oficial para la recepción y tramitación de solicitudes ARCO.

---

## VII. Conclusión

La Ley 25.326 impone un esquema de cumplimiento articulado: definir con precisión qué datos se tratan y si son sensibles; acreditar una base de licitud —consentimiento informado o causal legal— para cada tratamiento; fijar y respetar plazos de retención proporcionales a la finalidad; y garantizar el ejercicio oportuno y gratuito de los derechos ARCO. LogiTrack aborda estos cuatro ejes mediante su flujo de consentimiento en el alta del envío, la limitación explícita de la finalidad, y la obligación de habilitar un canal de atención para los titulares. El cumplimiento de estos pilares no solo evita responsabilidad administrativa y penal (arts. 31°–32°), sino que constituye la expresión concreta del mandato constitucional de proteger la intimidad y la autodeterminación informativa de las personas.

---

## Referencias

- Argentina. (2000). *Ley 25.326 de Protección de los Datos Personales*. Honorable Congreso de la Nación Argentina. https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790
- Texto actualizado de la norma: https://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/64790/texact.htm
