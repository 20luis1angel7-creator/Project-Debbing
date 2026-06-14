# Bug ID

BUG-05

# Descripción

Explica qué ocurría.
que cuando forzaba el error con el checkbox no se enviaba el error de la api al checkout y no mostraba el mensaje de error de tiene que mostrar

# Pasos para reproducir

1.marcar el checkbox para forzar el error y darle al boton de comprar

# Hipótesis inicial

¿Qué creías que estaba causando el error?
- que setCart es underfined
- que setmensaje no pasaba al setMensaje del error

# Investigación realizada

Logs utilizados:
- console.log("pay: ", payload)
- console.log("cart: ", setCart)
- console.log("api: ", apipost)

Breakpoints:

Herramientas:
- devtools

# Causa raíz

¿Qué producía realmente el problema?
que la api no mandaba el error porque no lo tenia siempre mandaba un ok

# Solución aplicada

Explica exactamente qué modificaste.
modifique checkoutPage para que pueda capturar el error sin romperse y agregue un tothrow error en la api de post 

# Validación

¿Cómo verificaste que quedó arreglado?
si, funciona nitido

# Riesgo de regresión

¿Qué podría romper este cambio?
que otras funciones se danen ya que pueda enviar un error y esa funcion no tenga para no manejarla

# Test agregado

Describe el test creado.
cree un test para validar el body
y otro que capture el error
