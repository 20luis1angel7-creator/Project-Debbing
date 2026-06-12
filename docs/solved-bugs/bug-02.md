# Bug ID

BUG-02

# Descripción

Explica qué ocurría.
Solo se mostraba 9 productos y tenian que ser 10, el error era que en el la parte que se comunaba con la base de data le estaba restando 1 a los 10 y lo que hice fue que elimine eso y lo deje como lo trae (la cantidad de producto limit)


# Hipótesis inicial

¿Qué creías que estaba causando el error?
la url estaba mal
que el array no leia el 0 del array

# Investigación realizada

Logs utilizados:
- consol.log("data: ", data)
- console.log("url: ", url)
- console.log("err: ", error)
- console.log("search: ", search)

Breakpoints:

Herramientas:
- devtools

# Causa raíz

¿Qué producía realmente el problema?
en productServices.ts en listProducts hacia esto: const realLimit = limit - 1; 
y eso hacia que en vez de que renderize los 10 productos, renderize 9

# Solución aplicada

Explica exactamente qué modificaste.
Elimine lo que hacia que le restaba 1 a los productos y lo puse que pase directo esos limit cantidad

# Validación

¿Cómo verificaste que quedó arreglado?
que muestre los productos recomendado que en este caso son 10 por pagina

# Riesgo de regresión

¿Qué podría romper este cambio?
la url pero no se rempora nada

# Test agregado

Describe el test creado.
cree dos
uno con datos vacios
y otro simulando una llamada

