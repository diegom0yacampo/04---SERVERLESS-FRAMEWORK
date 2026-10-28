# Bloque 07

## Resultado
- Qué añadí al proyecto: la función request común en api.ts con createEvent, replaceEvent, updateEvent y deleteEvent, y un botón por operación en App.tsx.
- Ruta o pantalla comprobada: la app web con los botones POST crear, PUT reemplazar EVT-101, PATCH cancelar EVT-101 y DELETE EVT-102.
- Estado y respuesta observados: POST 201, PUT 200 REPLACED, PATCH 200 UPDATED y DELETE 200 DELETED; el JSON de cada respuesta aparece debajo de los botones.

## Comprensión
- Recorrido del dato, explicado con mis palabras: el botón llama a run; la función de api.ts hace fetch con el método y el body en JSON; el handler responde y la app muestra el resultado o el error.
- Cambio guiado y resultado: en el PATCH cambié CANCELLED por CONFIRMED y la respuesta fue 200 con changes.status CONFIRMED; después restauré CANCELLED.
- Error encontrado y cómo lo resolví: desde el navegador las peticiones necesitan CORS; por eso cada ruta tiene cors: true y json() añade Access-Control-Allow-Origin.

## Evidencias
- Captura o transcripción breve, sin credenciales: `PATCH /dev/events/EVT-101 {"status":"CANCELLED"}` → `200 {"id":"EVT-101","changes":{"status":"CANCELLED"},"operation":"UPDATED"}`
- Limitaciones del ejercicio: las escrituras son simuladas y la lista mantiene sus dos eventos.
