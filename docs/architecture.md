# Arquitectura

DebugMart es una mini plataforma e-commerce dividida en dos aplicaciones.

## Frontend

React + TypeScript + Vite.

Responsabilidades:

- Mostrar productos.
- Buscar productos.
- Gestionar carrito en memoria.
- Ejecutar checkout.
- Mostrar perfil y órdenes.

Carpetas principales:

- `frontend/src/pages`: pantallas.
- `frontend/src/components`: componentes reutilizables.
- `frontend/src/hooks`: hooks de carga de datos.
- `frontend/src/services`: cliente HTTP.

## Backend

Node.js + TypeScript + Express + SQLite.

Responsabilidades:

- API REST.
- Persistencia de usuarios, productos, órdenes e invoices.
- Cálculo de subtotal y descuentos.
- Simulación de pagos e invoices.

Carpetas principales:

- `backend/routes`: definición de endpoints.
- `backend/controllers`: entrada HTTP.
- `backend/services`: lógica de negocio.
- `backend/database`: conexión y seed SQLite.
- `backend/middleware`: middlewares.

## Endpoints

```txt
GET  /api/health
GET  /api/products
GET  /api/products/search?q=
GET  /api/products/:id
POST /api/auth/login
GET  /api/users/:id
GET  /api/orders?userId=
POST /api/orders
POST /api/invoices
```

## Base de datos

Tablas:

- `users`
- `products`
- `orders`
- `invoices`

## Nota importante

El proyecto contiene bugs intencionales. No todo el comportamiento descrito aquí funciona correctamente al inicio.
