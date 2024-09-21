import supertest, { Request, Response, SuperTest, Test } from 'supertest';
import { config } from '../config/env';
import TestAgent from 'supertest/lib/agent';

// Create a global request with baseURL
export const request = supertest(config.apiUrl);

export const sendRequest = async function(mochaContext: Mocha.Context, req: Test, requestBody?: any ): Promise<Response> {
  console.log('Final Request:', JSON.stringify(requestBody, null, 2));
  // Ensure mochaContext.test is defined and store request body
  if (mochaContext.test) {
    (mochaContext.test as any).requestBody = JSON.stringify(requestBody, null, 2);
  }

  // Send the request and capture the response
  const response = await req;

  // Ensure mochaContext.test is defined and store response body
  if (mochaContext.test) {
    (mochaContext.test as any).responseBody = JSON.stringify(response.body, null, 2);
  }
  // console.log("Mocha Context - ",mochaContext.test?.requestBody,  mochaContext.test?.responseBody);
  // console.log("Mocha Context - ",mochaContext.test);
  // Ensure the response is returned
  return response;
}
  

// Function to return the supertest request
export function getRequest(): TestAgent {
  console.log("API URL: ", config.apiUrl);
  return supertest(config.apiUrl);
}

// Function to dynamically add headers
export const setHeaders = function (headers: Record<string, string> = {}) {
  return request.set(headers);
};