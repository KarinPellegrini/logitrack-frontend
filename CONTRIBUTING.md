# Guía de Contribución - LogiTrack

Para mantener el orden, la trazabilidad y la calidad del código en el repositorio, todos los miembros del Grupo 6 deben seguir estrictamente estas directrices al contribuir al módulo frontend.

---

## 🌿 1. Estrategia de Ramas (Branching)

El proyecto sigue un flujo de integración en dos etapas:

```
feature/nombre-descriptivo-corto  →  develop  →  main
```

- **`main`**: Rama principal y protegida. Solo contiene código estable, funcional y verificado por el pipeline de CI. **Bajo ningún concepto se debe hacer un `push` directo a esta rama.**
- **`develop`**: Rama de integración continua. Aquí se consolidan todas las funcionalidades antes de pasar a `main`. Tampoco recibe `push` directo; se actualiza únicamente mediante PRs desde ramas de trabajo.
- **Ramas de trabajo**: Toda nueva funcionalidad, prueba o corrección debe desarrollarse en una rama derivada de `develop`.

  Formato de nomenclatura: `feature/nombre-descriptivo-corto`

  | Ejemplo |
  |---------|
  | `feature/formulario-origen` |
  | `feature/mapeo-prioridad` |
  | `feature/pipeline-github` |
  | `feature/lista-envios` |

---

## 📝 2. Convención de Commits

El proyecto utiliza el estándar [Conventional Commits](https://www.conventionalcommits.org/). Todo mensaje de commit debe seguir esta estructura exacta:

```
<tipo>: descripción breve en minúsculas
```

**Tipos permitidos:**

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad, componente visual o integración |
| `fix` | Corrección de un error o bug existente |
| `ci` | Cambios en archivos de configuración de GitHub Actions (`.yml`) |
| `test` | Adición, actualización o refactorización de pruebas en Vitest |
| `refactor` | Reestructuración de código que no altera el comportamiento funcional |
| `docs` | Actualizaciones en `README.md`, `CONTRIBUTING.md` o documentación técnica |

**Ejemplo:**
```
feat: validación de código postal origen en formulario
```

---

## 🔄 3. Proceso de Pull Requests (PR)

1. Finalizado el trabajo en la rama local, empujar los cambios y abrir un **Pull Request** hacia `develop`.
   - Una vez que `develop` esté estable y validado, se abrirá un PR de `develop` → `main`.
2. El PR debe incluir un **título descriptivo** y un detalle breve y claro de los cambios realizados.
3. **Requisito Bloqueante (CI):** El pipeline de GitHub Actions debe ejecutarse y finalizar en estado exitoso ✅. Esto garantiza:
   - Instalación correcta de dependencias (`npm install`).
   - Ejecución de Linter sin advertencias (`--max-warnings 0`).
   - Aprobación del **100% de los tests unitarios**.
4. Se requiere la **revisión y aprobación de al menos un compañero de equipo** antes de realizar el merge.

> ⚠️ Un PR con el pipeline en rojo no puede mergearse bajo ninguna circunstancia, aunque el código parezca funcionar localmente.

---

## ⚠️ 4. Control de Calidad Local

Antes de hacer `git commit`, es responsabilidad de cada desarrollador verificar que el código cumple con los estándares ejecutando localmente:

```bash
# Análisis estático de sintaxis
npm run lint

# Suite completa de pruebas
npm run test
```

Cualquier error de sintaxis, variable no utilizada o test fallido detendrá el pipeline en la nube y bloqueará el PR. **No esperes al CI para detectar errores que podés resolver antes de commitear.**

---

Desarrollado por el **Grupo 6:** López Ciro, Pellegrini Karin, Scabini Melina.