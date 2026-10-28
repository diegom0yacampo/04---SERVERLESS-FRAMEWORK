# Bloque 08

## Resultado
- Qué añadí al proyecto: serverless.yml preparado para AWS (service festival-control-api-${env:STUDENT_CODE}, region ${env:AWS_REGION}, stage dev y rol ${env:LAMBDA_ROLE_ARN}) y despliegue del stack festival-control-api-diego-dev con 7 funciones.
- Ruta o pantalla comprobada: GET https://1oxw058f48.execute-api.us-east-1.amazonaws.com/dev/events, https://1oxw058f48.execute-api.us-east-1.amazonaws.com/dev/events/EVT-101 y https://1oxw058f48.execute-api.us-east-1.amazonaws.com/dev/events/NO-EXISTE.
- Estado y respuesta observados: GET /events → 200 con EVT-101 y EVT-102; EVT-101 → 200; NO-EXISTE → 404 «Evento no encontrado».

## Comprensión
- Recorrido del dato, explicado con mis palabras: npm run build genera dist/; serverless deploy lo empaqueta y crea en AWS las Lambdas y API Gateway; la petición entra por API Gateway, invoca la Lambda y los console.log van a CloudWatch.
- Cambio guiado y resultado: pedí EVT-101 (200) y NO-EXISTE (404) y en npx serverless logs -f getEvent aparecen «GET evento: EVT-101» y «GET evento: NO-EXISTE».
- Error encontrado y cómo lo resolví: el terminal del Learner Lab daba InvalidClientTokenId porque su ~/.aws/credentials estaba caducado y en solo lectura; desplegué desde AWS CloudShell, que usa la sesión de la consola. Serverless v4 también pidió npx serverless login la primera vez.

## Evidencias
- Captura o transcripción breve, sin credenciales: `serverless deploy` → «Service deployed to stack festival-control-api-diego-dev (41s)» · `curl .../dev/events/NO-EXISTE` → `404 {"message":"Evento no encontrado"}` · `serverless logs -f getEvent` → «GET evento: EVT-101» y «GET evento: NO-EXISTE».
- Limitaciones del ejercicio: la sesión de AWS Academy es temporal y el catálogo sigue siendo fijo.
