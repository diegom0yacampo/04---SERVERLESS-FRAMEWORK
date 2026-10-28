# Bloque 09

## Resultado
- Qué añadí al proyecto: API_URL de mobile/src/api.ts apunta a la base cloud https://1oxw058f48.execute-api.us-east-1.amazonaws.com/dev.
- Ruta o pantalla comprobada: la app web de Festival Control con la URL de AWS.
- Estado y respuesta observados: Network: GET /dev/events → 200 con las dos tarjetas y PATCH /dev/events/EVT-101 → 200 con operation UPDATED.

## Comprensión
- Recorrido del dato, explicado con mis palabras: la app hace fetch a la URL de API Gateway, se ejecuta la Lambda y vuelve el mismo JSON que en local, con los mismos métodos y rutas.
- Cambio guiado y resultado: local: http://localhost:3000/dev con Offline arrancado; cloud: el endpoint HTTPS con las Lambdas desplegadas. Para volver a local solo cambio API_URL y arranco npm start en backend/.
- Error encontrado y cómo lo resolví: al consultar los logs justo después de la petición salía «No logs found» porque CloudWatch tarda unos segundos; al repetir la consulta apareció la invocación.

## Evidencias
- Captura o transcripción breve, sin credenciales: app-aws-patch.png (respuesta UPDATED en la app) · `serverless logs -f updateEvent` → «PATCH evento: EVT-101».
- Limitaciones del ejercicio: depende de que la sesión de AWS Academy esté activa; las escrituras siguen siendo simuladas.
