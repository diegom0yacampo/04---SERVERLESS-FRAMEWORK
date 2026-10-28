import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { json } from '../http.js';
import { findZone } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) return json(400, { message: 'Falta id' });
  if (!findZone(id)) return json(404, { message: 'Zona no encontrada' });
  console.log('DELETE zona:', id);
  return json(200, { id, deleted: true });
};
