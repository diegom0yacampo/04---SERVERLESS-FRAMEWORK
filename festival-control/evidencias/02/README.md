# Bloque 02

## Resultado
- Qué añadí al proyecto: la función getEvent en src/getEvent.ts y su ruta GET /events/{id} en serverless.yml.
- Ruta o pantalla comprobada: GET http://localhost:3000/dev/events/EVT-104 y GET http://localhost:3000/dev/events/EVT-205 con Thunder y curl.
- Estado y respuesta observados: 200 OK con el mismo id que puse en la URL y el resto de datos fijos (Neon Waves, Main Stage, 22:30, CONFIRMED).

## Comprensión
- Recorrido del dato, explicado con mis palabras: el {id} de la URL lo recoge Offline (API Gateway en AWS) y llega al handler en event.pathParameters.id; el handler lo devuelve dentro del JSON.
- Cambio guiado y resultado: pedí EVT-330 sin tocar la función y devolvió 200 con id EVT-330, así que el id no está escrito a mano en el código.
- Error encontrado y cómo lo resolví: GET /dev/events sin id daba 404 porque esa ruta todavía no existía; la ruta correcta lleva el id al final.

## Evidencias
- Captura o transcripción breve, sin credenciales: `curl -i http://localhost:3000/dev/events/EVT-104` → `200 OK {"id":"EVT-104","artist":"Neon Waves","space":"Main Stage","time":"22:30","status":"CONFIRMED"}`
- Limitaciones del ejercicio: solo cambia el id; no hay catálogo, así que cualquier id devuelve 200.
