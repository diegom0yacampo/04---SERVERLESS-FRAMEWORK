# Bloque 05

## Resultado
- Qué añadí al proyecto: la carpeta mobile/ con Expo 54 (package.json, app.json, tsconfig.json), src/types.ts y App.tsx.
- Ruta o pantalla comprobada: npm run web en mobile/ y la pantalla Programación en http://localhost:8081.
- Estado y respuesta observados: se ven las tarjetas de EVT-101 y EVT-102 y el texto «Selección: ninguna»; al pulsar el botón cambia a «Selección: EVT-101».

## Comprensión
- Recorrido del dato, explicado con mis palabras: los eventos son un array local con el tipo FestivalEvent; map pinta una tarjeta por evento y useState guarda la selección.
- Cambio guiado y resultado: cambié setSelected y la etiqueta del botón a EVT-102 y apareció «Selección: EVT-102»; después lo dejé otra vez en EVT-101.
- Error encontrado y cómo lo resolví: npm start desde la raíz falla porque package.json está en mobile/; hay que hacer cd mobile antes.

## Evidencias
- Captura o transcripción breve, sin credenciales: pantalla: «FESTIVAL CONTROL · Programación · Datos locales · todavía sin llamadas HTTP · Selección: EVT-101».
- Limitaciones del ejercicio: todavía no hay peticiones HTTP; los datos están en el propio código.
