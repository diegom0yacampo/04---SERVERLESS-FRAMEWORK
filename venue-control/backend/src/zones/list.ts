import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { json } from '../http.js';
import { catalog } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('LIST zonas:', event.httpMethod, event.path);
  return json(200, catalog);
};
