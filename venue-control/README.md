# Venue Control

## Arquitectura
App Expo/React Native (mobile/) → HTTP → API Gateway → una Lambda Node.js en TypeScript por operación de /zones (backend/) → respuesta JSON. La capa HTTP de la app está separada en mobile/src/api.ts.

## Ejecución local
- Backend: cd backend → npm ci → npx serverless login (solo la primera vez) → npm start. Las rutas quedan en http://localhost:3000/dev/zones.
- App: cd mobile → npm ci → npm run web.

## Despliegue
- Con la sesión de AWS Academy activa, exporta AWS_REGION, STUDENT_CODE y LAMBDA_ROLE_ARN.
- cd backend → npm run build → npx serverless deploy --stage dev --region "$AWS_REGION" → npx serverless info para ver el endpoint.
- App contra AWS: EXPO_PUBLIC_API_URL=https://dca3xca0wi.execute-api.us-east-1.amazonaws.com/dev npm run web -- --clear.
- Desplegado desde AWS CloudShell como venue-control-api-diego-dev (6 funciones), porque el terminal del Learner Lab tenía las credenciales caducadas.

## Decisiones
- Catálogo fijo y escrituras simuladas: la API valida y responde, y la app aplica la respuesta en pantalla hasta pulsar RECARGAR.
- PUT sustituye la zona completa (exige name, capacity y status); PATCH cambia solo los campos que se envían.
- Un handler por operación, con los tipos y las validaciones compartidos en model.ts.

## Evidencias
- Despliegue: «Service deployed to stack venue-control-api-diego-dev (41s)» con el endpoint https://dca3xca0wi.execute-api.us-east-1.amazonaws.com/dev y las 6 rutas.
- curl contra AWS: GET ZONE-07 200, POST 201, PATCH 200, DELETE 200 y NO-EXISTE 404.
- App contra AWS: evidencias/11-app-aws-lista.png, 11-app-aws-patch.png y 11-app-aws-final.png con ● CLOUD (GET, PATCH, PUT, POST y DELETE sobre /dev/zones).
- Logs: `serverless logs -f updateZone` muestra «PATCH zona: ZONE-07 { status: 'CLOSED' }» de la petición hecha desde la app.
