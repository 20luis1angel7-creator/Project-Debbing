# Bug ID

BUG-04

# Descripcion

El subtotal se calculaba mal porque el precio venia como `string` y no se
multiplicaba por la cantidad.

# Pasos para reproducir

1. Agregar dos unidades del mismo producto.
2. Realizar la compra.
3. Revisar el total devuelto por el backend.

# Hipotesis inicial

Pense que los productos no llegaban desde la base de datos o que el problema
estaba en el cupon.

# Investigacion realizada

Revise `calculateSubtotal` y comprobe el tipo del precio y la cantidad del producto.

# Causa raiz

`as number` no convertia el precio a numero y el calculo ignoraba `item.quantity`.

# Solucion aplicada

Cambie el calculo por:

```ts
subtotal += Number(product.price) * item.quantity;
```

# Validacion

Comprobe que dos productos de 35 USD devolvieran un subtotal de 70 USD.

# Riesgo de regresion

Un precio que no sea numerico podria producir `NaN`.

# Test agregado

Agregue un test que calcula dos unidades del producto con precio de 35 USD y
espera un subtotal de 70 USD.
