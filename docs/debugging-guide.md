# Guia de debugging

Esta guia contiene pistas concretas, no las soluciones. En cada bug se indica como
reproducirlo, que deberia ocurrir, que comportamiento incorrecto debes buscar y en
que parte del proyecto comenzar la investigacion.

No tienes que adivinar el comportamiento esperado. Tu trabajo es descubrir la
causa raiz y decidir como corregirla.

## Antes de empezar

1. Ejecuta `npm install`.
2. Ejecuta `npm run setup` para reiniciar la base de datos.
3. Ejecuta `npm run dev`.
4. Abre el frontend en `http://localhost:5173`.
5. Usa `npm run typecheck` y `npm test` durante la investigacion.
6. Despues de resolver un bug, completa `docs/bug-report-template.md` y guarda
   el resultado en `docs/solved-bugs/bug-XX.md`.

Si un error anterior impide ejecutar el proyecto, resuelvelo antes de intentar
reproducir los siguientes.

## BUG-01: Usuario sin direccion

**Como reproducirlo:** abre la pantalla Perfil y cambia del usuario 1 al usuario 2.

**Resultado esperado:** el perfil del usuario 2 debe mostrarse aunque no tenga
direccion. La ciudad puede aparecer vacia o con un texto como "No disponible".

**Fallo que debes buscar:** alguna lectura de una propiedad de `address` puede
fallar cuando ese dato no existe.

**Donde empezar:** sigue la respuesta desde `GET /api/users/2` hasta el servicio
de usuarios y la pantalla de perfil. Compara los datos de los usuarios 1 y 2.

## BUG-02: La API devuelve menos productos que el limite

**Como reproducirlo:** reinicia la base de datos y solicita
`GET /api/products?page=1&limit=10`. Tambien puedes contar las tarjetas de la
pantalla Productos.

**Resultado esperado:** con `limit=10`, la respuesta debe contener 10 productos.

**Fallo que debes buscar:** la cantidad devuelta es menor que el limite solicitado.

**Donde empezar:** sigue el valor `limit` desde el controlador hasta la consulta
SQL. Registra su valor justo antes de ejecutar la consulta.

## BUG-03: El proyecto no pasa la validacion de TypeScript

**Como reproducirlo:** ejecuta `npm run typecheck` y trabaja con el primer error
que aparezca, no con todos a la vez.

**Resultado esperado:** TypeScript debe terminar sin errores y el frontend y el
backend deben poder iniciar.

**Fallo que debes buscar:** hay valores del DOM o de `req.query` cuyo tipo real
puede ser mas amplio que el tipo que el codigo intenta utilizar.

**Donde empezar:** lee el archivo y la linea indicados por TypeScript. Antes de
forzar un tipo con `as`, comprueba si el valor puede ser `null`, un arreglo u otro
tipo y decide como manejar ese caso.

## BUG-04: Subtotal incorrecto en el backend

**Como reproducirlo:** agrega al carrito dos unidades del mismo producto y realiza
una compra sin depender del total mostrado por el frontend. Inspecciona el total
devuelto por `POST /api/orders` o crea una prueba para el calculo del subtotal.

**Resultado esperado:** cada linea debe aportar `precio numerico * cantidad` al
subtotal. Por ejemplo, dos unidades de 35 USD deben aportar 70 USD.

**Fallo que debes buscar:** el subtotal del backend puede concatenar valores o
ignorar la cantidad comprada.

**Donde empezar:** revisa el tipo de `products.price` en la base de datos y el
valor que recibe la funcion que calcula el subtotal. Recuerda que una afirmacion
de tipo de TypeScript no convierte un `string` en `number` durante la ejecucion.

## BUG-05: El checkout confirma antes de terminar

**Como reproducirlo:** agrega un producto, activa "Forzar fallo de pago" y pulsa
Comprar. Observa el mensaje y el carrito inmediatamente despues del clic y luego
cuando responde el backend.

