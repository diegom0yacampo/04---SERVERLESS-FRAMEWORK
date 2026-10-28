import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { json, readBody } from '../http.js';
import { findZone, readChanges } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) return json(400, { message: 'Falta id' });
  const zone = findZone(id);
  if (!zone) return json(404, { message: 'Zona no encontrada' });
  const changes = readChanges(readBody(event.body));
  if (!changes) {
    return json(400, { message: 'PATCH necesita al menos un campo válido: name, capacity o status' });
  }
  console.log('PATCH zona:', id, changes);
  return json(200, { ...zone, ...changes });
};
