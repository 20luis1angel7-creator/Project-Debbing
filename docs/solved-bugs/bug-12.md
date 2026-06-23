# Bug ID

BUG-12

# Descripción

Explica qué ocurría.
cuando forsaba el fallo al comprar algun producto se descontaba y eso estaba mal que lo arregle hice dos bucle donde uno verifica si hay stock y otro lo descuenta

# Pasos para reproducir

1. forsaba el fallo al comprar un producto e iba a la pagina products y se descontaba

# Hipótesis inicial

¿Qué creías que estaba causando el error?
- en al controller que teniamos que poner validaciones
- cambiar el orden de create orden

# Investigación realizada

Logs utilizados:

Breakpoints:

Herramientas:

# Causa raíz

¿Qué producía realmente el problema?
estaba primero verificando y comprando productos al mismo tiempo o bucle y luego lo compraba

# Solución aplicada

Explica exactamente qué modificaste.
cambiar de posicion de la validaciones y pago estaba alreves y lo que hice fue validar si existe el stock de ese producto luego si existia pagaba y despues se descontaba

# Validación

¿Cómo verificaste que quedó arreglado?
forze el fallo al comprar un producto y no se descuenta

# Riesgo de regresión

¿Qué podría romper este cambio?
nada

# Test agregado

Describe el test creado.
cree un test que compara un antes y despues de la peticion 
