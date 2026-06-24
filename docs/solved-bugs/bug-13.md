# Bug ID

BUG-13

# Descripción

Explica qué ocurría.
que cuando se compraba un producto al mismo tiempo podian dejar el stock en negativo

# Pasos para reproducir

1.haciendo multiple compras al mismo tiempo

# Hipótesis inicial

¿Qué creías que estaba causando el error?
- que tiene race conditional

# Investigación realizada

Logs utilizados:

Breakpoints:

Herramientas:

# Causa raíz

¿Qué producía realmente el problema?
al crear orden al mismo tiempo podria poner stock negativo

# Solución aplicada

Explica exactamente qué modificaste.
que despues que comprar o pagaran verifique de nuevo a ver si hay stock 

# Validación

¿Cómo verificaste que quedó arreglado?
si

# Riesgo de regresión

¿Qué podría romper este cambio?
nada

# Test agregado

Describe el test creado.
que verifique que si se comprar un producto al mismo tiempo el stock se vuelva negativo
