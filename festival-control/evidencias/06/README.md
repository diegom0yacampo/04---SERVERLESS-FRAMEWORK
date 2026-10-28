# Bloque 06

## Resultado
- Qué añadí al proyecto: src/api.ts con API_URL y getEvents(), y la carga de la lista con useEffect en App.tsx.
- Ruta o pantalla comprobada: la app web con el backend arrancado, que llama a GET http://localhost:3000/dev/events.
- Estado y respuesta observados: GET 200 y las dos tarjetas que devuelve la API; si falla, aparece el mensaje de error en rojo.

## Comprensión
- Recorrido del dato, explicado con mis palabras: useEffect llama a loadEvents; getEvents hace fetch a API_URL + /events, comprueba que llega una lista de eventos válida y setEvents repinta la pantalla.
- Cambio guiado y resultado: con /ruta-inexistente la app muestra «HTTP 404» porque el servidor sí responde; con Offline parado sale error de red. Restauré /events.
- Error encontrado y cómo lo resolví: al abrir la app sin arrancar el backend salía Failed to fetch; se soluciona arrancando npm start en backend/ antes que la app.

## Evidencias
- Captura o transcripción breve, sin credenciales: Network → `GET /dev/events 200` con EVT-101 y EVT-102 en la respuesta.
- Limitaciones del ejercicio: solo lectura y URL local.