**Resultado esperado:** la interfaz debe esperar la respuesta. Solo debe vaciar el
carrito y mostrar "Orden creada" cuando la peticion termine correctamente. Si la
peticion falla, debe conservar el carrito y mostrar el error.

**Fallo que debes buscar:** la interfaz confirma la compra y limpia el carrito
antes de conocer el resultado de la promesa.

**Donde empezar:** sigue la promesa creada en la funcion de checkout y compara el
orden de `await`, `setCart` y `setMessage`.

## BUG-06: Login invalido responde con un estado HTTP incorrecto

**Como reproducirlo:** envia credenciales incorrectas:

```bash
curl -i -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"missing@example.com","password":"wrong"}'
```

**Resultado esperado:** credenciales invalidas deben producir `401 Unauthorized`.

**Fallo que debes buscar:** el cuerpo informa un error, pero el estado HTTP indica
que la operacion fue exitosa.

**Donde empezar:** revisa la rama del controlador que se ejecuta cuando el servicio
de autenticacion no encuentra un usuario. El test de integracion define el contrato.

## BUG-07: La busqueda cambia segun mayusculas y minusculas

**Como reproducirlo:** busca por separado `Laptop`, `laptop` y `LAPTOP`, ya sea en
la interfaz o con `GET /api/products/search?q=...`.

**Resultado esperado:** las tres busquedas deben encontrar los mismos productos.

**Fallo que debes buscar:** algunas variantes no devuelven resultados aunque el
texto sea el mismo semanticamente.

**Donde empezar:** inspecciona el operador usado en la consulta SQLite. Comprueba
en la documentacion si ese operador distingue mayusculas de minusculas.

## BUG-08: Comprar con el carrito vacio produce un error

**Como reproducirlo:** ve directamente a Checkout sin agregar productos y pulsa
Comprar. Tambien puedes probar la funcion de subtotal con un arreglo vacio.

**Resultado esperado:** el subtotal de un carrito vacio debe ser `0` y la aplicacion
debe rechazar la compra de forma controlada o impedir el clic, sin lanzar una
excepcion inesperada.

**Fallo que debes buscar:** el backend intenta leer una posicion del arreglo aunque
el arreglo no contiene elementos.

**Donde empezar:** revisa la condicion especial para `items.length === 0` en el
calculo del subtotal. El test unitario de `calculateSubtotal([])` especifica una
parte del comportamiento esperado.

## BUG-09: El navegador bloquea las peticiones por CORS

**Como reproducirlo:** abre el frontend, revisa la consola y la pestaña Network, y
observa una peticion del frontend al backend.

**Resultado esperado:** una peticion cuyo `Origin` sea `http://localhost:5173`
debe recibir el header `Access-Control-Allow-Origin` correspondiente.

**Fallo que debes buscar:** el backend permite un origen diferente al origen real
desde el cual Vite sirve la aplicacion.

**Donde empezar:** compara la URL mostrada por Vite con la configuracion del
middleware CORS en el servidor. No confundas un error CORS con un `500` del backend.

## BUG-10: Se acumulan listeners de resize

**Como reproducirlo:** entra y sal varias veces de la pantalla Productos. Luego
cambia una sola vez el tamano de la ventana y observa el contador. En DevTools
tambien puedes inspeccionar los listeners registrados sobre `window`.

**Resultado esperado:** cada evento `resize` debe incrementar el contador una sola
vez, incluso despues de montar y desmontar la pantalla varias veces.

**Fallo que debes buscar:** cada visita agrega otro listener que permanece activo.

**Donde empezar:** revisa el `useEffect` que llama a `addEventListener` y verifica
que su funcion de limpieza elimine exactamente el mismo callback.

## BUG-11: Ordenes muestra cero antes de terminar la carga

**Como reproducirlo:** abre la pantalla Ordenes con Network configurado en una
conexion lenta, o agrega temporalmente un retraso a la peticion.

