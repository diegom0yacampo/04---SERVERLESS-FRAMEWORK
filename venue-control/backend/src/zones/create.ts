import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { json, readBody } from '../http.js';
import { isZoneInput } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const input = readBody(event.body);
  if (!isZoneInput(input)) {
    return json(400, { message: 'Se requiere name, capacity mayor que 0 y status OPEN, FULL o CLOSED' });
  }
  const id = 'ZONE-' + String(Date.now()).slice(-4);
  console.log('POST zona:', id, input.name);
  return json(201, { id, name: input.name.trim(), capacity: input.capacity, status: input.status });
};
