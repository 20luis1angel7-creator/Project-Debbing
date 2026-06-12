# Bug ID

BUG-09

# Descripción

Explica qué ocurría.
Que cors apuntaba a localhost:9999 y lo cambien a que apuntara al frontend correcto localhost:5173

# Pasos para reproducir

1.cambiar el localhost 

# Hipótesis inicial

¿Qué creías que estaba causando el error?
en cors que estaba cogiendo el localhost mal 

# Investigación realizada

Logs utilizados:

Breakpoints:

Herramientas: 
- devtools

# Causa raíz

¿Qué producía realmente el problema?
que cors acceptaba un localhost que no existia

# Solución aplicada

Explica exactamente qué modificaste.
cambien el localhost:9999 por localhost:5173

# Validación

¿Cómo verificaste que quedó arreglado?
si ya se muestra datos en el frontend

# Riesgo de regresión

¿Qué podría romper este cambio?
nada mejor estaba rompiendo el render ya que no se mostraba datos en la ui

# Test agregado

Describe el test creado.
cree 2 test
uno de ello para validar que este utilizando el origin correcto 
el otro que valide cuando no es correcto el origin

