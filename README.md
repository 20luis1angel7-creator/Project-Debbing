# DebugMart

Mini e-commerce full-stack creado para practicar debugging profesional.

Este proyecto contiene 15 bugs intencionales repartidos entre frontend, backend, base de datos, async, HTTP, CORS, transacciones, race conditions y lógica de negocio. La idea es que lo uses como entrenamiento y como evidencia en GitHub/CV de que sabes diagnosticar problemas, no solo escribir código cuando todo sale bien.

## Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + TypeScript + Express
- Base de datos: SQLite
- Tests: Jest + Supertest

## Instalación

```bash
npm install
npm run setup
```

## Ejecutar

```bash
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:3000
```

## Objetivo

Tu trabajo no es reescribir el proyecto completo. Tu trabajo es seguir un flujo profesional:

1. Reproducir el bug.
2. Leer errores y logs.
3. Formular hipótesis.
4. Probar hipótesis.
5. Confirmar causa raíz.
6. Arreglar.
7. Escribir o ajustar test.
8. Verificar que no rompiste otra cosa.

## Bugs

Hay 15 bugs intencionales:

- 7 fáciles
- 5 normales
- 3 difíciles

La guía de pistas está en [docs/debugging-guide.md](docs/debugging-guide.md).

El formulario que debes llenar por cada bug está en [docs/bug-report-template.md](docs/bug-report-template.md).

## Para tu CV

```txt
DebugMart
Mini e-commerce full-stack diseñado para practicar debugging profesional.

Logros:
• Diagnóstico y corrección de 15 bugs intencionales
• Debugging con logs, DevTools, Network tab y stack traces
• Corrección de errores async, HTTP, SQL, CORS y memoria
• Investigación de race conditions y transacciones SQLite
• Validación con tests unitarios, integración y regresión
```
