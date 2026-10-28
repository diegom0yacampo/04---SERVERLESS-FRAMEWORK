import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { json, readBody } from '../http.js';
import { findZone, isZoneInput } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) return json(400, { message: 'Falta id' });
  if (!findZone(id)) return json(404, { message: 'Zona no encontrada' });
  const input = readBody(event.body);
  if (!isZoneInput(input)) {
    return json(400, { message: 'PUT sustituye la zona completa: envía name, capacity y status' });
  }
  console.log('PUT zona:', id);
  return json(200, { id, name: input.name.trim(), capacity: input.capacity, status: input.status });
};