**Resultado esperado:** mientras la peticion esta pendiente debe decir "Cargando...".
El numero de ordenes solo debe mostrarse despues de recibir la respuesta.

**Fallo que debes buscar:** la pantalla se marca como cargada inmediatamente,
cuando el arreglo todavia conserva su valor inicial.

**Donde empezar:** compara el momento en que se inicia `apiGet` con el momento en
que cambia el estado `loaded`. Considera tambien que la peticion puede fallar.

## BUG-12: Un pago fallido reduce el inventario

**Preparacion:** ejecuta `npm run setup` y anota el stock de un producto.

**Como reproducirlo:** compra una unidad con "Forzar fallo de pago" activado. Tras
recibir el error, vuelve a consultar el producto o reinicia la pantalla Productos.

**Resultado esperado:** si no se completa el pago y no se crea una orden valida,
el stock debe permanecer igual.

**Fallo que debes buscar:** el stock disminuye aunque el proceso termina con error.

**Donde empezar:** escribe en orden todas las operaciones de `createOrder`: calculo,
validacion, actualizacion de stock, pago, orden y factura. Identifica que efectos ya
ocurrieron cuando el proveedor de pago lanza la excepcion.

## BUG-13: Dos compras simultaneas pueden dejar stock negativo

**Preparacion:** usa un producto con stock bajo y reinicia la base de datos antes
de cada intento para obtener resultados comparables.

**Como reproducirlo:** envia casi al mismo tiempo dos peticiones de compra que, por
separado, pasan la validacion, pero juntas solicitan mas unidades que el stock
disponible. No pruebes las peticiones una despues de la otra.

**Resultado esperado:** solo una compra debe completarse o ambas deben repartir el
stock sin que este sea menor que cero.

**Fallo que debes buscar:** ambas peticiones leen el mismo stock anterior y ambas
lo consideran suficiente antes de actualizarlo.

**Donde empezar:** analiza la separacion entre `SELECT` y `UPDATE`, incluido el
retraso artificial. Investiga como realizar una actualizacion atomica condicionada
por el stock disponible y como comprobar si esa actualizacion tuvo efecto.

## BUG-14: Una factura fallida deja una orden incompleta

**Preparacion:** reinicia la base de datos y arranca el backend con
`FORCE_INVOICE_FAIL=true`.

**Como reproducirlo:** realiza una compra valida y, despues del error de factura,
consulta las tablas `orders`, `invoices` y `products`.

**Resultado esperado:** crear la orden, descontar inventario y crear la factura
debe comportarse como una sola operacion: o se guardan todos los cambios necesarios
o no se guarda ninguno.

**Fallo que debes buscar:** quedan cambios parciales, por ejemplo una orden pagada
sin factura.

**Donde empezar:** identifica todas las escrituras SQL del proceso. Investiga
`BEGIN`, `COMMIT` y `ROLLBACK` en SQLite y asegurate de que todas las operaciones
de la transaccion utilicen la misma conexion.

## BUG-15: El cupon DEBUG10 incumple sus reglas

Las reglas completas son:

```txt
Compra menor de 100 USD: descuento de 0 USD
Compra desde 100 USD: descuento del 10%
Descuento maximo permitido: 50 USD
```

**Como reproducirlo:** prueba como minimo estos subtotales directamente contra la
funcion del cupon: `80`, `100`, `300`, `500`, `600` y `900`. Prueba tambien sin
cupon y con un codigo diferente.

**Resultado esperado:** construye primero una tabla manual con el descuento y total
esperados para cada caso. Luego compara esa tabla con el resultado del codigo.

**Fallo que debes buscar:** el descuento se aplica por debajo del minimo o supera
el maximo de 50 USD.

**Donde empezar:** este bug esta en las reglas de `applyCoupon`, no en el calculo
del subtotal. Los tests unitarios existentes cubren el minimo y el limite maximo;
agrega casos de frontera para evitar arreglar una regla y romper otra.
