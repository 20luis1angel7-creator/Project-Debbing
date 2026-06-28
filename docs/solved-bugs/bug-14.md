# Bug ID

BUG-14

# Descripción

Explica qué ocurría.
que si habia un fallo a la hora de crear una orden las peticiones que se hicieron en la base de datos no se cancelaban ni los pagos 

# Pasos para reproducir

1.
2.
3.

# Hipótesis inicial

¿Qué creías que estaba causando el error?
- base de datos teniamos que retingirlo
- manejar atomicidad en create orden
- comunicacion de la base de dato con el orderservices

# Investigación realizada

Logs utilizados:

Breakpoints:

Herramientas:

# Causa raíz

¿Qué producía realmente el problema?
que no tenia atomicidad y si ocurria un error no se podia devolver los cambios ya realizado

# Solución aplicada

Explica exactamente qué modificaste.
utilizar la atomicidad para que cuando haiga un error se cancele todos los cambios

# Validación

¿Cómo verificaste que quedó arreglado?
si

# Riesgo de regresión

¿Qué podría romper este cambio?
nada

# Test agregado

Describe el test creado.
que capture el error de atomicidad
