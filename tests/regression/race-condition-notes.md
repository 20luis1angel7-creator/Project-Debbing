# Race condition regression notes

Cuando corrijas BUG-13, agrega aquí los pasos o test que usaste para probar compras simultáneas.

Idea:

1. Reinicia la base de datos con `npm run setup`.
2. Ejecuta dos `POST /api/orders` al mismo tiempo contra un producto con stock bajo.
3. Verifica que una compra falle o que el stock nunca quede negativo.

