# Bug ID

BUG-06

# Descripción

Explica qué ocurría.
el error es que el cuerpo de la informacion informa un error con un 200 y deberia de ser un 401 Unauthorized

# Pasos para reproducir

1.logearme y no esta autorizado

# Hipótesis inicial

¿Qué creías que estaba causando el error?
- que necesitaba una condicion para validar el autorizado

# Investigación realizada

Logs utilizados:
- console.log("autori: ", res.status.code)

# Causa raíz

¿Qué producía realmente el problema?
que en la validacion de autorizacion tenia el statuscode 200

# Solución aplicada

Explica exactamente qué modificaste.
cambiar esa validacion por un 401

# Validación

¿Cómo verificaste que quedó arreglado?
intentando loguearme

# Riesgo de regresión

¿Qué podría romper este cambio?
nada

# Test agregado

Describe el test creado.

