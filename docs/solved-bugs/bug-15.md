# Bug ID

BUG-15

# Descripción

Explica qué ocurría.
este bug era que no cumplia con algunas reglas como que si es menor de 100 no se le aplique el descuento y si el descueto no sobrepase de 50 pesos

# Pasos para reproducir

1.
2.
3.

# Hipótesis inicial

¿Qué creías que estaba causando el error?
- que couponService no lo validaba
- que daba error antes de llegar a esa validacion
- el couponCode llegaba incorrecto a la funcion

# Investigación realizada

Logs utilizados:

Breakpoints:

Herramientas:

# Causa raíz

¿Qué producía realmente el problema?
que no validaba esas reglas en couponService.ts no validaba si sobrepas de 50 peso el descuento si la compra fue menos de 100 no se realizara el descuento, etc

# Solución aplicada

Explica exactamente qué modificaste.
agregar validacienes para cada regla

# Validación

¿Cómo verificaste que quedó arreglado?
comprando algo que vale menos de 100, 240, 1000

# Riesgo de regresión

¿Qué podría romper este cambio?
nada

# Test agregado

Describe el test creado.
ya estaba creado pero agregue 2 mas 
- cuando sale bien 
- cuando couponCode es underfined
