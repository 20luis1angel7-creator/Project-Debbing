# Bug ID

BUG-11

# Descripción

Explica qué ocurría.
que en la pantalla de ordenes deberia de esperar los datos y presentar cargando y lo que hacia era que lo mostraba de una vez sin tener todos los datos 

# Hipótesis inicial

¿Qué creías que estaba causando el error?
- que la api estaba mal al resibir los datos

# Investigación realizada

Logs utilizados:

Breakpoints:

Herramientas:

# Causa raíz

¿Qué producía realmente el problema?
que setLoaded se ejecutaba de una ves en el useEffect

# Solución aplicada

Explica exactamente qué modificaste.
poner finally()

# Validación

¿Cómo verificaste que quedó arreglado?
viendo network

# Riesgo de regresión

¿Qué podría romper este cambio?
nada

# Test agregado

Describe el test creado.
uno para que valide que funcione el finally()
