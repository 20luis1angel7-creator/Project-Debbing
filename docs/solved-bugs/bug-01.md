# Bug ID

BUG-01

# Descripción

Que en el frontend llegaba user null y venia el back ya que lo llamaba siempre.

# Pasos para reproducir

1.entender el codigo.
2.mandar un usario sin address

# Hipótesis inicial

-que el frontend cogia el usuario null por defecto del useState
-que la api no lo transformaba en json
-que el front no leia address

# Investigación realizada

Logs utilizados: 
-console.log(profile)
-console.log(profile.city)

Breakpoints:

Herramientas:

# Causa raíz

¿Qué producía realmente el problema?
el codigo tenia esto city: {address as city} y eso decia que debo de leer address en cada usuario y si no habia devolvia null

# Solución aplicada

Explica exactamente qué modificaste.
no me acuerdo mucho con exactitud {address as city} y lo cambie por city: address?.city

# Validación

¿Cómo verificaste que quedó arreglado?
le tube que preguntar a la ia ya que hay mas errores yno me deja verlo si esta bien

# Riesgo de regresión

¿Qué podría romper este cambio?
la estructura de como se envian los datos al frontend

# Test agregado

Describe el test creado.
cree un test de user 1 donde todo esta correcto
cree otro de user 2 donde puse que que no tenga addres

