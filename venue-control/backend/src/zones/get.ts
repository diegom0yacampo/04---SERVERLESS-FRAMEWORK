import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { json } from '../http.js';
import { findZone } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  console.log('GET zona:', id);
  if (!id) return json(400, { message: 'Falta id' });
  const zone = findZone(id);
  return zone ? json(200, zone) : json(404, { message: 'Zona no encontrada' });
};
