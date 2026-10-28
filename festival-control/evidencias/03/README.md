# Bloque 03

## Resultado
- Qué añadí al proyecto: la función createEvent en src/createEvent.ts con la ruta POST /events.
- Ruta o pantalla comprobada: POST http://localhost:3000/dev/events con body JSON y Content-Type: application/json.
- Estado y respuesta observados: 201 Created con id EVT-NEW y los datos enviados; 400 si el JSON está mal o falta algún campo.

## Comprensión
- Recorrido del dato, explicado con mis palabras: el body llega como texto en event.body; JSON.parse lo convierte en objeto dentro de un try/catch, se validan artist, space, time (HH:mm) y status, y se responde 201.
- Cambio guiado y resultado: status CANCELLED → 201; status PAUSED → 400; time 29:80 → 400. Después volví a un body válido.
- Error encontrado y cómo lo resolví: con un JSON mal escrito JSON.parse falla y la función responde 400 "JSON inválido"; se arregla revisando comillas y comas del body.

## Evidencias
- Captura o transcripción breve, sin credenciales: `POST /dev/events {"artist":"Nova Pulse","space":"Main Stage","time":"21:00"}` → `201 {"id":"EVT-NEW","artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED"}`
- Limitaciones del ejercicio: no se guarda nada y el id siempre es EVT-NEW.
