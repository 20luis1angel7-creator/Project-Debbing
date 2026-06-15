# Bug ID

BUG-08

# Descripción

Explica qué ocurría.
este bug era que cuando no hay nada e el carrito y le daba a comprar, daba error

# Pasos para reproducir

1.hacer click al boton de comprar sin anadir algun producto al carrito

# Hipótesis inicial

¿Qué creías que estaba causando el error?
- que esa validacion no esta devolviendo 0
- que price es underfined

# Investigación realizada

Logs utilizados:

Breakpoints:

Herramientas:

# Causa raíz

¿Qué producía realmente el problema?
que la validacion de cuando es 0 retornaba typo underfined o nan

# Solución aplicada

Explica exactamente qué modificaste.
elimine todo de esa validacion y solo le puse que retornara 0

# Validación

¿Cómo verificaste que quedó arreglado?
lo probe de nuevo hice click en el boton comprar sin anadir algo al carrito y ya no sale el error

# Riesgo de regresión

¿Qué podría romper este cambio?
nada

# Test agregado

Describe el test creado.
ninguno ya que lo tenia hecho
