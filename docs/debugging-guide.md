# Debugging Guide

Esta guía contiene pistas, no soluciones. La meta es que practiques el flujo completo: reproducir, observar, formular hipótesis, aislar, corregir, testear y verificar.

Antes de empezar:

1. Ejecuta `npm install`.
2. Ejecuta `npm run setup`.
3. Ejecuta `npm run dev`.
4. Después de resolver el error inicial de sintaxis, usa `npm run typecheck` para validar TypeScript.
5. Cuando arregles un bug, llena `docs/bug-report-template.md` y guarda tu respuesta en `docs/solved-bugs/BUG-XX.md`.

## BUG-01: Null / Undefined     D

Observa la pantalla Perfil.
Prueba diferentes usuarios.

## BUG-02: Off-by-one        D

Cuenta manualmente los productos cargados.
Compara el resultado con el parametro `limit`.

## BUG-03: Error de sintaxis

Revisa los logs del servidor al iniciar.
Empieza por el primer stack trace que aparezca.

## BUG-04: Problema de tipos

Inspecciona el tipo de dato de los precios.
Revisa cómo se calcula el subtotal en backend.

## BUG-05: Promesa sin await

Observa qué pasa al comprar.
Revisa si la UI confirma algo antes de que el backend termine.

## BUG-06: Status HTTP incorrecto

Analiza la pestaña Network.
Prueba un login con credenciales inválidas usando `curl` o Postman.

## BUG-07: Error en query SQL

Ejecuta búsquedas usando distintos casos:

```txt
Laptop
laptop
LAPTOP
```

## BUG-08: Runtime Error

Prueba escenarios vacíos.
Intenta comprar sin productos en el carrito.

## BUG-09: CORS        D

Inspecciona headers HTTP.
Compara el origin real del frontend con el permitido por el backend.

## BUG-10: Memory Leak

Abre DevTools Performance.
Navega varias veces a Productos y cambia el tamaño de la ventana.

## BUG-11: Async mal manejado

Sigue el flujo async de la carga de órdenes.
Observa cuándo se marca la pantalla como cargada.

## BUG-12: Datos inconsistentes

Intenta forzar fallos de pago.
Verifica si el inventario cambia aunque no exista una orden válida.

## BUG-13: Race Condition

Ejecuta compras simultáneas del mismo producto con poco stock.
Observa si el stock puede quedar negativo.

## BUG-14: Transacción SQL rota

Analiza integridad de datos.
Fuerza un fallo de factura y revisa si quedan órdenes incompletas.

## BUG-15: Bug lógico complejo

Construye una tabla de casos de prueba para `DEBUG10`.
Recuerda las reglas:

```txt
10% descuento
maximo 50 USD
minimo compra 100 USD
```
