# Bug ID

BUG-07

# Descripción

Explica qué ocurría.
ocurria que cuando escribias el nombre de un producto tenia que ser excapto ta que si tenia una letra mayuscula no lo aceptaba entonce tube que arreglarlo y ponerlo que no importa que este una letra en mayuscula siempre va hacer minuscula

# Pasos para reproducir

1.probando en el search de productos

# Hipótesis inicial

¿Qué creías que estaba causando el error?
- poner la respuesta minuscula de name en services

# Investigación realizada

Logs utilizados:

Breakpoints:

Herramientas:

# Causa raíz

¿Qué producía realmente el problema?
en productService la comparaba igual es decir si hay una letra mayuscula tiene que ponerlo mayuscula

# Solución aplicada

Explica exactamente qué modificaste.
puse en la peticion a la bd que name sea minuscula y el query tambien

# Validación

¿Cómo verificaste que quedó arreglado?
buscando los productos en el search

# Riesgo de regresión

¿Qué podría romper este cambio?
nada

# Test agregado

Describe el test creado.
hice uno donde compara si son iguales los productos en minuscula y mayuscula y la cantidad de producto 
