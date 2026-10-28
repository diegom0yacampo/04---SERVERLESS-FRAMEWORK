# Festival Control · Bloque 01

## Qué he construido
Una función Serverless en TypeScript (src/hello.ts) que responde a GET http://localhost:3000/dev/hello usando Serverless Offline.

## Qué he comprendido
El handler recibe un APIGatewayProxyEvent y devuelve un APIGatewayProxyResult con statusCode y body. tsc compila src/hello.ts a dist/hello.js, que es lo que carga serverless.yml (dist/hello.handler). EVENT RECIBIDO sale en la terminal de Offline, no en la respuesta.

## Qué he modificado
Cambié message a «Festival Control · equipo preparado» y añadí service: hello. La URL no cambió porque la ruta está en serverless.yml y no lo toqué.

## Cómo lo he comprobado
Con Thunder y con curl -i la misma URL devuelve 200 con el nuevo JSON, y en la terminal aparece un EVENT RECIBIDO por cada petición.
