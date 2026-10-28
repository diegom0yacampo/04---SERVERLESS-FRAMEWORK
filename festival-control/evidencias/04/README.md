# Bloque 04

## Resultado
- Qué añadí al proyecto: la carpeta src/events con model.ts y un handler por operación (list, get, create, replace, update y delete), y sus seis funciones en serverless.yml.
- Ruta o pantalla comprobada: GET /dev/events, GET /dev/events/EVT-101, POST /dev/events, PUT, PATCH y DELETE /dev/events/{id}.
- Estado y respuesta observados: GET 200 con dos eventos; NO-EXISTE 404; POST 201; PUT 200 con operation REPLACED; PATCH 200 con operation UPDATED; DELETE 200 con operation DELETED.

## Comprensión
- Recorrido del dato, explicado con mis palabras: cada método y ruta de serverless.yml apunta a un handler distinto; todos usan model.ts para leer el body, comprobar que el id existe en el catálogo y responder con json().
- Cambio guiado y resultado: PUT a EVT-101 solo con status → 400; el mismo body por PATCH → 200 UPDATED; un GET posterior sigue en CONFIRMED porque no hay persistencia.
- Error encontrado y cómo lo resolví: al mover los handlers a src/events hubo que cambiar los handler de serverless.yml a dist/events/...; con la ruta antigua Offline no encontraba el archivo compilado.

## Evidencias
- Captura o transcripción breve, sin credenciales: `PUT /dev/events/EVT-101 {"status":"CANCELLED"}` → `400` · `PATCH` mismo body → `200 {"id":"EVT-101","changes":{"status":"CANCELLED"},"operation":"UPDATED"}` · `GET /dev/events/EVT-101` → `200 ... "status":"CONFIRMED"`
- Limitaciones del ejercicio: catálogo fijo de dos eventos y escrituras simuladas.
